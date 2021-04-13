import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as ApiActions from '../pokemons/state/api.actions';
import { getFavorites } from '../pokemons/state/pokemons.reducer';
import { State } from '../state/app.state';
import { Observable } from 'rxjs';
import { Favorite } from '../shared/models/pokemon.model';
import { map } from 'rxjs/operators';
import { LocalstoreService } from '../core/localstore.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  images =[{path: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"},
           {path: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png"},
           {path: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png"},]
  images2 =[{path: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"},
           {path: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png"},
           {path: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png"},]
  $favorites:any;
  constructor(private store: Store<State>, private local: LocalstoreService) { 
    this.local.favorites.subscribe((nextValue) => {
      this.images2 = nextValue;
   })

  }

  ngOnInit(): void {
    this.$favorites = this.local.favorites;
  }

  addP(){
    let temp: Favorite = {path: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10.png", name:'exodia'}
    this.local.addFavorite(temp);
  }

  delP(){
    this.local.deleteFavorite('squirtle');
  }

  relP(){
    let a = this.local.getFavorites();
    console.log(a);
  }
}



