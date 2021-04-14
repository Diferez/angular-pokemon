export interface Pokemon {
    name: string;
    url: string;
    imgUrl: string | null;
}
export interface Favorite{
    name: string;
    path: string;
}

export interface Stats{
    name: string;
    height: number;
    weight: number;
    sprites: {};
    abilities: [];
    types: [];
    stats:[{
        base_stat:number;
    },
    {
        base_stat:number;
    },
    {
        base_stat:number;
    },
    {
        base_stat:number;
    },
    {
        base_stat:number;
    },
    {
        base_stat:number;
    },
    ];
}