import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {AttendInvestigationComponent} from './attend-investigation.component';

describe('AttendInvestigationComponent', () => {
  let component: AttendInvestigationComponent;
  let fixture: ComponentFixture<AttendInvestigationComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [AttendInvestigationComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendInvestigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
