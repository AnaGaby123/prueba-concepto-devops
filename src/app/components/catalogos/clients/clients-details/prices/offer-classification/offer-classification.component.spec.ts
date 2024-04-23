import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {OfferClassificationComponent} from './offer-classification.component';

describe('OfferClassificationComponent', () => {
  let component: OfferClassificationComponent;
  let fixture: ComponentFixture<OfferClassificationComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [OfferClassificationComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferClassificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
