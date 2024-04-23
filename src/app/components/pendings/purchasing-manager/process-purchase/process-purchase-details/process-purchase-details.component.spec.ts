import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {ProcessPurchaseDetailsComponent} from './process-purchase-details.component';

describe('ProcessPurchaseDetailsComponent', () => {
  let component: ProcessPurchaseDetailsComponent;
  let fixture: ComponentFixture<ProcessPurchaseDetailsComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ProcessPurchaseDetailsComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessPurchaseDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
