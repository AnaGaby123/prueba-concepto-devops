import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {DeclareArrivalGuideListComponent} from './declare-arrival-guide-list.component';

describe('DeclareArrivalGuideListComponent', () => {
  let component: DeclareArrivalGuideListComponent;
  let fixture: ComponentFixture<DeclareArrivalGuideListComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [DeclareArrivalGuideListComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(DeclareArrivalGuideListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
