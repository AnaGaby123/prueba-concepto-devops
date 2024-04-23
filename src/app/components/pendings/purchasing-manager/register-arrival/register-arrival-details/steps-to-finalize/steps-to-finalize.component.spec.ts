import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {StepsToFinalizeComponent} from './steps-to-finalize.component';

describe('StepsToFinalizeComponent', () => {
  let component: StepsToFinalizeComponent;
  let fixture: ComponentFixture<StepsToFinalizeComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [StepsToFinalizeComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(StepsToFinalizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
