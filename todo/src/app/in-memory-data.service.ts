import {InMemoryDbService} from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {

  createDb() {
    const tasksTab = [
      {
        title: 'Meeting with X',
        startDate: '2016-04-11T10:20:10Z',
        note: 'Fast',
        proirity: 2
      },
      {
        title: 'Meeting with Y',
        startDate: '2017-09-11T11:20:30Z',
        note: 'Long',
        proirity: 1
      },
      {
      title: 'Meeting with Z',
      startDate: '2019-04-11T12:20:30Z',
      note: 'Lunch fast',
      proirity: 3
      },
      {
        title: 'Meeting with L',
        startDate: '2018-04-11T10:30:30Z',
        note: 'Long',
        proirity: 2
      }
    ];

    const groups = [
      {
        title: 'Work',
        tasks: [tasksTab[0], tasksTab[1]]
      },
      {
        title: 'Other',
        tasks: [tasksTab[1], tasksTab[2], tasksTab[3]]
      }
    ];

    return {groups};
  }
}
