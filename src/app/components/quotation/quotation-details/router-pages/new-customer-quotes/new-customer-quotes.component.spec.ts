import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {NewCustomerQuotesComponent} from './new-customer-quotes.component';

describe('NewCustomerQuotesComponent', () => {
  let component: NewCustomerQuotesComponent;
  let fixture: ComponentFixture<NewCustomerQuotesComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [NewCustomerQuotesComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCustomerQuotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
