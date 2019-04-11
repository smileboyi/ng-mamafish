import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BgHeaderComponent } from './bg-header.component';

describe('BgHeaderComponent', () => {
  let component: BgHeaderComponent;
  let fixture: ComponentFixture<BgHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BgHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BgHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
