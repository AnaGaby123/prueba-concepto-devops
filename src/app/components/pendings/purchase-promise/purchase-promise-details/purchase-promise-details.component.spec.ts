import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {PurchasePromiseDetailsComponent} from './purchase-promise-details.component';

describe('PurchasePromiseDetailsComponent', () => {
  let component: PurchasePromiseDetailsComponent;
  let fixture: ComponentFixture<PurchasePromiseDetailsComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [PurchasePromiseDetailsComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchasePromiseDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
