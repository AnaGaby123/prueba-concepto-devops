import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {OfferCharacteristicGrouperComponent} from './offer-characteristic-grouper.component';

describe('OfferClassificationComponent', () => {
  let component: OfferCharacteristicGrouperComponent;
  let fixture: ComponentFixture<OfferCharacteristicGrouperComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [OfferCharacteristicGrouperComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferCharacteristicGrouperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
