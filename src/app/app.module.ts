import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module'
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store'
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { PokemonsModule } from './pokemons/pokemons.module'
import { PokemonListComponent } from './pokemons/pokemonlist/pokemonlist.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { HomeModule } from './home/home.module';



const routes: Routes = [
  { path: 'home', component: HomeComponent, },
  { path: 'pokemons', component: PokemonListComponent, },
  { path: '', redirectTo: 'home', pathMatch: 'full', },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CommonModule,
    MaterialModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    EffectsModule.forRoot([]),
    StoreModule.forRoot({}, {}),
    PokemonsModule,
    StoreDevtoolsModule.instrument({ name:'Talos',maxAge: 25, logOnly: environment.production }),
    HomeModule,
  
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
