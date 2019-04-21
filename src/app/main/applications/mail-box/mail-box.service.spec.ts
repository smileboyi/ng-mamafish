import { TestBed } from '@angular/core/testing';

import { MailBoxService } from './mail-box.service';

describe('MailBoxService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MailBoxService = TestBed.get(MailBoxService);
    expect(service).toBeTruthy();
  });
});
