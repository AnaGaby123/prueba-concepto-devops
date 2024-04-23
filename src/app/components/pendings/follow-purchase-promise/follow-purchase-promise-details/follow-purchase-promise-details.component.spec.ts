import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {FollowPurchasePromiseDetailsComponent} from './follow-purchase-promise-details.component';

describe('FollowPurchasePromiseDetailsComponent', () => {
  let component: FollowPurchasePromiseDetailsComponent;
  let fixture: ComponentFixture<FollowPurchasePromiseDetailsComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [FollowPurchasePromiseDetailsComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(FollowPurchasePromiseDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
