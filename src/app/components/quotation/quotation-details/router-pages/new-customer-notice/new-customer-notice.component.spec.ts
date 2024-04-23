import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {NewCustomerNoticeComponent} from './new-customer-notice.component';

describe('NewCustomerNoticeComponent', () => {
  let component: NewCustomerNoticeComponent;
  let fixture: ComponentFixture<NewCustomerNoticeComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [NewCustomerNoticeComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCustomerNoticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
