import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Hero} from '../models/hero';
import 'rxjs/add/operator/map';
import {IHeroSearchService} from '../models/iherosearch';

@Injectable()
export class HeroSearchService implements IHeroSearchService {

  constructor(private http: Http) {}

  search(term: string): Observable<Hero[]> {
    return this.http
      .get(`api/heroes/?name=${term}`)
      .map(resposne => resposne.json().data as Hero[]);
  }
}
