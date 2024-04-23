import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {UploadReceiptListComponent} from './upload-receipt-list.component';

describe('UploadReceiptListComponent', () => {
  let component: UploadReceiptListComponent;
  let fixture: ComponentFixture<UploadReceiptListComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [UploadReceiptListComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadReceiptListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
