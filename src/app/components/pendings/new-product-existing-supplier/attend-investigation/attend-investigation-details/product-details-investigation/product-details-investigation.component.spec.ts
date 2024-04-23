import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ProductDetailsInvestigationComponent} from './product-details-investigation.component';

describe('ProductDetailsInvestigationComponent', () => {
  let component: ProductDetailsInvestigationComponent;
  let fixture: ComponentFixture<ProductDetailsInvestigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductDetailsInvestigationComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDetailsInvestigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
