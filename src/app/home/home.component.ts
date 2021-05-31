import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../state/app.state';
import { LocalstoreService } from '../core/localstore.service';
import { Favorite } from '../shared/models/pokemon.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {
  $favorites: Observable<Favorite[]>;
  constructor(private local: LocalstoreService) {
    this.$favorites = this.local.favorites;
  }
}
