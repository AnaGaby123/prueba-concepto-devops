import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {FollowPurchasePromiseComponent} from './follow-purchase-promise.component';

describe('FollowPurchasePromiseComponent', () => {
  let component: FollowPurchasePromiseComponent;
  let fixture: ComponentFixture<FollowPurchasePromiseComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [FollowPurchasePromiseComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(FollowPurchasePromiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
