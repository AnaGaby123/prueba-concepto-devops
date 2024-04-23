import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {OrderModificationListComponent} from './order-modification-list.component';

describe('OrderModificationListComponent', () => {
  let component: OrderModificationListComponent;
  let fixture: ComponentFixture<OrderModificationListComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [OrderModificationListComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderModificationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
