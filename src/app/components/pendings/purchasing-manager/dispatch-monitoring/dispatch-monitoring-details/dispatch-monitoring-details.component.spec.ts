import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {DispatchMonitoringDetailsComponent} from './dispatch-monitoring-details.component';

describe('DispatchMonitoringDetailsComponent', () => {
  let component: DispatchMonitoringDetailsComponent;
  let fixture: ComponentFixture<DispatchMonitoringDetailsComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [DispatchMonitoringDetailsComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(DispatchMonitoringDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
