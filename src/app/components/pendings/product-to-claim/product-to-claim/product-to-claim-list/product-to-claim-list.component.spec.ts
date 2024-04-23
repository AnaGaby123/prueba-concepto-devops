import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {ProductToClaimListComponent} from './product-to-claim-list.component';

describe('ProductToClaimListComponent', () => {
  let component: ProductToClaimListComponent;
  let fixture: ComponentFixture<ProductToClaimListComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ProductToClaimListComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductToClaimListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
