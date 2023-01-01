import { TestBed } from '@angular/core/testing';

import { FormDesignService } from './form-design.service';

describe('FormDesignService', () => {
  let service: FormDesignService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormDesignService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
