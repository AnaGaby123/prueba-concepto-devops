import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {ProductCardItemComponent} from '@appComponents/shared/product-card-item/product-card-item.component';

describe('ProductCardItemComponent', () => {
  let component: ProductCardItemComponent;
  let fixture: ComponentFixture<ProductCardItemComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ProductCardItemComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCardItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
