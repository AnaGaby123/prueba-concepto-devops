import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {DeclareArrivalGuideComponent} from './declare-arrival-guide.component';

describe('DeclareArrivalGuideComponent', () => {
  let component: DeclareArrivalGuideComponent;
  let fixture: ComponentFixture<DeclareArrivalGuideComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [DeclareArrivalGuideComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(DeclareArrivalGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
