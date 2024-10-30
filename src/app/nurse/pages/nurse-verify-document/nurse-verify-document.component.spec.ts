import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NurseVerifyDocumentComponent } from './nurse-verify-document.component';

describe('NurseVerifyDocumentComponent', () => {
  let component: NurseVerifyDocumentComponent;
  let fixture: ComponentFixture<NurseVerifyDocumentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NurseVerifyDocumentComponent]
    });
    fixture = TestBed.createComponent(NurseVerifyDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
