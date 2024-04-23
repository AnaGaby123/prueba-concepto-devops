import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {DeclareArrivalDetailsComponent} from './declare-arrival-details.component';

describe('DeclareArrivalDetailsComponent', () => {
  let component: DeclareArrivalDetailsComponent;
  let fixture: ComponentFixture<DeclareArrivalDetailsComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [DeclareArrivalDetailsComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(DeclareArrivalDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
