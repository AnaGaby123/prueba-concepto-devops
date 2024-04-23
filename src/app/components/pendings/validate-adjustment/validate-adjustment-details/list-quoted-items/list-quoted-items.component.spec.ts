import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {ListQuotedItemsComponent} from './list-quoted-items.component';

describe('ItemListComponent', () => {
  let component: ListQuotedItemsComponent;
  let fixture: ComponentFixture<ListQuotedItemsComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ListQuotedItemsComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ListQuotedItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
