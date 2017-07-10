import {InMemoryDbService} from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {

  createDb() {
    const tasksarr = [
      {
        id: 0,
        title: 'Meeting with X',
        startDate: '2016-04-11T10:20:10Z',
        note: 'Fast',
        priority: 2
      },
      {
        id: 1,
        title: 'Meeting with Y',
        startDate: '2017-09-11T11:20:30Z',
        note: 'Long',
        priority: 1
      },
      {
        id: 2,
        title: 'Meeting with Z',
        startDate: '2019-04-11T12:20:30Z',
        note: 'Lunch fast',
        priority: 3
      },
      {
        id: 3,
        title: 'Meeting with L',
        startDate: '2018-04-11T10:30:30Z',
        note: 'Long',
        priority: 2
      }
    ];

    const groups = [
      {
        id: 0,
        title: 'Work',
        tasks: [tasksarr[0], tasksarr[1]]
      },
      {
        id: 1,
        title: 'Other',
        tasks: [tasksarr[1], tasksarr[2], tasksarr[3]]
      }
    ];

    return {tasksarr, groups};
  }
}
