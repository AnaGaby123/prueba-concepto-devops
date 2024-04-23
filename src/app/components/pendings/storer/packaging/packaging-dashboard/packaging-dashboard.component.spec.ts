import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {PackagingDashboardComponent} from './packaging-dashboard.component';

describe('PackagingDashboardComponent', () => {
  let component: PackagingDashboardComponent;
  let fixture: ComponentFixture<PackagingDashboardComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [PackagingDashboardComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(PackagingDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
