import { InMemoryDbService } from 'angular-in-memory-web-api';
 
export class InMemHeroService implements InMemoryDbService {
  createDb() {
    let heroes = [
      { id: 1, path: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png' },
      { id: 2, path: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png' },
      { id: 3, path: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png' },
    ];
    return {heroes};
  }
}