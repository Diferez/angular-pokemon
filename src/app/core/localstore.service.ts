import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';
import { Favorite } from '../shared/models/pokemon.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})

export class LocalstoreService {
  initialFavorites: Favorite[] = [{ path: environment.POKEMONIMAGEAPI + '1.png', name: 'bulbasaur' },
  { path: environment.POKEMONIMAGEAPI + '4.png', name: 'charmander' },
  { path: environment.POKEMONIMAGEAPI + '7.png', name: 'squirtle' }];
  favorites = new BehaviorSubject(this.initialFavorites);

  constructor(private _snackBar: MatSnackBar) {
    if (this.getFavorites.length === -1) {
      localStorage.setItem('favorites', JSON.stringify(this.initialFavorites));
      this.favorites = new BehaviorSubject(this.initialFavorites);
    } else {
      this.favorites = new BehaviorSubject(this.getFavorites());
    }
  }

  addFavorite(favorite: Favorite) {
    const temporalFavorites = this.getFavorites();
    if (temporalFavorites.length <= 4) {
      temporalFavorites.push(favorite);
      this.favorites.next(temporalFavorites);
      localStorage.setItem('favorites', JSON.stringify(temporalFavorites));
      return true;
    } else {
      const horizontalPosition: MatSnackBarHorizontalPosition = 'center';
      const verticalPosition: MatSnackBarVerticalPosition = 'top';
      this._snackBar.open('You already have 5 favorites', '',
        {
          verticalPosition,
          horizontalPosition,
          duration: 5 * 1000
        });
      return false;
    }
  }

  getFavorites() {
    return JSON.parse(localStorage.getItem('favorites') || '{}');
  }

  deleteFavorite(name: string) {
    const temporalFavorites = this.getFavorites();
    const index = temporalFavorites.findIndex((favorite: Favorite) => favorite.name === name);
    if (index !== -1) {
      temporalFavorites.splice(index, 1);
      this.favorites.next(temporalFavorites);
      localStorage.setItem('favorites', JSON.stringify(temporalFavorites));
    }
  }
}
