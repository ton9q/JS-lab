import { CourseListModule } from './course-list.module';

describe('CourseListModule', () => {
  let courseListModule: CourseListModule;

  beforeEach(() => {
    courseListModule = new CourseListModule();
  });

  it('should create an instance', () => {
    expect(courseListModule).toBeTruthy();
  });
});
