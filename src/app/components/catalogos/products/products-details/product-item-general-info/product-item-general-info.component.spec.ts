import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {ProductItemGeneralInfoComponent} from './product-item-general-info.component';

describe('AddProductsComponent', () => {
  let component: ProductItemGeneralInfoComponent;
  let fixture: ComponentFixture<ProductItemGeneralInfoComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ProductItemGeneralInfoComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductItemGeneralInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
