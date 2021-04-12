import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { tap, catchError, map } from 'rxjs/operators'
import { Observable, ObservableInput, throwError } from "rxjs";
import { Pokemon } from "../shared/models/pokemon.model";
@Injectable({
    providedIn: 'root',
})
export class PokemonsService {
    page = 0;
    private pokemonApiUrl = 'https://pokeapi.co/api/v2/pokemon/';

    constructor(private http: HttpClient) { }

    getPokemons(): Observable<Pokemon[]> {
        let off = this.page * 20;
        let lim = 20;
        let querry = `${this.pokemonApiUrl}?offset=${off}&limit=${lim}`;
        this.page++;
        return this.http.get<any>(querry)
        .pipe(
            tap(data => console.log('data',data)),
            map(data => data.results),
            catchError(this.handleError)
        );
    }

    getPokemon(url:string): Observable<any>{
        return this.http.get<any>(url)
        .pipe(
            tap(data => console.log("Pokes ", data)),
            catchError(this.handleError)
            );
    }

    getDescription(url:string): Observable<any>{
        return this.http.get<any>(url).pipe(
            tap(data => console.log("Desc ", data)),
            catchError(this.handleError)
            );
    }

    
    private handleError(err: HttpErrorResponse) { 
        let errorMessage = '';
        if (err.error instanceof ErrorEvent) {
            errorMessage = `An error occurred: ${err.error.message}`;
        } else {
            errorMessage = `Api returned code: ${err.status}, error message is: ${err.message}`;
        }
        console.error(errorMessage);
        return throwError(errorMessage);
    }
}
