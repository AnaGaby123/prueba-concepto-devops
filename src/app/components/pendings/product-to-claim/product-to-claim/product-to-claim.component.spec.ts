import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {ProductToClaimComponent} from './product-to-claim.component';

describe('ProductToClaimComponent', () => {
  let component: ProductToClaimComponent;
  let fixture: ComponentFixture<ProductToClaimComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ProductToClaimComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductToClaimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
