import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ItemSavedDetailsDialogComponent} from './item-saved-details-dialog.component';

describe('ItemSavedDetailsDialogComponent', () => {
  let component: ItemSavedDetailsDialogComponent;
  let fixture: ComponentFixture<ItemSavedDetailsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ItemSavedDetailsDialogComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemSavedDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
