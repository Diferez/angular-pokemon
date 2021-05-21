import { AfterContentInit, AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from 'src/app/state/app.state';
import { getCompare, getIsFiltering, getPokemonA, getPokemons } from '../state/pokemons.reducer';
import * as PokemonsActions from '../state/pokemons.actions';
import {Pokemon} from '../../shared/models/pokemon.model'
import { Observable, Subscription } from 'rxjs';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { CompareComponent } from '../compare/compare.component';


@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemonlist.component.html',
  styleUrls: ['./pokemonlist.component.css']
})

export class PokemonListComponent implements OnInit, AfterContentInit, OnDestroy {

  errorMessage = '';
  filtering = true;
  pokemons$: Observable<Pokemon[]>;
  isFilteringSub: Subscription;
  compareSub: Subscription;
  dialogClosedSub: Subscription;
  pokemonASub: Subscription;

  constructor( private store: Store<State>, private _snackBar: MatSnackBar,  private dialog: MatDialog) { 
    this.pokemons$ = this.store.select(getPokemons);
    this.isFilteringSub = this.store.select(getIsFiltering).subscribe(
      isFilteringSub => this.filtering = isFilteringSub
    );
    this.compareSub = this.store.select(getCompare).subscribe(
      compare =>{
        this.compare = compare;
        if(compare) {
          this.closeSnackBar();
        }
      }
    );
    this.dialogClosedSub = this.dialog.afterAllClosed.subscribe(()=>{
      if(this.compare) {
        const dialogRef = this.dialog.open(CompareComponent, {panelClass:'compare-dialog'});
      }
      
    });
    this.pokemonASub = this.store.select(getPokemonA).subscribe(
      pokemonA => {
        if (pokemonA !== null) {
          this.openSnackBar(pokemonA.name);
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.isFilteringSub.unsubscribe();
    this.compareSub.unsubscribe();
    this.dialogClosedSub.unsubscribe();
    this.pokemonASub.unsubscribe();
  }

  compare = false;
  ngOnInit(): void {
    this.store.dispatch(PokemonsActions.loadPokemons());
  }

  ngAfterContentInit(): void {
    this.filtering = false;
  }

  onIntersection(event: IntersectionObserverEntry[]) {
    event.map((inter) => {
      if (inter.intersectionRatio > 0.45) {
        this.store.dispatch(PokemonsActions.loadPokemons());
      }
    });
  }

  openSnackBar(name: string) {
    let horizontalPosition: MatSnackBarHorizontalPosition = 'right';
    let verticalPosition: MatSnackBarVerticalPosition = 'bottom';
    this._snackBar.open(name.toUpperCase(), '', 
    {
      panelClass: 'snack', 
      verticalPosition: verticalPosition, 
      horizontalPosition: horizontalPosition
    });
  }

  closeSnackBar() {
    this._snackBar.dismiss();
  }
}


