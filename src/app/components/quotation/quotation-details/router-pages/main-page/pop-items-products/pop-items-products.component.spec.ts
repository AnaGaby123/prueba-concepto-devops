import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PopItemsProductsComponent} from './pop-items-products.component';

describe('ItemPublicationsComponent', () => {
  let component: PopItemsProductsComponent;
  let fixture: ComponentFixture<PopItemsProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PopItemsProductsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopItemsProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
