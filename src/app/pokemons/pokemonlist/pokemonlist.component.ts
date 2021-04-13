import { AfterContentInit, AfterViewInit, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from 'src/app/state/app.state';
import { getCompare, getIsFiltering, getPokemons } from '../state/pokemons.reducer';
import * as PokemonsActions from '../state/pokemons.actions';
import {Pokemon} from '../../shared/models/pokemon.model'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemonlist.component.html',
  styleUrls: ['./pokemonlist.component.css']
})

export class PokemonListComponent implements OnInit, AfterContentInit {
  compare$:any;
  errorMessage = '';
  filtering = true;
  pokemons$: any;
  constructor( private store: Store<State> ) { }
  
  ngOnInit(): void {
    this.pokemons$ = this.store.select(getPokemons);
    this.store.dispatch(PokemonsActions.loadPokemons());
    this.store.select(getIsFiltering).subscribe(
      isFiltering => this.filtering = isFiltering
    );
    this.compare$ = this.store.select(getCompare);
    console.log(this.pokemons$);
  }

  ngAfterContentInit(): void {
    this.filtering = false;
  }


  onIntersection(event:IntersectionObserverEntry[]){
    event.map((inter) => {
      if (inter.intersectionRatio > 0.45){
        this.store.dispatch(PokemonsActions.loadPokemons());
      }
    });
  }
}
