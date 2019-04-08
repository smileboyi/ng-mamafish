import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MailBoxComponent } from './mail-box.component';

describe('MailBoxComponent', () => {
  let component: MailBoxComponent;
  let fixture: ComponentFixture<MailBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MailBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MailBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
