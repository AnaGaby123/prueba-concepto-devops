import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PurchasingConfigurationDetailsComponent} from './purchasing-configuration-details.component';

describe('PurchasingConfigurationDashboardComponent', () => {
  let component: PurchasingConfigurationDetailsComponent;
  let fixture: ComponentFixture<PurchasingConfigurationDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PurchasingConfigurationDetailsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchasingConfigurationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
