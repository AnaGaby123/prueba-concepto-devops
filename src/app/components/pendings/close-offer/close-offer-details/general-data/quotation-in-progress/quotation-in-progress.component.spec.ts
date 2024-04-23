import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {QuotationInProgressComponent} from './quotation-in-progress.component';

describe('QuotationInProgressComponent', () => {
  let component: QuotationInProgressComponent;
  let fixture: ComponentFixture<QuotationInProgressComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [QuotationInProgressComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotationInProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
