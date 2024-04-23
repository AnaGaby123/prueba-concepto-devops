import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {ProductToClaimDetailsComponent} from './product-to-claim-details.component';

describe('ProductToClaimDetailsComponent', () => {
  let component: ProductToClaimDetailsComponent;
  let fixture: ComponentFixture<ProductToClaimDetailsComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ProductToClaimDetailsComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductToClaimDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
