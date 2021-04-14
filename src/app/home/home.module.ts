import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import {IvyCarouselModule} from 'angular-responsive-carousel';
import { pokemonsReducer } from '../pokemons/state/pokemons.reducer';
import { StoreModule } from '@ngrx/store';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    IvyCarouselModule,
    StoreModule.forFeature('pokemons', pokemonsReducer),
  ]
})
export class HomeModule { }
