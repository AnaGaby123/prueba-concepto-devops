import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {InspectorDetailsComponent} from './inspector-details.component';

describe('InspectorDetailsComponent', () => {
  let component: InspectorDetailsComponent;
  let fixture: ComponentFixture<InspectorDetailsComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [InspectorDetailsComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(InspectorDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
