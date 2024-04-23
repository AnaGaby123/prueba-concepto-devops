import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {TechCommercialInvestComponent} from './tech-commercial-invest.component';

describe('TechnicalCommercialInvestigationComponent', () => {
  let component: TechCommercialInvestComponent;
  let fixture: ComponentFixture<TechCommercialInvestComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [TechCommercialInvestComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(TechCommercialInvestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
