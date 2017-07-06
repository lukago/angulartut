import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Hero} from '../models/hero';
import 'rxjs/add/operator/map';
import {SearchService} from './search.service';

@Injectable()
export class HeroSearchService implements SearchService {

  constructor(private http: Http) { }

  search(term: string): Observable<Hero[]> {
    return this.http
      .get(`api/heroes/?name=${term}`)
      .map(resposne => resposne.json().data as Hero[]);
  }
}
