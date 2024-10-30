import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddleadComponent } from './addlead.component';

describe('AddleadComponent', () => {
  let component: AddleadComponent;
  let fixture: ComponentFixture<AddleadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddleadComponent]
    });
    fixture = TestBed.createComponent(AddleadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
