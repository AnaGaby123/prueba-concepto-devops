import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {CloseOfferListComponent} from './close-offer-list.component';

describe('CloseOfferListComponent', () => {
  let component: CloseOfferListComponent;
  let fixture: ComponentFixture<CloseOfferListComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [CloseOfferListComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(CloseOfferListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
