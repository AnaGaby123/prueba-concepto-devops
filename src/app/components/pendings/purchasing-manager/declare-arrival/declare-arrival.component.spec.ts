import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {DeclareArrivalComponent} from './declare-arrival.component';

describe('DeclareArrivalComponent', () => {
  let component: DeclareArrivalComponent;
  let fixture: ComponentFixture<DeclareArrivalComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [DeclareArrivalComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(DeclareArrivalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
