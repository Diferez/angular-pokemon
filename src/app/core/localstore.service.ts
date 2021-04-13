import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { getFavorites } from "../pokemons/state/pokemons.reducer";
import { Favorite } from "../shared/models/pokemon.model";

@Injectable({
    providedIn: 'root',
})
export class LocalstoreService{
    initialFavorites :Favorite[] = [{path: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png", name:'bulbasaur'},
                                    {path: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png", name:'charmander'},
                                    {path: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png", name:'squirtle'}];
    favorites = new BehaviorSubject(this.initialFavorites);
    constructor(){
        localStorage.setItem('favorites',JSON.stringify(this.initialFavorites))
    }

    addFavorite(favorite:Favorite) {
        let temporalFavorites = this.getFavorites();
        if(temporalFavorites.length <= 4){
            temporalFavorites.push(favorite)
            this.favorites.next(temporalFavorites);
            localStorage.setItem('favorites', JSON.stringify(temporalFavorites));
        }else{
            alert('You already have 5 favorites')
        }
    }
    
    getFavorites() {
        return JSON.parse(localStorage.getItem('favorites') || '{}');
    }

    deleteFavorite(name:string){
        let temporalFavorites = this.getFavorites();
        let index = temporalFavorites.findIndex((x:Favorite) => x.name === name);
        if(index !== -1){
            temporalFavorites.splice(index,1);
            this.favorites.next(temporalFavorites);
            localStorage.setItem('favorites', JSON.stringify(temporalFavorites));
        }
    }

}