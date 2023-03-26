import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDesignConfigComponent } from './form-design-config.component';

describe('FormDesignConfigComponent', () => {
  let component: FormDesignConfigComponent;
  let fixture: ComponentFixture<FormDesignConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormDesignConfigComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormDesignConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
