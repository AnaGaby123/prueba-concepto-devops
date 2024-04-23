import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {DailyMeetingDetailsComponent} from './daily-meeting-details.component';

describe('DailyMeetingDetailsComponent', () => {
  let component: DailyMeetingDetailsComponent;
  let fixture: ComponentFixture<DailyMeetingDetailsComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [DailyMeetingDetailsComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyMeetingDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
