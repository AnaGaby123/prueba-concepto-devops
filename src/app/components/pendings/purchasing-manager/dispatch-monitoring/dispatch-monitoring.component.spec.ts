import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {DispatchMonitoringComponent} from './dispatch-monitoring.component';

describe('DispatchMonitoringComponent', () => {
  let component: DispatchMonitoringComponent;
  let fixture: ComponentFixture<DispatchMonitoringComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [DispatchMonitoringComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(DispatchMonitoringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
