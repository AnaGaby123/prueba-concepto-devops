import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {LoadBalanceInFavorComponent} from './load-balance-in-favor.component';

describe('LoadBalanceInFavorComponent', () => {
  let component: LoadBalanceInFavorComponent;
  let fixture: ComponentFixture<LoadBalanceInFavorComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [LoadBalanceInFavorComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadBalanceInFavorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
