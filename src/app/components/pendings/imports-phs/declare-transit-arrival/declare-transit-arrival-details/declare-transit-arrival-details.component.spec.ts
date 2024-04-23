import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {DeclareTransitArrivalDetailsComponent} from './declare-transit-arrival-details.component';

describe('DeclareTransitalArrivalDetailsComponent', () => {
  let component: DeclareTransitArrivalDetailsComponent;
  let fixture: ComponentFixture<DeclareTransitArrivalDetailsComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [DeclareTransitArrivalDetailsComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(DeclareTransitArrivalDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
