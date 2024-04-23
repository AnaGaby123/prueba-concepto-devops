import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {CustomerContactQuotesComponent} from './customer-contact-quotes.component';

describe('CustomerContactQuotesComponent', () => {
  let component: CustomerContactQuotesComponent;
  let fixture: ComponentFixture<CustomerContactQuotesComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [CustomerContactQuotesComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerContactQuotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
