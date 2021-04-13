import { createAction, createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import { Favorite, Pokemon } from "src/app/shared/models/pokemon.model";
import * as PokemonsActions from './pokemons.actions'
import * as ApiActions from './api.actions'

export interface PokemonsState{
  isFiltering: boolean;
  selectedPokemon: Pokemon|null;
  pokemons: Pokemon[];
  pokemonsFiltered: Pokemon[];
  pokemonStats: any;
  pokemonDetails: any;
  pokemonA:any|null;
  pokemonB:any|null;
  compare:boolean;
  favorites:Favorite[];
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
  pokemonStats: {},
  pokemonDetails: {},
  pokemonA: null,
  pokemonB: null,
  compare: false,
  favorites: [],
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

export const getFavorites = createSelector(
  getPokemonFeatureState,
  state => state.favorites,
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
  on(ApiActions.loadFavoritesSuccess, (state, action): PokemonsState => {
    return{
      ...state,
      favorites:action.favorites,
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
  on(ApiActions.addFavoriteSuccess, (state, action): PokemonsState => {
    return{
      ...state,
      favorites:[...state.favorites, action.favorite],
    }
  }),
  // on(ApiActions.removeFavoriteSuccess, (state, action): PokemonsState => {
  //   return{
  //     ...state,
  //     favorites: state.favorites.filter(favorite => favorite.id !== action.favoriteId),
  //   }
  // }),
);