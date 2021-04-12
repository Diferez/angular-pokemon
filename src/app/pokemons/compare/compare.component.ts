import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from 'src/app/state/app.state';
import { getPokemonA, getPokemonB, getPokemonDetails } from '../state/pokemons.reducer';

@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.css']
})
export class CompareComponent implements OnInit {
  pokemonA: any;
  pokemonB: any;
  constructor(private store: Store<State>) { }

  ngOnInit(): void {
    this.store.select(getPokemonA).subscribe(
      pokemon => this.pokemonA = pokemon
    );

    this.store.select(getPokemonB).subscribe(
      pokemon => this.pokemonB = pokemon
    );
    
    console.log('comprando', this.pokemonA, this.pokemonB)
  }

}
