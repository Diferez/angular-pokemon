import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { PokemonsService } from 'src/app/core/pokemons.service';
import { Pokemon } from 'src/app/shared/models/pokemon.model';
import { State } from 'src/app/state/app.state';
import { DetailsComponent } from '../details/details.component';
import * as PokemonsActions from '../state/pokemons.actions';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-pokemoncard',
  templateUrl: './pokemoncard.component.html',
  styleUrls: ['./pokemoncard.component.css']
})

export class PokemoncardComponent {
  @Input() pokemon: Pokemon = { name: '', url: '', imgUrl: '' };
  @Input() imgUrl = '';
  detailsUrl = environment.POKEMONSPECIESAPI;

  constructor(private dialog: MatDialog, private pokemonsService: PokemonsService, private store: Store<State>) { }

  selectPokemon() {
    const Url = `${this.detailsUrl}${this.pokemon.url.split('/')[6]}/`;
    const poke: Pokemon = { ...this.pokemon, imgUrl: this.imgUrl };
    this.store.dispatch(PokemonsActions.setSelectedPokemon({ pokemon: poke }));
    this.store.dispatch(PokemonsActions.loadPokemon({ url: this.pokemon.url }));
    this.store.dispatch(PokemonsActions.loadPokemonDetails({ url: Url }));
    const dialogRef = this.dialog.open(DetailsComponent, { panelClass: 'details-dialog' });
  }
}
