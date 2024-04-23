import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {CloseOfferDetailsComponent} from './close-offer-details.component';

describe('CloseOfferDetailsComponent', () => {
  let component: CloseOfferDetailsComponent;
  let fixture: ComponentFixture<CloseOfferDetailsComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [CloseOfferDetailsComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(CloseOfferDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
