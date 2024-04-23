import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {ListPriceComponent} from './list-price.component';

describe('ListPriceComponent', () => {
  let component: ListPriceComponent;
  let fixture: ComponentFixture<ListPriceComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ListPriceComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
