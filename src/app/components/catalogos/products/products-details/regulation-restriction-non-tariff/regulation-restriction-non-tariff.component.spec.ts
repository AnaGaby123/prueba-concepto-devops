import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {RegulationRestrictionNonTariffComponent} from './regulation-restriction-non-tariff.component';

describe('RegulationRestrictionNonTariffComponent', () => {
  let component: RegulationRestrictionNonTariffComponent;
  let fixture: ComponentFixture<RegulationRestrictionNonTariffComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [RegulationRestrictionNonTariffComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(RegulationRestrictionNonTariffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
