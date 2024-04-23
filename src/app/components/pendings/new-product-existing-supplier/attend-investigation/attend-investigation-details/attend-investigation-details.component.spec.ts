import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {AttendInvestigationDetailsComponent} from './attend-investigation-details.component';

describe('AttendInvestigationDetailsComponent', () => {
  let component: AttendInvestigationDetailsComponent;
  let fixture: ComponentFixture<AttendInvestigationDetailsComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [AttendInvestigationDetailsComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendInvestigationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
