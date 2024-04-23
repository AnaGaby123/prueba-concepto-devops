import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {ListPriceItemComponent} from './list-price-item.component';

describe('ListPriceItemComponent', () => {
  let component: ListPriceItemComponent;
  let fixture: ComponentFixture<ListPriceItemComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ListPriceItemComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPriceItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
