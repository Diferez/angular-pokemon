import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { tap, catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Details, Pokemon, Stats, ApiResponse } from '../shared/models/pokemon.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})

export class PokemonsService {
  page = 0;
  pokemonApiUrl = environment.POKEMONDATAAPI;
  constructor(private http: HttpClient) { }

  getPokemons(): Observable<Pokemon[]> {
    const off = this.page * 20;
    const lim = 20;
    const querry = `${this.pokemonApiUrl}?offset=${off}&limit=${lim}`;
    this.page++;
    return this.http.get<ApiResponse>(querry)
      .pipe(
        map(data => data.results),
        catchError(this.handleError)
      );
  }

  getPokemon(url: string): Observable<Stats> {
    return this.http.get<Stats>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  getDescription(url: string): Observable<Details> {
    return this.http.get<Details>(url).pipe(
      catchError(this.handleError)
    );
  }

  handleError(err: HttpErrorResponse): Observable<never> {
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
