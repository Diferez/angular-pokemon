import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { createEffects } from "@ngrx/effects/src/effects_module";
import { catchError, concatMap, map, mergeMap, switchMap } from "rxjs/operators";
import { PokemonsService } from "src/app/core/pokemons.service";
import * as PokemonsActions from './pokemons.actions';
import * as ApiActions from './api.actions';
import { of } from "rxjs";
@Injectable()
export class PokemonsEffects {

    constructor(private actions$: Actions, private pokemonsService: PokemonsService) { }

    loadPokemons$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(PokemonsActions.loadPokemons),
            mergeMap(() => this.pokemonsService.getPokemons().pipe(
                map(pokemons => PokemonsActions.loadPokemonsSuccess({ pokemons })),
                catchError(error => of(PokemonsActions.loadPokemonsFailed({ error })))
            ))
        )
    })

    loadPokemon$ = createEffect(()=>{
        return this.actions$.pipe(
            ofType(PokemonsActions.loadPokemon),
            switchMap((action) => this.pokemonsService.getPokemon(action.url).pipe(
                map(pokemon => PokemonsActions.loadPokemonSuccess({ pokemon})),
                catchError(error => of(PokemonsActions.loadPokemonFailed({ error })))
            ))
        )
    })

    loadDetails$ = createEffect(()=>{
        return this.actions$.pipe(
            ofType(PokemonsActions.loadPokemonDetails),
            switchMap((action) => this.pokemonsService.getPokemon(action.url).pipe(
                map(details => PokemonsActions.loadPokemonDetailsSuccess({ details })),
                catchError(error => of(PokemonsActions.loadPokemonDetailsFailed({ error })))
            ))
        )
    })

    loadFavorites$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(ApiActions.loadFavorites),
            mergeMap(() => this.pokemonsService.getFavorites().pipe(
                map(favorites => ApiActions.loadFavoritesSuccess({ favorites })),
                catchError(error => of(ApiActions.loadFavoritesFailure({ error })))
            ))
        )
    })

    addFavorite$ = createEffect(() => {
        return this.actions$
          .pipe(
            ofType(ApiActions.addFavorite),
            concatMap(action =>
              this.pokemonsService.addFavorite(action.favorite)
                .pipe(
                  map(favorite => ApiActions.addFavoriteSuccess({ favorite })),
                  catchError(error => of(ApiActions.addFavoriteFailure({ error })))
                )
            )
          );
      });

    removeFavorite$ = createEffect(() => {
        return this.actions$
          .pipe(
            ofType(ApiActions.removeFavorite),
            mergeMap(action =>
              this.pokemonsService.removeFavorite(action.favoriteId).pipe(
                map(() => ApiActions.removeFavoriteSuccess({ favoriteId: action.favoriteId })),
                catchError(error => of(ApiActions.removeFavoriteFailure({ error })))
              )
            )
          );
      });

}