import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ItemChemicalComponent} from './item-chemical.component';

describe('ItemPublicationsComponent', () => {
  let component: ItemChemicalComponent;
  let fixture: ComponentFixture<ItemChemicalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ItemChemicalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemChemicalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
