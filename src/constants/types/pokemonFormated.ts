export interface PokemonFormated{
    id: number;
    name: string;
    image: string;
    types: string[];
    stats: {
        hp: number;
        attack: number;
        defense: number;
        speed: number;
        specialAttack: number;
        specialDefense: number;
    };
    height: number;
    weight: number;
}