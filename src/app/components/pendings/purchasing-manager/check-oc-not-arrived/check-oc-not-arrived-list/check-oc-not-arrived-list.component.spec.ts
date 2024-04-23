import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {CheckOcNotArrivedListComponent} from './check-oc-not-arrived-list.component';

describe('CheckOcNotArrivedListComponent', () => {
  let component: CheckOcNotArrivedListComponent;
  let fixture: ComponentFixture<CheckOcNotArrivedListComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [CheckOcNotArrivedListComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckOcNotArrivedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
