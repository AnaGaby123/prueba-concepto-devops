import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {SellBuyLicensesComponent} from './sell-buy-licenses.component';

describe('SellBuyLicensesComponent', () => {
  let component: SellBuyLicensesComponent;
  let fixture: ComponentFixture<SellBuyLicensesComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [SellBuyLicensesComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(SellBuyLicensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
