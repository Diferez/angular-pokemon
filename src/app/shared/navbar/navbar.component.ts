import { Component, OnInit} from '@angular/core';
import { Store } from '@ngrx/store';
import * as PokemonsActions from '../../pokemons/state/pokemons.actions';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private store: Store<any>) { }
  
  private _filter:string = '';

  get filter():string{
    return this._filter;
  }
  
  set filter(value:string){
    this._filter = value.toLowerCase();
    if(this._filter !== ''){
      this.store.dispatch(PokemonsActions.enableFiltering({filter: this._filter}));
    }else{
      this.store.dispatch(PokemonsActions.disableFiltering());
    }
  }

  ngOnInit(): void {
  }

  links = [{label:'Home', path:'home'},{label:'Pokemons', path:'pokemons'}];
  activeLink = this.links[0];
}
