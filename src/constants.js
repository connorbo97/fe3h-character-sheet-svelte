export const PLAYER_STAT = {
  STR: 'pc_strength',
  DEX: 'pc_dexterity',
  CON: 'pc_constitution',
  INT: 'pc_intelligence',
  WIS: 'pc_wisdom',
  CHA: 'pc_charisma',
}

export const DEFAULT_PLAYER_STAT = {
  [PLAYER_STAT.STR]: 7,
  [PLAYER_STAT.DEX]: 8,
  [PLAYER_STAT.CON]: 9,
  [PLAYER_STAT.INT]: 10,
  [PLAYER_STAT.WIS]: 11,
  [PLAYER_STAT.CHA]: 12,
}

export const PLAYER_STAT_TO_LABEL = {
  [PLAYER_STAT.STR]: 'Strength',
  [PLAYER_STAT.DEX]: 'Dexterity',
  [PLAYER_STAT.CON]: 'Constitution',
  [PLAYER_STAT.INT]: 'Intelligence',
  [PLAYER_STAT.WIS]: 'Wisdom',
  [PLAYER_STAT.CHA]: 'Charisma',
}