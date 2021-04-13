import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ChartDataSets } from 'chart.js';
import { State } from 'src/app/state/app.state';
import { getPokemonA, getPokemonB, getPokemonDetails } from '../state/pokemons.reducer';
import * as PokemonsActions from '../state/pokemons.actions';
@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.css']
})
export class CompareComponent implements OnInit, OnDestroy {
  pokemonA: any;
  pokemonB: any;
  pokemonAsex:string = '';
  pokemonBsex:string = '';
  dataset: ChartDataSets[] = [];
  constructor(private store: Store<State>) { }
  ngOnDestroy(): void {
    this.store.dispatch(PokemonsActions.clearPokemonsAB());
  }

  ngOnInit(): void {
    this.store.select(getPokemonA).subscribe(
      pokemon => this.pokemonA = pokemon
    );

    this.store.select(getPokemonB).subscribe(
      pokemon => this.pokemonB = pokemon
    );
    
    console.log('comprando', this.pokemonA, this.pokemonB)
    this.pokemonAsex = this.getGender();
    this.pokemonBsex = this.getGender();
    
    let datasetA: ChartDataSets = {
      data:[
          this.pokemonA.stats[0].base_stat, 
          this.pokemonA.stats[1].base_stat, 
          this.pokemonA.stats[2].base_stat, 
          this.pokemonA.stats[3].base_stat, 
          this.pokemonA.stats[4].base_stat, 
          this.pokemonA.stats[5].base_stat],
          label: this.pokemonA.name }
      
    let datasetB: ChartDataSets = {
      data:[
          this.pokemonA.stats[0].base_stat, 
          this.pokemonB.stats[1].base_stat, 
          this.pokemonB.stats[2].base_stat, 
          this.pokemonB.stats[3].base_stat, 
          this.pokemonB.stats[4].base_stat, 
          this.pokemonB.stats[5].base_stat],
          label: this.pokemonB.name }
    
    this.dataset = [datasetA, datasetB]
    console.log(this.dataset)
  }

  getGender():string{
    let gender = Math.floor(Math.random() * 9) - 1;
    if(gender > 4){
      return 'Female';
    }else if(gender > -1){
      return 'Male';
    }
    return 'Genderless';
  }

}
