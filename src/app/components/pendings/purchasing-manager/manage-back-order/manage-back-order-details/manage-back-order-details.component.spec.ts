import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {ManageBackOrderDetailsComponent} from './manage-back-order-details.component';

describe('ManageBackOrderDetailsComponent', () => {
  let component: ManageBackOrderDetailsComponent;
  let fixture: ComponentFixture<ManageBackOrderDetailsComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ManageBackOrderDetailsComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageBackOrderDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
