import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {OrderModificationComponent} from './order-modification.component';

describe('OrderModificationComponent', () => {
  let component: OrderModificationComponent;
  let fixture: ComponentFixture<OrderModificationComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [OrderModificationComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderModificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
