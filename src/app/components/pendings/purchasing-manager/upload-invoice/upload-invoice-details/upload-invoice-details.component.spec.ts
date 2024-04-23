import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {UploadInvoiceDetailsComponent} from './upload-invoice-details.component';

describe('UploadInvoiceDetailsComponent', () => {
  let component: UploadInvoiceDetailsComponent;
  let fixture: ComponentFixture<UploadInvoiceDetailsComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [UploadInvoiceDetailsComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadInvoiceDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
