import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ItemBiologicComponent} from './item-biologic.component';

describe('ItemPublicationsComponent', () => {
  let component: ItemBiologicComponent;
  let fixture: ComponentFixture<ItemBiologicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ItemBiologicComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemBiologicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
