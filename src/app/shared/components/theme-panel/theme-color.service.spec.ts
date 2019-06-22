import { TestBed } from '@angular/core/testing';

import { ThemeColorService } from './theme-color.service';

describe('ThemeColorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ThemeColorService = TestBed.get(ThemeColorService);
    expect(service).toBeTruthy();
  });
});
