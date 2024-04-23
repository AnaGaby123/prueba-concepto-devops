import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ItemListProductInvestigationComponentComponent} from './item-list-product-investigation-component.component';

describe('ItemListProductInvestigationComponentComponent', () => {
  let component: ItemListProductInvestigationComponentComponent;
  let fixture: ComponentFixture<ItemListProductInvestigationComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ItemListProductInvestigationComponentComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemListProductInvestigationComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
