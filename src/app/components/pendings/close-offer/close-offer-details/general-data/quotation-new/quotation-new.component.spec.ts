import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {QuotationNewComponent} from './quotation-new.component';

describe('QuotationNewComponent', () => {
  let component: QuotationNewComponent;
  let fixture: ComponentFixture<QuotationNewComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [QuotationNewComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotationNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
