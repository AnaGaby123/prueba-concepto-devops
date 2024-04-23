import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {ManageBackOrderComponent} from './manage-back-order.component';

describe('ManageBackOrderComponent', () => {
  let component: ManageBackOrderComponent;
  let fixture: ComponentFixture<ManageBackOrderComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ManageBackOrderComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageBackOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
