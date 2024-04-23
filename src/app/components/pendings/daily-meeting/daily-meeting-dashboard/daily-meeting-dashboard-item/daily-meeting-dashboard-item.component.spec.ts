import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DailyMeetingDashboardItemComponent} from './daily-meeting-dashboard-item.component';

describe('QuotationDashboardItemComponent', () => {
  let component: DailyMeetingDashboardItemComponent;
  let fixture: ComponentFixture<DailyMeetingDashboardItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DailyMeetingDashboardItemComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyMeetingDashboardItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
