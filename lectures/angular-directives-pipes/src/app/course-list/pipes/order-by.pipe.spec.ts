import { OrderByPipe } from './order-by.pipe';
import { Course } from '../models/course';

let pipe: OrderByPipe<Course>;

describe('OrderByPipe', () => {
  const courses = [
    {
      id: 3,
      title: 'Title 3',
      creationDate: '2018-05-10',
      duration: 34,
      description: 'Description 3'
    },
    {
      id: 4,
      title: 'Title 3',
      creationDate: '2018-05-10',
      duration: 34,
      description: 'Description 3'
    },
    {
      id: 2,
      title: 'Title 2',
      creationDate: '2018-05-10',
      duration: 35,
      description: 'Description 2'
    },
    {
      id: 1,
      title: 'Title 1',
      creationDate: '2018-05-10',
      duration: 36,
      description: 'Description 1'
    }
  ];

  const orderedCourses = [
    {
      id: 1,
      title: 'Title 1',
      creationDate: '2018-05-10',
      duration: 36,
      description: 'Description 1'
    },
    {
      id: 2,
      title: 'Title 2',
      creationDate: '2018-05-10',
      duration: 35,
      description: 'Description 2'
    },
    {
      id: 3,
      title: 'Title 3',
      creationDate: '2018-05-10',
      duration: 34,
      description: 'Description 3'
    },
    {
      id: 4,
      title: 'Title 3',
      creationDate: '2018-05-10',
      duration: 34,
      description: 'Description 3'
    },
  ];

  beforeEach(() => {
    pipe = new OrderByPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should sort by specific field', () => {
    expect(pipe.transform(courses, 'title')).toEqual(orderedCourses);
  });
});
