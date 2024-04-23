import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {ExecuteCollectionCalendarComponent} from './execute-collection-calendar.component';

describe('ExecuteCollectionCalendarComponent', () => {
  let component: ExecuteCollectionCalendarComponent;
  let fixture: ComponentFixture<ExecuteCollectionCalendarComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ExecuteCollectionCalendarComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ExecuteCollectionCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
