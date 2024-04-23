import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ItemPublicationsComponent} from './item-publications.component';

describe('ItemPublicationsComponent', () => {
  let component: ItemPublicationsComponent;
  let fixture: ComponentFixture<ItemPublicationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ItemPublicationsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemPublicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
