import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {ControlSupplierClaimComponent} from './control-supplier-claim.component';

describe('ControlSupplierClaimComponent', () => {
  let component: ControlSupplierClaimComponent;
  let fixture: ComponentFixture<ControlSupplierClaimComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ControlSupplierClaimComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlSupplierClaimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
