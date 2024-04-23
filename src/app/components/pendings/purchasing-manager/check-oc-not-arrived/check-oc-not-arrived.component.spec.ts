import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {CheckOcNotArrivedComponent} from './check-oc-not-arrived.component';

describe('CheckOcNotArrivedComponent', () => {
  let component: CheckOcNotArrivedComponent;
  let fixture: ComponentFixture<CheckOcNotArrivedComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [CheckOcNotArrivedComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckOcNotArrivedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
