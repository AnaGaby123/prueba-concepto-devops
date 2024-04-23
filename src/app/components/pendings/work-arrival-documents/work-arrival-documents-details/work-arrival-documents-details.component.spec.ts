import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {WorkArrivalDocumentsDetailsComponent} from './work-arrival-documents-details.component';

describe('WorkArrivalDocumentsDetailsComponent', () => {
  let component: WorkArrivalDocumentsDetailsComponent;
  let fixture: ComponentFixture<WorkArrivalDocumentsDetailsComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [WorkArrivalDocumentsDetailsComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkArrivalDocumentsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
