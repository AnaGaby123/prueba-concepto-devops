import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {PurchasePromiseComponent} from './purchase-promise.component';

describe('PurchasePromiseComponent', () => {
  let component: PurchasePromiseComponent;
  let fixture: ComponentFixture<PurchasePromiseComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [PurchasePromiseComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchasePromiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
