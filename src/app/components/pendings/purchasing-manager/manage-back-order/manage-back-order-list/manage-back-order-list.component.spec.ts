import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {ManageBackOrderListComponent} from './manage-back-order-list.component';

describe('ManageBackOrderListComponent', () => {
  let component: ManageBackOrderListComponent;
  let fixture: ComponentFixture<ManageBackOrderListComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ManageBackOrderListComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageBackOrderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
