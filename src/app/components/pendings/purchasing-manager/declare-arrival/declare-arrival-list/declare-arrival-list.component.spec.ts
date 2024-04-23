import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {DeclareArrivalListComponent} from './declare-arrival-list.component';

describe('DeclareArrivalListComponent', () => {
  let component: DeclareArrivalListComponent;
  let fixture: ComponentFixture<DeclareArrivalListComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [DeclareArrivalListComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(DeclareArrivalListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
