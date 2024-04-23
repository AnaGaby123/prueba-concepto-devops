import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {LoadBalanceInFavorListComponent} from './load-balance-in-favor-list.component';

describe('LoadBalanceInFavorListComponent', () => {
  let component: LoadBalanceInFavorListComponent;
  let fixture: ComponentFixture<LoadBalanceInFavorListComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [LoadBalanceInFavorListComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadBalanceInFavorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
