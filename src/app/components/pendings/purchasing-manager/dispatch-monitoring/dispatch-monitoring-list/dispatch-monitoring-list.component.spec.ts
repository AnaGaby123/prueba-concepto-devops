import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {DispatchMonitoringListComponent} from './dispatch-monitoring-list.component';

describe('DispatchMonitoringListComponent', () => {
  let component: DispatchMonitoringListComponent;
  let fixture: ComponentFixture<DispatchMonitoringListComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [DispatchMonitoringListComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(DispatchMonitoringListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
