import {InMemoryDbService} from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {

  createDb() {
    const tasks = [
      {
        id: 0,
        time: '2017-04-11T10:20:30Z',
        description: 'meeting',
        place: 'NY'
      },
      {
        id: 1,
        time: '2017-07-11T10:20:30Z',
        description: 'training 1',
        place: 'LA'
      },
      {
        id: 2,
        time: '2011-08-11T10:11:15Z',
        description: 'meeting with someone',
        place: 'Wahington'
      },
      {
        id: 3,
        time: '2011-04-11T10:20:30Z',
        description: 'todo',
        place: 'Lodz'
      },
      {
        id: 4,
        time: '2018-04-11T10:20:30Z',
        description: 'gotoxd',
        place: 'xD xD xD'
      }
    ];
    //this.sleep(10000);
    return {tasks};
  }

  sleep(millis: number): void {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      console.log('e');
      if ((new Date().getTime() - start) > millis) {
        break;
      }
    }
  }
}


