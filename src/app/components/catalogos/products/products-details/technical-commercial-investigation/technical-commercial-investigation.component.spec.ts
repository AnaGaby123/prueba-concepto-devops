import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {TechnicalCommercialInvestigationComponent} from './technical-commercial-investigation.component';

describe('TechnicalCommercialInvestigationComponent', () => {
  let component: TechnicalCommercialInvestigationComponent;
  let fixture: ComponentFixture<TechnicalCommercialInvestigationComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [TechnicalCommercialInvestigationComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(TechnicalCommercialInvestigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
