import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {DailyMeetingComponent} from './daily-meeting.component';

describe('DailyMeetingComponent', () => {
  let component: DailyMeetingComponent;
  let fixture: ComponentFixture<DailyMeetingComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [DailyMeetingComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyMeetingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
