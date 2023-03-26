import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDesignEleComponent } from './form-design-ele.component';

describe('FormDesignEleComponent', () => {
  let component: FormDesignEleComponent;
  let fixture: ComponentFixture<FormDesignEleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormDesignEleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormDesignEleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
