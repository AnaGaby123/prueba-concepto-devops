import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {UploadReceiptComponent} from './upload-receipt.component';

describe('UploadReceiptComponent', () => {
  let component: UploadReceiptComponent;
  let fixture: ComponentFixture<UploadReceiptComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [UploadReceiptComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadReceiptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
