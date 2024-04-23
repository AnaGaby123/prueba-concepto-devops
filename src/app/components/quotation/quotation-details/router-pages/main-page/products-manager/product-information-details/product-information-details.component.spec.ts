import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ProductInformationDetailsComponent} from './product-information-details.component';

describe('ProductInformationDetailsComponent', () => {
  let component: ProductInformationDetailsComponent;
  let fixture: ComponentFixture<ProductInformationDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductInformationDetailsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductInformationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
