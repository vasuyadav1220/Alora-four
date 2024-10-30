import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarePlanComponent } from './care-plan.component';

describe('CarePlanComponent', () => {
  let component: CarePlanComponent;
  let fixture: ComponentFixture<CarePlanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarePlanComponent]
    });
    fixture = TestBed.createComponent(CarePlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
