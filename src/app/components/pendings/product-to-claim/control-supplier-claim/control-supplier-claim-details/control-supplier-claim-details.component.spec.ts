import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {ControlSupplierClaimDetailsComponent} from './control-supplier-claim-details.component';

describe('ControlSupplierClaimDetailsComponent', () => {
  let component: ControlSupplierClaimDetailsComponent;
  let fixture: ComponentFixture<ControlSupplierClaimDetailsComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ControlSupplierClaimDetailsComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlSupplierClaimDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
