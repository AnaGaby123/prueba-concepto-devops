import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {AttendInvestigationListComponent} from './attend-investigation-list.component';

describe('AttendInvestigationListComponent', () => {
  let component: AttendInvestigationListComponent;
  let fixture: ComponentFixture<AttendInvestigationListComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [AttendInvestigationListComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendInvestigationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
