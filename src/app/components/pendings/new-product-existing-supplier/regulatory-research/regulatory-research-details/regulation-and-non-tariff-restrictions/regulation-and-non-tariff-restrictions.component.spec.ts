import {ComponentFixture, TestBed} from '@angular/core/testing';

import {RegulationAndNonTariffRestrictionsComponent} from './regulation-and-non-tariff-restrictions.component';

describe('RegulationAndNonTariffRestrictionsComponent', () => {
  let component: RegulationAndNonTariffRestrictionsComponent;
  let fixture: ComponentFixture<RegulationAndNonTariffRestrictionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegulationAndNonTariffRestrictionsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegulationAndNonTariffRestrictionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
