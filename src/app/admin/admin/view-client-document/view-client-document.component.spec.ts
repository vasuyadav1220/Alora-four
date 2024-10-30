import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewClientDocumentComponent } from './view-client-document.component';

describe('ViewClientDocumentComponent', () => {
  let component: ViewClientDocumentComponent;
  let fixture: ComponentFixture<ViewClientDocumentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewClientDocumentComponent]
    });
    fixture = TestBed.createComponent(ViewClientDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
