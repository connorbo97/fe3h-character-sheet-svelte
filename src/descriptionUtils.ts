import {
	PLAYER_SKILL_TO_LABEL,
	PLAYER_STAT_TO_SHORT_LABEL,
	COMBAT_SKILLS_TO_FEATURES,
	COMBAT_ARTS_TO_FEATURES,
	WEAPON_TYPE_TO_LABEL,
	WEAPONS_TO_FEATURES
} from './constants';

export const getStatBlockDescription = (unlocks: StatBlock = {}) => {
	const {
		playerStats,
		combatSkills,
		playerSkills,
		combatArts,
		weapons,
		hpBonus,
		xpMods,
		protectionBonus,
		msBonus,
		bonusRange,
		followUpBonus,
		resilienceBonus
	} = unlocks;

	const finalStringArr: Array<string> = [];

	if (playerStats) {
		finalStringArr.push(
			'Min Stats (' +
				Object.entries(playerStats)
					.map(([stat, value]) => `${PLAYER_STAT_TO_SHORT_LABEL[stat]} ${value}`)
					.join(', ') +
				')'
		);
	}

	if (playerSkills) {
		finalStringArr.push(
			'Skills (' +
				Object.keys(playerSkills)
					.map((k) => PLAYER_SKILL_TO_LABEL[k])
					.join(', ') +
				')'
		);
	}

	if (combatSkills) {
		finalStringArr.push(
			'Combat Skills (' +
				Object.keys(combatSkills)
					.map((k) => COMBAT_SKILLS_TO_FEATURES[k].label)
					.join(', ') +
				')'
		);
	}

	if (combatArts) {
		finalStringArr.push(
			'Combat Arts (' +
				Object.keys(combatArts)
					.map((k) => COMBAT_ARTS_TO_FEATURES[k].label)
					.join(', ') +
				')'
		);
	}

	if (weapons) {
		finalStringArr.push(
			'Weapons (' +
				Object.keys(weapons)
					.map((k) => WEAPONS_TO_FEATURES[k].label)
					.join(', ') +
				')'
		);
	}

	if (hpBonus) {
		finalStringArr.push('HP Bonus (' + hpBonus + ')');
	}

	if (xpMods) {
		finalStringArr.push(
			'XP from Combat: (' +
				Object.keys(xpMods)
					.map((k) => {
						return (WEAPON_TYPE_TO_LABEL[k] || k) + ': x' + xpMods[k];
					})
					.join(', ') +
				')'
		);
	}

	if (bonusRange) {
		finalStringArr.push(
			'Bonus Range by Weapon Type: (' +
				Object.keys(bonusRange)
					.map((k) => {
						return (WEAPON_TYPE_TO_LABEL[k] || k) + ': ' + bonusRange[k];
					})
					.join(', ') +
				')'
		);
	}

	if (followUpBonus) {
		finalStringArr.push('AS Modifier (' + followUpBonus + ')');
	}
	if (protectionBonus) {
		finalStringArr.push('Prt Bonus (' + protectionBonus + ')');
	}
	if (resilienceBonus) {
		finalStringArr.push('Re Bonus (' + resilienceBonus + ')');
	}
	if (msBonus) {
		finalStringArr.push('MS Bonus (' + msBonus + ')');
	}

	return finalStringArr.join(', ');
};
export const getClassDescription = (features: ClassFeatures) => {
	const { unlocks, whenEquipped = {} } = features;

	let unlocksString = '';

	if (unlocks) {
		unlocksString = 'Unlocks: ' + getStatBlockDescription(unlocks);
	}

	const whenEquippedString = '';
	return [unlocksString, whenEquippedString].filter((a) => a).join(', ');
};