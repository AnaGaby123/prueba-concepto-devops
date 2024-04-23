import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {WarehouseDashboardComponent} from './warehouse-dashboard.component';

describe('WarehouseDashboardComponent', () => {
  let component: WarehouseDashboardComponent;
  let fixture: ComponentFixture<WarehouseDashboardComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [WarehouseDashboardComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(WarehouseDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
