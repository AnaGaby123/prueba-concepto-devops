import {ComponentFixture, TestBed} from '@angular/core/testing';

import {RegulatoryResearchDashboardComponent} from './regulatory-research-dashboard.component';

describe('RegulatoryResearchDashboardComponent', () => {
  let component: RegulatoryResearchDashboardComponent;
  let fixture: ComponentFixture<RegulatoryResearchDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegulatoryResearchDashboardComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegulatoryResearchDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
