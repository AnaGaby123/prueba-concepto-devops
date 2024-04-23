import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {BackOrderFormComponent} from './back-order-form.component';

describe('BackOrderFormComponent', () => {
  let component: BackOrderFormComponent;
  let fixture: ComponentFixture<BackOrderFormComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [BackOrderFormComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(BackOrderFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
