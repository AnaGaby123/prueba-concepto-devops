import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {CollectionMonitoringComponent} from './collection-monitoring.component';

describe('CollectionMonitoringComponent', () => {
  let component: CollectionMonitoringComponent;
  let fixture: ComponentFixture<CollectionMonitoringComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [CollectionMonitoringComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionMonitoringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
