import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {CheckOcNotArrivedDetailsComponent} from './check-oc-not-arrived-details.component';

describe('CheckOcNotArrivedDetailsComponent', () => {
  let component: CheckOcNotArrivedDetailsComponent;
  let fixture: ComponentFixture<CheckOcNotArrivedDetailsComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [CheckOcNotArrivedDetailsComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckOcNotArrivedDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
