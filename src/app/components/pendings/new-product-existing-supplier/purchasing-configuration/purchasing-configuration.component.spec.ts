import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PurchasingConfigurationComponent} from './purchasing-configuration.component';

describe('PurchasingConfigurationComponent', () => {
  let component: PurchasingConfigurationComponent;
  let fixture: ComponentFixture<PurchasingConfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PurchasingConfigurationComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchasingConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
