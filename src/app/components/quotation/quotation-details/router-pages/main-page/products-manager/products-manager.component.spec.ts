import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {ProductsManagerComponent} from './products-manager.component';

describe('ProductsManagerComponent', () => {
  let component: ProductsManagerComponent;
  let fixture: ComponentFixture<ProductsManagerComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ProductsManagerComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
