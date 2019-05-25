import { TestBed, async, inject } from '@angular/core/testing';

import { UnsaveGuard } from './unsave.guard';

describe('UnsaveGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UnsaveGuard]
    });
  });

  it('should ...', inject([UnsaveGuard], (guard: UnsaveGuard) => {
    expect(guard).toBeTruthy();
  }));
});
