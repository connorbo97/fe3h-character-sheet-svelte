export const CRESTS = {
	BLAIDDYD: 'BLAIDDYD',
	CETHLEANN: 'CETHLEANN',
	CICHOL: 'CICHOL',
	CHARON: 'CHARON',
	DAPHNEL: 'DAPHNEL',
	DOMINIC: 'DOMINIC',
	FRALDARIUS: 'FRALDARIUS',
	GAUTIER: 'GAUTIER',
	GLOUCESTER: 'GLOUCESTER',
	GONERIL: 'GONERIL',
	INDECH: 'INDECH',
	LAMINE: 'LAMINE',
	MACUIL: 'MACUIL',
	RIEGAN: 'RIEGAN',
	SEIROS: 'SEIROS',
	THE_BEAST: 'THE_BEAST'
};
export const CRESTS_TO_LABELS = {
	[CRESTS.BLAIDDYD]: 'Blaiddyd',
	[CRESTS.CETHLEANN]: 'Cethleann',
	[CRESTS.CICHOL]: 'Cichol',
	[CRESTS.CHARON]: 'Charon',
	[CRESTS.DAPHNEL]: 'Daphnel',
	[CRESTS.DOMINIC]: 'Dominic',
	[CRESTS.FRALDARIUS]: 'Fraldarius',
	[CRESTS.GAUTIER]: 'Gautier',
	[CRESTS.GLOUCESTER]: 'Gloucester',
	[CRESTS.GONERIL]: 'Goneril',
	[CRESTS.INDECH]: 'Indech',
	[CRESTS.LAMINE]: 'Lamine',
	[CRESTS.MACUIL]: 'Macuil',
	[CRESTS.RIEGAN]: 'Riegan',
	[CRESTS.SEIROS]: 'Seiros',
	[CRESTS.THE_BEAST]: 'The Beast'
};

export enum CrestType {
	MAJOR = 'MAJOR',
	MINOR = 'MINOR'
}
export const ActivationRates = {
	omega: {
		[CrestType.MAJOR]: 17,
		[CrestType.MINOR]: 19
	},
	gamma: {
		[CrestType.MAJOR]: 13,
		[CrestType.MINOR]: 17
	},
	beta: {
		[CrestType.MAJOR]: 11,
		[CrestType.MINOR]: 15
	},
	alpha: {
		[CrestType.MAJOR]: 7,
		[CrestType.MINOR]: 13
	}
};
export enum CrestTrigger {
	MAGIC_ATTACK,
	COMBAT_ART,
	ATTACK,
	HEAL
}
export const CRESTS_TO_FEATURES: { [s: string]: CrestFeatures } = {
	[CRESTS.BLAIDDYD]: {
		label: 'Blaiddyd',
		description:
			'When using a combat art, conserves superiority die and doubles any extra damage done by the weapon art if activated',
		activationDC: ActivationRates.omega,
		triggersOn: CrestTrigger.COMBAT_ART
	},
	[CRESTS.CETHLEANN]: {
		label: 'Cethleann',
		description: 'When using recovery magic, heal the target for +2 HP if activated.',
		activationDC: ActivationRates.beta,
		triggersOn: CrestTrigger.HEAL
	},
	[CRESTS.CICHOL]: {
		label: 'Cichol',
		description: 'When using a combat art, prevent counterattack',
		activationDC: ActivationRates.beta,
		triggersOn: CrestTrigger.COMBAT_ART
	},
	[CRESTS.CHARON]: {
		label: 'Charon',
		description:
			'When using a combat art, doubles any extra damage done by the weapon art if activated',
		activationDC: ActivationRates.alpha,
		triggersOn: CrestTrigger.COMBAT_ART
	},
	[CRESTS.DAPHNEL]: {
		label: 'Daphnel',
		description:
			'When using a combat art, adds +2 damage if the combat art does damage if activated',
		activationDC: ActivationRates.alpha,
		triggersOn: CrestTrigger.COMBAT_ART
	},
	[CRESTS.DOMINIC]: {
		label: 'Dominic',
		description: 'When attacking with a spell, conserves spell slot if activated',
		activationDC: ActivationRates.omega,
		triggersOn: CrestTrigger.MAGIC_ATTACK
	},
	[CRESTS.FRALDARIUS]: {
		label: 'Fraldarius',
		description: 'When attacking with a weapon, adds +2 damage to the attack if activated',
		activationDC: ActivationRates.gamma,
		triggersOn: CrestTrigger.ATTACK
	},
	[CRESTS.GAUTIER]: {
		label: 'Gautier',
		description:
			'When using a combat art, adds +2 damage if the combat art deals damage if activated',
		activationDC: ActivationRates.alpha,
		triggersOn: CrestTrigger.COMBAT_ART
	},
	[CRESTS.GLOUCESTER]: {
		label: 'Gloucester',
		description: 'When attacking with a spell, adds +2 damage to the attack if activated',
		activationDC: ActivationRates.omega,
		triggersOn: CrestTrigger.MAGIC_ATTACK
	},
	[CRESTS.GONERIL]: {
		label: 'Goneril',
		description: 'When using a combat art, prevents counterattack',
		activationDC: ActivationRates.beta,
		triggersOn: CrestTrigger.COMBAT_ART
	},
	[CRESTS.INDECH]: {
		label: 'Indech',
		description:
			'When attacking with a weapon, you may attack the target again if activated. (this follow up attack can also trigger the effect)',
		activationDC: ActivationRates.omega,
		triggersOn: CrestTrigger.ATTACK
	},
	[CRESTS.LAMINE]: {
		label: 'Lamine',
		description: 'When using recovery magic, fe the spell slot if activated',
		activationDC: ActivationRates.omega,
		triggersOn: CrestTrigger.HEAL
	},
	[CRESTS.MACUIL]: {
		label: 'Macuil',
		description: 'When attacking with a spell, add +2 damage to the attack if activated.',
		activationDC: ActivationRates.omega,
		triggersOn: CrestTrigger.MAGIC_ATTACK
	},
	[CRESTS.RIEGAN]: {
		label: 'Riegan',
		description:
			'When using a combat art, heal for 30% of the damage dealt if the combat art deals damage if activated',
		activationDC: ActivationRates.beta,
		triggersOn: CrestTrigger.COMBAT_ART
	},
	[CRESTS.SEIROS]: {
		label: 'Seiros',
		description:
			'When using a combat art, heal for 30% of the damage dealt if the combat art deals damage if activated',
		activationDC: ActivationRates.alpha,
		triggersOn: CrestTrigger.COMBAT_ART
	},
	[CRESTS.THE_BEAST]: {
		label: 'The Beast',
		description: 'When attacking with a weapon, add +2 damage',
		activationDC: ActivationRates.gamma,
		triggersOn: CrestTrigger.COMBAT_ART
	}
};
