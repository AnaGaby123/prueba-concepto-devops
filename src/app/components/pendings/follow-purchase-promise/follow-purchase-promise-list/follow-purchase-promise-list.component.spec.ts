import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {FollowPurchasePromiseListComponent} from './follow-purchase-promise-list.component';

describe('FollowPurchasePromiseListComponent', () => {
  let component: FollowPurchasePromiseListComponent;
  let fixture: ComponentFixture<FollowPurchasePromiseListComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [FollowPurchasePromiseListComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(FollowPurchasePromiseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
