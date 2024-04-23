import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {LogisticsTimesComponent} from './logistics-times.component';

describe('LogisticsTimerComponent', () => {
  let component: LogisticsTimesComponent;
  let fixture: ComponentFixture<LogisticsTimesComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [LogisticsTimesComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(LogisticsTimesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
