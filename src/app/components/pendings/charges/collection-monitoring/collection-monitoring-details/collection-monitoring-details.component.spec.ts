import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {CollectionMonitoringDetailsComponent} from './collection-monitoring-details.component';

describe('CollectionMonitoringDetailsComponent', () => {
  let component: CollectionMonitoringDetailsComponent;
  let fixture: ComponentFixture<CollectionMonitoringDetailsComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [CollectionMonitoringDetailsComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionMonitoringDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
