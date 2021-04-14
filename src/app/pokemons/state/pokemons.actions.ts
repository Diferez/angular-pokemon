import { createAction, props } from "@ngrx/store"
import { Pokemon, Stats } from "src/app/shared/models/pokemon.model";

export const enableFiltering = createAction(
    '[Pokemons] Filtering On',
    props<{filter:string}>()
);

export const disableFiltering = createAction(
    '[Pokemons] Filtering Off'
);

export const enableCompare = createAction(
    '[Pokemons] Compare On'
);

export const disableCompare = createAction(
    '[Pokemons] Compare Off'
);

export const setSelectedPokemon = createAction(
    '[Pokemons] Set Selected Pokemon',
    props<{pokemon: Pokemon}>()
);

export const clearSelectedPokemon = createAction(
    '[Pokemons] Clear Selected Pokemon'
);

export const loadPokemons = createAction(
    '[Pokemons] Load'
);

export const loadPokemonsSuccess = createAction(
    '[Pokemons] Load Success',
    props<{pokemons:Pokemon[]}>()
);

export const loadPokemonsFailed = createAction(
    '[Pokemons] Load Fail',
    props<{error:string}>()
);

export const loadPokemon = createAction(
    '[Pokemons] Load Pokemon',
    props<{url:string}>()
);

export const loadPokemonSuccess = createAction(
    '[Pokemons] Load Success Pokemon',
    props<{pokemon:Stats}>()
);

export const loadPokemonFailed = createAction(
    '[Pokemons] Load Fail Pokemon',
    props<{error:string}>()
);

export const loadPokemonDetails = createAction(
    '[Pokemons] Load Pokemon Details',
    props<{url:string}>()
);

export const loadPokemonDetailsSuccess = createAction(
    '[Pokemons] Load Success Pokemon Details',
    props<{details:any}>()
);

export const loadPokemonDetailsFailed = createAction(
    '[Pokemons] Load Fail Pokemon Details',
    props<{error:string}>()
);


export const setPokemonA = createAction(
    '[Pokemons] Set Pokemon A',
);

export const setPokemonB = createAction(
    '[Pokemons] Set Pokemon B',
);

export const clearPokemonsAB = createAction(
    '[Pokemons] Clear Pokemons AB'
);