import {Component, Inject, OnInit} from '@angular/core';
import {HeroSearchService} from '../services/hero-serarch.service';
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
import {IHERO_SEARCH, IHeroSearchService} from '../models/iherosearch';

@Component({
  selector: 'hero-search',
  templateUrl: './views/hero-search.component.html',
  styleUrls: ['./views/hero-search.component.css'],
  providers: [
    {provide: IHERO_SEARCH, useValue: HeroSearchService}
  ]
})
export class HeroSearchComponent implements OnInit {
  heroes: Observable<Hero[]>;
  private searchTerms = new Subject<string>();

  constructor(
    @Inject(IHERO_SEARCH) private heroSearchService: IHeroSearchService,
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
