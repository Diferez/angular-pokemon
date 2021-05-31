import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormatImgUrlPipe } from '../shared/format-img-url.pipe';
import { MaterialModule } from '../material/material.module';
import { PokemonListComponent } from './pokemonlist/pokemonlist.component';
import { IntersectionObserverModule } from '@ng-web-apis/intersection-observer';
import { DetailsComponent } from './details/details.component';
import { MatDialogModule } from '@angular/material/dialog';
import { PokemoncardComponent } from './pokemoncard/pokemoncard.component';
import { ChartsModule } from 'ng2-charts';
import { ChartComponent } from './chart/chart.component';
import { StoreModule } from '@ngrx/store';
import { pokemonsReducer } from './state/pokemons.reducer';
import { EffectsModule } from '@ngrx/effects';
import { PokemonsEffects } from './state/pokemons.effects';
import { CompareComponent } from './compare/compare.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    FormatImgUrlPipe,
    PokemonListComponent,
    DetailsComponent,
    PokemoncardComponent,
    ChartComponent,
    CompareComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    IntersectionObserverModule,
    MatDialogModule,
    ChartsModule,
    StoreModule.forFeature('pokemons', pokemonsReducer),
    EffectsModule.forFeature([PokemonsEffects]),
    MatSnackBarModule,
  ]
})
export class PokemonsModule { }
