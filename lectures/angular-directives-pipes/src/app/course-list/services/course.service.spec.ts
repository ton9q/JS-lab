import { CourseService } from './course.service';
import { coursesMock } from './course.mock';
import { Course } from '../models/course';

describe('CourseService', () => {
  let service: CourseService;
  let mockCourses;

  beforeEach(() => {
    service = new CourseService();
    mockCourses = coursesMock;
    spyOn(console, 'log');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get course list', (done) => {
    service.getList().subscribe((courses) => {
      expect(courses).toEqual(mockCourses);
      done();
    });
  });

  it('should create course', () => {
    const mockCourse = {} as Course;
    service.createCourse(mockCourse);
    expect(console.log).toHaveBeenCalledWith('create course', mockCourse);
  });

  it('should return item by id', (done) => {
    const courseId = 1;
    const resultCourse = mockCourses.courses.find((course) => course.id === courseId);
    service.getItemById(courseId).subscribe((course) => {
      expect(course).toEqual(resultCourse);
      done();
    });
  });

  it('should update course', () => {
    const mockCourse = {} as Course;
    service.updateItem(mockCourse);
    expect(console.log).toHaveBeenCalledWith('edit course', mockCourse);
  });

  it('should remove course', (done) => {
    const course = mockCourses.courses[0];
    service.removeItem(course);
    service.getList().subscribe((courses) => {
      mockCourses.courses = mockCourses.courses.filter((_course) => _course.id !== course.id);
      expect(courses).toEqual(mockCourses);
      done();
    });
  });
});
