import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {LogisticsPaymentsComponent} from './logistics-payments.component';

describe('LogicticsPaymentsComponent', () => {
  let component: LogisticsPaymentsComponent;
  let fixture: ComponentFixture<LogisticsPaymentsComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [LogisticsPaymentsComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(LogisticsPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
