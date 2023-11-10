import { TestBed } from '@angular/core/testing';

import { ThreemaService } from './threema.service';

describe('ThreemaService', () => {
  let service: ThreemaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThreemaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
