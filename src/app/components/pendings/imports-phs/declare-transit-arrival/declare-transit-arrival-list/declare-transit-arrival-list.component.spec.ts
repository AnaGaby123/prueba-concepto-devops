import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {DeclareTransitArrivalListComponent} from './declare-transit-arrival-list.component';

describe('DeclareTransitArrivalListComponent', () => {
  let component: DeclareTransitArrivalListComponent;
  let fixture: ComponentFixture<DeclareTransitArrivalListComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [DeclareTransitArrivalListComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(DeclareTransitArrivalListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
