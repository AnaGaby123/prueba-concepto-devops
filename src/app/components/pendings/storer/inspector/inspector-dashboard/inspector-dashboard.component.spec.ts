import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {InspectorDashboardComponent} from './inspector-dashboard.component';

describe('InspectorDashboardComponent', () => {
  let component: InspectorDashboardComponent;
  let fixture: ComponentFixture<InspectorDashboardComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [InspectorDashboardComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(InspectorDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
