import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ItemAdjustedComponent} from './item-adjusted.component';

describe('ItemAdjustedComponent', () => {
  let component: ItemAdjustedComponent;
  let fixture: ComponentFixture<ItemAdjustedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ItemAdjustedComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemAdjustedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
