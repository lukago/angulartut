import {
  Component, EventEmitter, OnInit,
  Output
} from '@angular/core';
import {SearchService} from '../services/search.service';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {Task} from '../models/task';

// Observable class extensions
import 'rxjs/add/observable/of';

// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
  selector: 'tmgr-search',
  templateUrl: './search.component.html',
  providers: [SearchService]
})
export class SearchComponent implements OnInit {
  @Output() searchedTasks = new EventEmitter<Observable<Task[]>>();

  private tasks = Observable.of<Task[]>([]);
  private searchTerms = new Subject<string>();

  constructor(private searchService: SearchService) {
  }

  search(term: string): void {
    this.searchTerms.next(term);
    this.searchedTasks.emit(this.tasks);
  }

  ngOnInit(): void {
    this.tasks = this.searchTerms
      .debounceTime(300)
      .distinctUntilChanged()
      .switchMap(term => this.searchService.search(term))
      .catch(error => {
        console.log(error);
        return Observable.of<Task[]>([]);
      });
  }
}
