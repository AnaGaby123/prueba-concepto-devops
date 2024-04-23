import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {WorkArrivalDocumentsComponent} from './work-arrival-documents.component';

describe('WorkArrivalDocumentsComponent', () => {
  let component: WorkArrivalDocumentsComponent;
  let fixture: ComponentFixture<WorkArrivalDocumentsComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [WorkArrivalDocumentsComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkArrivalDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
