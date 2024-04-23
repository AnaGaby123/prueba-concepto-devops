import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {PurchasePromiseListComponent} from './purchase-promise-list.component';

describe('PurchasePromiseListComponent', () => {
  let component: PurchasePromiseListComponent;
  let fixture: ComponentFixture<PurchasePromiseListComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [PurchasePromiseListComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchasePromiseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
