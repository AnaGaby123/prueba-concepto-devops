import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {CollectionMonitoringListComponent} from './collection-monitoring-list.component';

describe('CollectionMonitoringListComponent', () => {
  let component: CollectionMonitoringListComponent;
  let fixture: ComponentFixture<CollectionMonitoringListComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [CollectionMonitoringListComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionMonitoringListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
