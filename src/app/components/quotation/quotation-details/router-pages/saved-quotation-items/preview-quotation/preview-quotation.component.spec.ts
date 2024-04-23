import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {PreviewQuotationComponent} from './preview-quotation.component';

describe('FreightConfiguratorComponent', () => {
  let component: PreviewQuotationComponent;
  let fixture: ComponentFixture<PreviewQuotationComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [PreviewQuotationComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewQuotationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
