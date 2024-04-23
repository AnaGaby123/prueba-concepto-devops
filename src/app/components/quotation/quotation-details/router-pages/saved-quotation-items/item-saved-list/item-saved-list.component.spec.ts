import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ItemSavedListComponent} from './item-saved-list.component';

describe('ItemSavedListComponent', () => {
  let component: ItemSavedListComponent;
  let fixture: ComponentFixture<ItemSavedListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ItemSavedListComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemSavedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
