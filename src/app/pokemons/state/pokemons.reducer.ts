import { createAction, createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import { Favorite, Pokemon, Stats } from "src/app/shared/models/pokemon.model";
import * as PokemonsActions from './pokemons.actions'


export interface PokemonsState{
  isFiltering: boolean;
  selectedPokemon: Pokemon | null;
  pokemons: Pokemon[];
  pokemonsFiltered: Pokemon[];
  pokemonStats: Stats;
  pokemonDetails: any;
  pokemonA: Stats|null;
  pokemonB: Stats|null;
  compare: boolean;
}

const initialState: PokemonsState = {
  isFiltering: false,
  selectedPokemon: {
    name: '',
    url: '',
    imgUrl: null,
  },
  pokemons: [],
  pokemonsFiltered: [],
  pokemonStats: {
    name: '',
    height: 0,
    weight: 0,
    sprites: {front_default: ''},
    abilities: [{ability:{name:''}}],
    types: [{type:{name:''}}],
    stats: [
      {
        base_stat: 0
      },
      {
        base_stat: 0
      },
      {
        base_stat: 0
      },
      {
        base_stat: 0
      },
      {
        base_stat: 0
      },
      {
        base_stat: 0
      }
    ]
  },
  pokemonDetails: {},
  pokemonA: null,
  pokemonB: null,
  compare: false,
}

const getPokemonFeatureState = createFeatureSelector<PokemonsState>('pokemons');

export const getIsFiltering = createSelector(
  getPokemonFeatureState,
  state => state.isFiltering,
);

export const getSelectedPokemon = createSelector(
  getPokemonFeatureState,
  state => state.selectedPokemon,
);

export const getPokemonStats = createSelector(
  getPokemonFeatureState,
  state => state.pokemonStats,
);

export const getPokemonDetails = createSelector(
  getPokemonFeatureState,
  state => state.pokemonDetails,
);

export const getPokemons = createSelector(
  getPokemonFeatureState,
  state => state.pokemonsFiltered,
);

export const getPokemonA = createSelector(
  getPokemonFeatureState,
  state => state.pokemonA,
);

export const getPokemonB = createSelector(
  getPokemonFeatureState,
  state => state.pokemonB,
);

export const getCompare = createSelector(
  getPokemonFeatureState,
  state => state.compare,
);


export const pokemonsReducer = createReducer<PokemonsState>(
  initialState,
  on(PokemonsActions.enableFiltering, (state, action):PokemonsState => {
    return {
      ...state,
      pokemonsFiltered: state.pokemons.filter(pokemon => pokemon.name.includes(action.filter)),
      isFiltering: true,
    };
  }),
  on(PokemonsActions.disableFiltering, (state):PokemonsState =>{
    return {
      ...state,
      isFiltering: false,
      pokemonsFiltered: state.pokemons,
    };
  }),
  on(PokemonsActions.enableCompare, (state):PokemonsState =>{
    return {
      ...state,
      compare: true,
    };
  }),
  on(PokemonsActions.disableCompare, (state):PokemonsState =>{
    return {
      ...state,
      compare: false,
    };
  }),
  on(PokemonsActions.setSelectedPokemon, (state, action): PokemonsState => {
    return{
      ...state,
      selectedPokemon: action.pokemon,
    }
  }),
  on(PokemonsActions.clearSelectedPokemon, (state): PokemonsState => {
    return{
      ...state,
      selectedPokemon: null,
    }
  }),
  on(PokemonsActions.loadPokemonsSuccess, (state, action): PokemonsState => {
    let pokemonsTemp = state.pokemons.concat(action.pokemons);
    return{
      ...state,
      pokemons: pokemonsTemp,
      pokemonsFiltered: pokemonsTemp,
    }
  }),
  on(PokemonsActions.loadPokemonSuccess, (state, action): PokemonsState => {
    return{
      ...state,
      pokemonStats:action.pokemon,
    }
  }),
  on(PokemonsActions.loadPokemonDetailsSuccess, (state, action): PokemonsState => {
    return{
      ...state,
      pokemonDetails:action.details,
    }
  }),
  on(PokemonsActions.setPokemonA, (state): PokemonsState => {
    return{
      ...state,
      pokemonA: state.pokemonStats,
    }
  }),
  on(PokemonsActions.setPokemonB, (state): PokemonsState => {
    return{
      ...state,
      pokemonB: state.pokemonStats,
      compare:true,
    }
  }),
  on(PokemonsActions.clearPokemonsAB, (state): PokemonsState => {
    return{
      ...state,
      pokemonA: null,
      pokemonB: null,
    }
  }),
);