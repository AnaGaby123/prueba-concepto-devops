import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {ControlSupplierClaimListComponent} from './control-supplier-claim-list.component';

describe('ControlSupplierClaimListComponent', () => {
  let component: ControlSupplierClaimListComponent;
  let fixture: ComponentFixture<ControlSupplierClaimListComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ControlSupplierClaimListComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlSupplierClaimListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
