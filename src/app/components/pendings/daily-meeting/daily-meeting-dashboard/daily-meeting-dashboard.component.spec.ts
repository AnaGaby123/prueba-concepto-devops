import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {DailyMeetingDashboardComponent} from './daily-meeting-dashboard.component';

describe('DailyMeetingListComponent', () => {
  let component: DailyMeetingDashboardComponent;
  let fixture: ComponentFixture<DailyMeetingDashboardComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [DailyMeetingDashboardComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyMeetingDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
