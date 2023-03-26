import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDesignHeaderComponent } from './form-design-header.component';

describe('FormDesignHeaderComponent', () => {
  let component: FormDesignHeaderComponent;
  let fixture: ComponentFixture<FormDesignHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormDesignHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormDesignHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
