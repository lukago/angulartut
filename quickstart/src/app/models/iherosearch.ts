import {Observable} from 'rxjs/Observable';
import {Hero} from './hero';
import {InjectionToken} from '@angular/core';

export declare abstract class IHeroSearchService {
  search(term: string): Observable<Hero[]>;
}

export const IHERO_SEARCH =
  new InjectionToken<IHeroSearchService>('iherosearch');

