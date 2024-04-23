import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {DeclareTransitArrivalComponent} from './declare-transit-arrival.component';

describe('DeclareTransitArrivalComponent', () => {
  let component: DeclareTransitArrivalComponent;
  let fixture: ComponentFixture<DeclareTransitArrivalComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [DeclareTransitArrivalComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(DeclareTransitArrivalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
