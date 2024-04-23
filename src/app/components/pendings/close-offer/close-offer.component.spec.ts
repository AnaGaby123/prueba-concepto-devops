import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {CloseOfferComponent} from './close-offer.component';

describe('CloseOfferComponent', () => {
  let component: CloseOfferComponent;
  let fixture: ComponentFixture<CloseOfferComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [CloseOfferComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(CloseOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
