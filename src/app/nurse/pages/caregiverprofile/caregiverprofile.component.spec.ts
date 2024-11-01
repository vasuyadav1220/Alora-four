import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaregiverprofileComponent } from './caregiverprofile.component';

describe('CaregiverprofileComponent', () => {
  let component: CaregiverprofileComponent;
  let fixture: ComponentFixture<CaregiverprofileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CaregiverprofileComponent]
    });
    fixture = TestBed.createComponent(CaregiverprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
