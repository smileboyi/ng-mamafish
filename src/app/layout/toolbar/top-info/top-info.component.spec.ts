import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopInfoComponent } from './top-info.component';

describe('TopInfoComponent', () => {
  let component: TopInfoComponent;
  let fixture: ComponentFixture<TopInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
