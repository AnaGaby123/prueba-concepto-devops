import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PqfDashboardFiltersComponent} from './pqf-dashboard-filters.component';

describe('PqfDashboardFiltersComponent', () => {
  let component: PqfDashboardFiltersComponent;
  let fixture: ComponentFixture<PqfDashboardFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PqfDashboardFiltersComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PqfDashboardFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
