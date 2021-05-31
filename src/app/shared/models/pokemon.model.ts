export interface Pokemon {
  name: string;
  url: string;
  imgUrl: string | null;
}

export interface Favorite {
  name: string;
  path: string;
}

export interface Stats {
  name: string;
  height: number;
  weight: number;
  sprites: { front_default: string };
  abilities: [{ ability: { name: string } }];
  types: [{ type: { name: string } }];
  stats: [{
    base_stat: number;
  },
    {
      base_stat: number;
    },
    {
      base_stat: number;
    },
    {
      base_stat: number;
    },
    {
      base_stat: number;
    },
    {
      base_stat: number;
    },
  ];
}

export interface Details {
  flavor_text_entries: [FlavorText];
}

export interface ApiResponse {
  results: [];
}

export interface FlavorText {
  language: {
    name: string;
  };
  flavor_text: string;
}
