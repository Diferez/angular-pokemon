import { AfterContentInit, AfterViewInit, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from 'src/app/state/app.state';
import { PokemonsService } from '../../core/pokemons.service';
import { getCompare, getIsFiltering, getPokemons } from '../state/pokemons.reducer';
import * as PokemonsActions from '../state/pokemons.actions';
import {Pokemon} from '../../shared/models/pokemon.model'
import { PokemonsEffects } from '../state/pokemons.effects';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemonlist.component.html',
  styleUrls: ['./pokemonlist.component.css']
})

export class PokemonListComponent implements OnInit, AfterContentInit {
  compare$:any;
  errorMessage = '';
  page = 0  ;
  filtering = true;
  pokemons$: any;
  constructor(private pokemonsService: PokemonsService, private store: Store<State>) { }
  
  ngOnInit(): void {
    this.pokemons$ = this.store.select(getPokemons);
    this.store.dispatch(PokemonsActions.loadPokemons());

    this.store.select(getIsFiltering).subscribe(
      isFiltering => this.filtering = isFiltering
    );
    this.compare$ = this.store.select(getCompare);
  }

  ngAfterContentInit(): void {
    this.filtering = false;
  }
  
  handleClick(){
  }

  coLog(value: string){
    console.log(value)
  }
  onIntersection(){
    console.log("me vieron");
    this.store.dispatch(PokemonsActions.loadPokemons());
    this.page++;
  }
}
