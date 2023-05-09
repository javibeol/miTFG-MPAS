import { TestBed } from '@angular/core/testing';

import { MallaServiceService } from './malla-service.service';

describe('MallaServiceService', () => {
  let service: MallaServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MallaServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
