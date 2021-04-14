import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'
import { tap, catchError, map } from 'rxjs/operators'
import { Observable, throwError } from "rxjs";
import { Details, Favorite, Pokemon, Stats } from "../shared/models/pokemon.model";

export interface ApiResp{
  results:[]
}

@Injectable({
  providedIn: 'root',
})
export class PokemonsService {
  page = 0;
  private pokemonApiUrl = 'https://pokeapi.co/api/v2/pokemon/';
  private favoritesUrl = 'api/heroes';
  constructor(private http: HttpClient) { }

  getPokemons(): Observable<Pokemon[]> {
    let off = this.page * 20;
    let lim = 20;
    let querry = `${this.pokemonApiUrl}?offset=${off}&limit=${lim}`;
    this.page++;
    return this.http.get<ApiResp>(querry)
    .pipe(
      tap(data => console.log('data',data)),
      map(data => data.results),
      catchError(this.handleError)
    );
  }

  getPokemon(url:string): Observable<Stats>{
    return this.http.get<Stats>(url)
    .pipe(
      tap(data => console.log("Pokes ", data)),
      catchError(this.handleError)
      );
  }

  getDescription(url:string): Observable<Details>{
    return this.http.get<Details>(url).pipe(
      tap(data => console.log("Desc ", data)),
      catchError(this.handleError)
      );
  }

  getFavorites(): Observable<Favorite[]>{
    return this.http.get<Favorite[]>(this.favoritesUrl)
    .pipe(
      tap(data => console.log("Favs ", data)),
      catchError(this.handleError)
      );
  }
  
  addFavorite(favorite: Favorite): Observable<Favorite> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const newFavorite = { ...favorite, id: null };
    return this.http.post<Favorite>(this.favoritesUrl, newFavorite, { headers })
      .pipe(
      tap(data => console.log('addFavorite: ' + JSON.stringify(data))),
      catchError(this.handleError)
      );
  }

  removeFavorite(id: number): Observable<{}> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.favoritesUrl}/${id}`;
    return this.http.delete<Favorite>(url, { headers })
      .pipe(
      tap(data => console.log('deleteFavorite: ' + id)),
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
