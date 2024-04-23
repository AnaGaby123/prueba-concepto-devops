import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {SavedQuotationItemsComponent} from './saved-quotation-items.component';

describe('CheckOutQuotationComponent', () => {
  let component: SavedQuotationItemsComponent;
  let fixture: ComponentFixture<SavedQuotationItemsComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [SavedQuotationItemsComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(SavedQuotationItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
