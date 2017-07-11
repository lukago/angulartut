import {InMemoryDbService} from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {

  createDb() {
    const tasks = [
      {
        id: 0,
        title: 'Meeting with X',
        startDate: '2016-04-11T10:20:10Z',
        note: 'Fast',
        priority: 2,
        groupId: 0
      },
      {
        id: 1,
        title: 'Meeting with Y',
        startDate: '2017-09-11T11:20:30Z',
        note: 'Long',
        priority: 1,
        groupId: 1
      },
      {
        id: 2,
        title: 'Meeting with Z',
        startDate: '2019-04-11T12:20:30Z',
        note: 'Lunch fast',
        priority: 3,
        groupId: 1
      },
      {
        id: 3,
        title: 'Meeting with L',
        startDate: '2018-04-11T10:30:30Z',
        note: 'Long',
        priority: 2,
        groupId: 1
      }
    ];

    const groups = [
      {
        id: 0,
        title: 'Work',
      },
      {
        id: 1,
        title: 'Other',
      }
    ];

    return {tasks, groups};
  }
}
