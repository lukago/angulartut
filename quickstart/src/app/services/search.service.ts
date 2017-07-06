import {Observable} from 'rxjs/Observable';
import {Hero} from '../models/hero';
import {Injectable} from '@angular/core';

@Injectable()
export abstract class SearchService {
  abstract search(term: string): Observable<Hero[]>;
}

