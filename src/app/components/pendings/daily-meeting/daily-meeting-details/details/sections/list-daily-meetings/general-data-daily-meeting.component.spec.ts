import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {GeneralDataDailyMeetingsComponent} from './general-data-daily-meeting.component';

describe('GeneralDataDailyMeetingsComponent', () => {
  let component: GeneralDataDailyMeetingsComponent;
  let fixture: ComponentFixture<GeneralDataDailyMeetingsComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [GeneralDataDailyMeetingsComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralDataDailyMeetingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
