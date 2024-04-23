import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ItemLabwareComponent} from './item-labware.component';

describe('ItemPublicationsComponent', () => {
  let component: ItemLabwareComponent;
  let fixture: ComponentFixture<ItemLabwareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ItemLabwareComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemLabwareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
