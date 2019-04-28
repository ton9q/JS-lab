import { TestBed } from '@angular/core/testing';

import { DataHomeworksService } from './dataHomeworks.service';

describe('DataHomeworksService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DataHomeworksService = TestBed.get(DataHomeworksService);
    expect(service).toBeTruthy();
  });
});
