import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDesignTreeComponent } from './form-design-tree.component';

describe('FormDesignTreeComponent', () => {
  let component: FormDesignTreeComponent;
  let fixture: ComponentFixture<FormDesignTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormDesignTreeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormDesignTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
