import {Component, OnInit} from '@angular/core';

import { Hero }         from '../models/hero';
import { HeroService }  from '../services/hero.service';
import {Router}         from '@angular/router';

@Component({
  selector: 'my-heroes',
  templateUrl: './views/heroes.component.html',
  styleUrls: [ './views/heroes.component.css' ]
})
export class HeroesComponent implements OnInit {
  selectedHero: Hero;
  heroes: Hero[];

  constructor(
    private heroService: HeroService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

  getHeroes(): void {
    this.heroService
      .getHeroes()
      .then(heroes => this.heroes = heroes);
  }

  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedHero.id])
      .then(success => {
        if (!success) {
          console.error('cant reach detail');
        } else {
          console.warn('going to details...');
        }
      });
  }

  addHero(name: String): void {
    name = name.trim();
    if (!name) {return; }
    this.heroService.create(name)
      .then( hero => {
        this.selectedHero = null;
        this.heroes.push(hero);
      });
  }

  deleteHero(hero: Hero): void {
    this.heroService
      .delete(hero.id)
      .then(() => {
        this.heroes = this.heroes.filter(h => h !== hero);
        if (this.selectedHero === hero) {this.selectedHero = null; }
      });
  }

}

