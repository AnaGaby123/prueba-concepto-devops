import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {TotalQuotePdfComponent} from './total-quote-pdf.component';

describe('TotalQuotePdfComponent', () => {
  let component: TotalQuotePdfComponent;
  let fixture: ComponentFixture<TotalQuotePdfComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [TotalQuotePdfComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalQuotePdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
