import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {UploadInvoiceComponent} from './upload-invoice.component';

describe('UploadInvoiceComponent', () => {
  let component: UploadInvoiceComponent;
  let fixture: ComponentFixture<UploadInvoiceComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [UploadInvoiceComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
