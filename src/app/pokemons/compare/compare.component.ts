import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ChartDataSets } from 'chart.js';
import { State } from 'src/app/state/app.state';
import { getPokemonA, getPokemonB, getPokemonDetails } from '../state/pokemons.reducer';
import * as PokemonsActions from '../state/pokemons.actions';
import { Stats } from 'src/app/shared/models/pokemon.model';
import { getGender } from 'src/app/shared/functions/pokemonUtils';

@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.css']
})

export class CompareComponent implements OnInit, OnDestroy {
  pokemonA: Stats = {
    name: '',
    height: 0,
    weight: 0,
    sprites: {
      front_default: ''
    },
    abilities: [{
      ability: {
        name: ''
      }
    }],
    types: [{
      type: {
        name: ''
      }
    }],
    stats: [
      {
        base_stat: 0
      },
      {
        base_stat: 0
      },
      {
        base_stat: 0
      },
      {
        base_stat: 0
      },
      {
        base_stat: 0
      },
      {
        base_stat: 0
      }
    ]
  };
  pokemonB: Stats = {
    name: '',
    height: 0,
    weight: 0,
    sprites: {
      front_default: ''
    },
    abilities: [{
      ability: {
        name: ''
      }
    }],
    types: [{
      type: {
        name: ''
      }
    }],
    stats: [
      {
        base_stat: 0
      },
      {
        base_stat: 0
      },
      {
        base_stat: 0
      },
      {
        base_stat: 0
      },
      {
        base_stat: 0
      },
      {
        base_stat: 0
      }
    ]
  };
  pokemonAsex = '';
  pokemonBsex = '';
  dataset: ChartDataSets[] = [];

  constructor(private store: Store<State>) { }

  ngOnDestroy() {
    this.store.dispatch(PokemonsActions.clearPokemonsAB());
    this.store.dispatch(PokemonsActions.disableCompare());
  }

  ngOnInit() {
    this.store.select(getPokemonA).subscribe(
      pokemon => this.pokemonA = pokemon!
    );

    this.store.select(getPokemonB).subscribe(
      pokemon => this.pokemonB = pokemon!
    );

    this.pokemonAsex = getGender();
    this.pokemonBsex = getGender();

    const datasetA: ChartDataSets = {
      data: [
        this.pokemonA.stats[0].base_stat,
        this.pokemonA.stats[1].base_stat,
        this.pokemonA.stats[2].base_stat,
        this.pokemonA.stats[3].base_stat,
        this.pokemonA.stats[4].base_stat,
        this.pokemonA.stats[5].base_stat
      ],
      label: this.pokemonA.name
    };

    const datasetB: ChartDataSets = {
      data: [
        this.pokemonA.stats[0].base_stat,
        this.pokemonB.stats[1].base_stat,
        this.pokemonB.stats[2].base_stat,
        this.pokemonB.stats[3].base_stat,
        this.pokemonB.stats[4].base_stat,
        this.pokemonB.stats[5].base_stat
      ],
      label: this.pokemonB.name
    };

    this.dataset = [datasetA, datasetB];
  }
}
