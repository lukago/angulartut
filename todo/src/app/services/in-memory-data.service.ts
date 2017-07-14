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
        groupId: 0,
        status: false
      },
      {
        id: 1,
        title: 'Meeting with Y',
        startDate: '2017-09-11T11:20:30Z',
        note: 'Long',
        priority: 1,
        groupId: 1,
        status: false
      },
      {
        id: 2,
        title: 'Meeting with Z',
        startDate: '2019-04-11T12:20:30Z',
        note: 'Fast',
        priority: 3,
        groupId: 1,
        status: true
      },
      {
        id: 3,
        title: 'Meeting with L',
        startDate: '2018-04-11T10:30:30Z',
        note: 'Long',
        priority: 2,
        groupId: 1,
        status: false
      },
      {
        id: 4,
        title: 'Meeting with A',
        startDate: '2020-04-11T12:10:30Z',
        note: 'Fast',
        priority: 3,
        groupId: 1,
        status: true
      },
      {
        id: 5,
        title: 'Meeting with B',
        startDate: '2021-06-12T12:20:30Z',
        note: 'Fast',
        priority: 3,
        groupId: 1,
        status: true
      },
      {
        id: 6,
        title: 'Meeting with C',
        startDate: '2019-01-12T12:20:30Z',
        note: 'Fast',
        priority: 3,
        groupId: 1,
        status: true
      },
      {
        id: 7,
        title: 'Meeting with D',
        startDate: '2019-04-15T10:20:30Z',
        note: 'Fast',
        priority: 3,
        groupId: 1,
        status: true
      },
      {
        id: 8,
        title: 'Meeting with E',
        startDate: '2019-04-19T12:20:30Z',
        note: 'Fast',
        priority: 3,
        groupId: 1,
        status: true
      },
      {
        id: 9,
        title: 'Meeting with F',
        startDate: '2019-09-21T12:20:30Z',
        note: 'Fast',
        priority: 3,
        groupId: 1,
        status: true
      },
      {
        id: 10,
        title: 'Meeting with G',
        startDate: '2019-04-17T12:20:30Z',
        note: 'Lunch fast',
        priority: 3,
        groupId: 1,
        status: true
      },
      {
        id: 21,
        title: 'Meeting with H',
        startDate: '2019-04-16T12:20:30Z',
        note: 'Lunch fast',
        priority: 3,
        groupId: 1,
        status: true
      },
      {
        id: 22,
        title: 'Meeting with J',
        startDate: '2019-04-15T12:20:30Z',
        note: 'Lunch fast',
        priority: 3,
        groupId: 1,
        status: true
      },
      {
        id: 23,
        title: 'Meeting with K',
        startDate: '2019-04-12T12:20:30Z',
        note: 'Lunch fast',
        priority: 3,
        groupId: 1,
        status: true
      },
      {
        id: 24,
        title: 'Meeting with L',
        startDate: '2019-04-14T12:20:30Z',
        note: 'Lunch fast',
        priority: 3,
        groupId: 1,
        status: true
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
