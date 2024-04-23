import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SalesConfigurationDetailsComponent} from './sales-configuration-details.component';

describe('SalesConfigurationDashboardComponent', () => {
  let component: SalesConfigurationDetailsComponent;
  let fixture: ComponentFixture<SalesConfigurationDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SalesConfigurationDetailsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesConfigurationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
