import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {WorkArrivalDocumentsListComponent} from './work-arrival-documents-list.component';

describe('WorkArrivalDocumentsListComponent', () => {
  let component: WorkArrivalDocumentsListComponent;
  let fixture: ComponentFixture<WorkArrivalDocumentsListComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [WorkArrivalDocumentsListComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkArrivalDocumentsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
