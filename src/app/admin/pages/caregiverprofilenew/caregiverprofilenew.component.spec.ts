import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaregiverprofilenewComponent } from './caregiverprofilenew.component';

describe('CaregiverprofilenewComponent', () => {
  let component: CaregiverprofilenewComponent;
  let fixture: ComponentFixture<CaregiverprofilenewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CaregiverprofilenewComponent]
    });
    fixture = TestBed.createComponent(CaregiverprofilenewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
