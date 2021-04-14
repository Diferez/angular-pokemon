import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { createEffects } from "@ngrx/effects/src/effects_module";
import { catchError, concatMap, map, mergeMap, switchMap } from "rxjs/operators";
import { PokemonsService } from "src/app/core/pokemons.service";
import * as PokemonsActions from './pokemons.actions';
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
}