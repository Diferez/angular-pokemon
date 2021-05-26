import { HttpErrorResponse } from '@angular/common/http';
import { AfterContentInit, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { throwError } from 'rxjs';
import { ChartDataSets } from 'chart.js';
import { State } from 'src/app/state/app.state';
import { Store } from '@ngrx/store';
import { getPokemonA, getPokemonDetails, getPokemonStats } from '../state/pokemons.reducer';
import * as PokemonsActions from '../state/pokemons.actions';
import { LocalstoreService } from 'src/app/core/localstore.service';
import { Details, Favorite, Stats, FlavorText } from 'src/app/shared/models/pokemon.model';
import { getGender } from 'src/app/shared/functions/pokemonUtils';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})

export class DetailsComponent implements OnInit, AfterContentInit, OnDestroy {
  errorMessage = '';
  pokemon: Stats = {
    name: '',
    height: 0,
    weight: 0,
    sprites: {
      front_default: ''
    },
    abilities: [{
      ability: {
        name: ''
      }
    }],
    types: [{
      type: {
        name: ''
      }
    }],
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
  };
  pokemonA: Stats = {
    name: '',
    height: 0,
    weight: 0,
    sprites: {
      front_default: ''
    },
    abilities: [{
      ability: {
        name: ''
      }
    }],
    types: [{
      type: {
        name: ''
      }
    }],
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
  };
  description: Details = {
    flavor_text_entries: [{
      language: {
        name: ''
      },
      flavor_text: ''
    }]
  };
  stats: ChartDataSets[] = [];
  gender = '';
  descriptionText = '';
  isFavorite = false;

  constructor(private store: Store<State>, private dialog: MatDialog, private local: LocalstoreService) {
  }

  checkFavorite(name: string) {
    const fav = this.local.getFavorites();
    const containsName = fav.some((favorite: Favorite) => favorite.name === name);
    return containsName;
  }

  ngOnDestroy(): void {
    this.store.dispatch(PokemonsActions.clearSelectedPokemon());
  }

  ngAfterContentInit(): void {
    this.gender = getGender();
  }

  ngOnInit() {
    this.store.select(getPokemonStats).subscribe(
      pokemon => {
        this.pokemon = pokemon;
        this.stats = [{
          data: [
            this.pokemon.stats[0].base_stat,
            this.pokemon.stats[1].base_stat,
            this.pokemon.stats[2].base_stat,
            this.pokemon.stats[3].base_stat,
            this.pokemon.stats[4].base_stat,
            this.pokemon.stats[5].base_stat,
          ],
          label: this.pokemon.name
        }];
        this.isFavorite = this.checkFavorite(pokemon.name);
      }
    );

    this.store.select(getPokemonDetails).subscribe(
      details => {
        this.description = details;
      }
    );

    this.store.select(getPokemonA).subscribe(
      pokemon => this.pokemonA = pokemon!
    );
  }

  getDescription(): string {
    try {
      const obj = this.description.flavor_text_entries.find((element) => element.language.name === 'en');
      return obj!['flavor_text'].replace('', '');
    } catch {
      return '';
    }
  }

  selectPokemon() {
    if (this.pokemonA === null) {
      this.store.dispatch(PokemonsActions.setPokemonA());
    } else {
      this.store.dispatch(PokemonsActions.setPokemonB());
    }
  }

  addFavorite() {
    if (!this.isFavorite) {
      const favorite: Favorite = { path: this.pokemon.sprites.front_default, name: this.pokemon.name };
      const resp = this.local.addFavorite(favorite);
      if (resp) {
        this.isFavorite = true;
      }
    } else {
      this.local.deleteFavorite(this.pokemon.name);
      this.isFavorite = false;
    }
  }

  handleError(err: HttpErrorResponse) {
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
