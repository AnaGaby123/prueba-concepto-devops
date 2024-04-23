import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ItemInvestigationListComponent} from './item-investigation-list.component';

describe('ItemInvestigationListComponent', () => {
  let component: ItemInvestigationListComponent;
  let fixture: ComponentFixture<ItemInvestigationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ItemInvestigationListComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemInvestigationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
