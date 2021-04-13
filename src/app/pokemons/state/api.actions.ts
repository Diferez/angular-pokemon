import { createAction, props } from "@ngrx/store"
import { Favorite, Pokemon } from "src/app/shared/models/pokemon.model";

export const loadFavorites = createAction(
    '[Api] Load'
);

export const loadFavoritesSuccess = createAction(
    '[Api] Load Success',
    props<{ favorites: Favorite[] }>()
);

export const loadFavoritesFailure = createAction(
    '[Api] Load Fail',
    props<{ error: string }>()
);

export const addFavorite = createAction(
    '[Api] Add Favorite',
    props<{favorite:Favorite}>()
);

export const addFavoriteSuccess = createAction(
    '[Api] Add Favorite Success',
    props<{ favorite: Favorite }>()
);

export const addFavoriteFailure = createAction(
    '[Api] Add Favorite Fail',
    props<{ error: string }>()
);

export const removeFavorite = createAction(
    '[Api] Remove Favorite',
    props<{favoriteId:number}>()
);

export const removeFavoriteSuccess = createAction(
    '[Api] Remove Favorite Success',
    props<{favoriteId:number}>()
);

export const removeFavoriteFailure = createAction(
    '[Api] Remove Favorite Failure',
    props<{error: string}>()
);