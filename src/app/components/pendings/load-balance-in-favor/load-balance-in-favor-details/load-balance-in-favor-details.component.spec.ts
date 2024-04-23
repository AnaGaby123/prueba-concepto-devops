import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {LoadBalanceInFavorDetailsComponent} from './load-balance-in-favor-details.component';

describe('LoadBalanceInFavorDetailsComponent', () => {
  let component: LoadBalanceInFavorDetailsComponent;
  let fixture: ComponentFixture<LoadBalanceInFavorDetailsComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [LoadBalanceInFavorDetailsComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadBalanceInFavorDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
