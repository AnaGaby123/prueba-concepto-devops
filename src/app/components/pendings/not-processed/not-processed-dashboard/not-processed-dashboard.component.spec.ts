import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {NotProcessedDashboardComponent} from './not-processed-dashboard.component';

describe('NotProcessedListComponent', () => {
  let component: NotProcessedDashboardComponent;
  let fixture: ComponentFixture<NotProcessedDashboardComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [NotProcessedDashboardComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(NotProcessedDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
