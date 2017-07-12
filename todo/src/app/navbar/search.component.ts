import {Component, OnInit} from '@angular/core';
import {SearchService} from '../services/search.service';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {Task} from '../models/Task';
import {Router} from '@angular/router';

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
  tasks: Observable<Task[]>;
  private searchTerms = new Subject<string>();

  constructor(
    private searchService: SearchService,
    private router: Router
  ) {}

  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.tasks = this.searchTerms
      .debounceTime(300)
      .distinctUntilChanged()
      .switchMap(term => term
        ? this.searchService.search(term)
        : Observable.of<Task[]>([]))
      .catch(error => {
        console.log(error);
        return Observable.of<Task[]>([]);
      });
  }

  gotoDetail(task: Task, input: HTMLInputElement): void {
    input.value = '';
    this.search('');
    this.router.navigate(['/tasks', task.id]);
  }
}
