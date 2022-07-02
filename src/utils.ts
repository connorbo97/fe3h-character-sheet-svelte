export const getModifierByPlayerStat = (stat: number) => Math.floor((stat - 10) / 2)

export const rollDice = (n: number) => Math.floor(Math.random() * n + 1);
export const rollD20 = () => rollDice(20)
