import { TestBed } from '@angular/core/testing';

import { XlsxService } from './xlsx.service';

describe('XlsxService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: XlsxService = TestBed.get(XlsxService);
    expect(service).toBeTruthy();
  });
});
