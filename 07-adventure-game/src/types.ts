export type Player = {
    name: string;
    score: number;
    health: number;
    attackDamage: number;
    healthPotions: number;
    healthPotionsHealAmount: number;
    healthPotionsDropChance: number;
}

export type Enemy = {
    names: string[];
    health: number;
    attackDamage: number;
}

export type Action = {
    [key: string]: (frames: {
        [key: string]: string[];
    }) => Promise<void>;
};
