import { TestBed } from '@angular/core/testing';

import { LayoutConfigService } from './layout-config.service';

describe('LayoutConfigService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LayoutConfigService = TestBed.get(LayoutConfigService);
    expect(service).toBeTruthy();
  });
});
