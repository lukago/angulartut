import {Component, OnInit} from '@angular/core';
import {HeroSearchService} from '../services/hero-serarch.service';
import {SearchService} from '../services/search.service';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {Hero} from '../models/hero';
import {Router} from '@angular/router';

// Observable class extensions
import 'rxjs/add/observable/of';

// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
  selector: 'hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css'],
  providers: [{provide: SearchService, useClass: HeroSearchService}]
})
export class HeroSearchComponent implements OnInit {
  heroes: Observable<Hero[]>;
  private searchTerms = new Subject<string>();

  constructor(
    private heroSearchService: SearchService,
    private router: Router
  ) {}

  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.heroes = this.searchTerms
      .debounceTime(300)
      .distinctUntilChanged()
      .switchMap(term => term
        ? this.heroSearchService.search(term)
          : Observable.of<Hero[]>([]))
      .catch(error => {
        console.log(error);
        return Observable.of<Hero[]>([]);
      });
  }

  gotoDetail(hero: Hero): void {
    let link = ['/detail', hero.id];
    this.router.navigate(link);
  }
}
