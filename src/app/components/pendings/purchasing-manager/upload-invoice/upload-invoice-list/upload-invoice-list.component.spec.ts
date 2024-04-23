import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {UploadInvoiceListComponent} from './upload-invoice-list.component';

describe('UploadInvoiceListComponent', () => {
  let component: UploadInvoiceListComponent;
  let fixture: ComponentFixture<UploadInvoiceListComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [UploadInvoiceListComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadInvoiceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
