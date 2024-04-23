import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {TechCommercialInvestigationComponent} from './tech-commercial-investigation.component';

describe('TechnicalCommercialInvestigationComponent', () => {
  let component: TechCommercialInvestigationComponent;
  let fixture: ComponentFixture<TechCommercialInvestigationComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [TechCommercialInvestigationComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(TechCommercialInvestigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
