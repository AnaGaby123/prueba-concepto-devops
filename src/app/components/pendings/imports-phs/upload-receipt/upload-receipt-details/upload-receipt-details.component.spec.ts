import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {UploadReceiptDetailsComponent} from './upload-receipt-details.component';

describe('UploadReceiptDetailsComponent', () => {
  let component: UploadReceiptDetailsComponent;
  let fixture: ComponentFixture<UploadReceiptDetailsComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [UploadReceiptDetailsComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadReceiptDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
