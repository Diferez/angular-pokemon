import { HttpErrorResponse } from '@angular/common/http';
import { AfterContentInit, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { throwError } from 'rxjs';
import { PokemonsService } from 'src/app/core/pokemons.service';
import { ChartDataSets } from 'chart.js';
import { State } from 'src/app/state/app.state';
import { Store } from '@ngrx/store';
import { getPokemonA, getPokemonDetails, getPokemonStats } from '../state/pokemons.reducer';
import * as PokemonsActions from '../state/pokemons.actions';
import { CompareComponent } from '../compare/compare.component';
import { LocalstoreService } from 'src/app/core/localstore.service';
import { Favorite } from 'src/app/shared/models/pokemon.model';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit, AfterContentInit, OnDestroy {
  errorMessage: string = '';
  pokemon: any = {};
  description: any = {};
  stats: ChartDataSets[] = [];
  gender: string = '';
  descriptionText: string = '';
  pokemonA:any=null;
  isFavorite:boolean= false;
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private store: Store<State>, public dialog: MatDialog, private local:LocalstoreService) {
    
  }

  checkFavorite(name:string){
    let fav=this.local.getFavorites();
    let containsName = fav.some( (favorite:Favorite) => favorite.name === name)
    return containsName;
  }

  ngOnDestroy(): void {
    this.store.dispatch(PokemonsActions.clearSelectedPokemon());
  }

  ngAfterContentInit(): void {
    this.gender = this.getGender();
    
  }

  ngOnInit(): void {
    
    this.store.select(getPokemonStats).subscribe(
      pokemon => {
        this.pokemon = pokemon;
        this.stats = [{ data: [this.pokemon.stats[0].base_stat, 
          this.pokemon.stats[1].base_stat, 
          this.pokemon.stats[2].base_stat, 
          this.pokemon.stats[3].base_stat, 
          this.pokemon.stats[4].base_stat, 
          this.pokemon.stats[5].base_stat,], 
          label: this.pokemon.name }];
        this.isFavorite = this.checkFavorite(pokemon.name);
      }
    );

    
    this.store.select(getPokemonDetails).subscribe(
      details => {
        this.description = details;
        console.log("Descript",this.description);
      }
    );
    

    this.store.select(getPokemonA).subscribe(
      pokemon => this.pokemonA = pokemon
    );
  }
  
  getDescription():any{
    let obj = this.description.flavor_text_entries.find((element: any) => element.language.name === 'en');
    return obj['flavor_text'].replace('', '');
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

  selectPokemon(){
    if(this.pokemonA === null){
      this.store.dispatch(PokemonsActions.setPokemonA());
    }else{
      this.store.dispatch(PokemonsActions.setPokemonB());
      const dialogRef = this.dialog.open(CompareComponent);
    }

  }

  addFavorite(){
    if(!this.isFavorite){
      let favorite: Favorite = {path:this.pokemon.sprites.front_default, name: this.pokemon.name}
      this.local.addFavorite(favorite);
      this.isFavorite=true;
    }else{
      this.local.deleteFavorite(this.pokemon.name)
      this.isFavorite=false;
    }

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
