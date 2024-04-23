import {ComponentFixture, TestBed} from '@angular/core/testing';

import {RegulationAndRestrictionsComponent} from './regulation-and-restrictions.component';

describe('RegulationAndNonTariffRestrictionsComponent', () => {
  let component: RegulationAndRestrictionsComponent;
  let fixture: ComponentFixture<RegulationAndRestrictionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegulationAndRestrictionsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegulationAndRestrictionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
