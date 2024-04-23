import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {PopUpBackOrderComponent} from './pop-up-back-order.component';

describe('PopUpBackOrderComponent', () => {
  let component: PopUpBackOrderComponent;
  let fixture: ComponentFixture<PopUpBackOrderComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [PopUpBackOrderComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(PopUpBackOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
