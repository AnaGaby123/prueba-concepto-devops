import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {WithoutImpactFormComponent} from './without-impact-form.component';

describe('WithoutImpactFormComponent', () => {
  let component: WithoutImpactFormComponent;
  let fixture: ComponentFixture<WithoutImpactFormComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [WithoutImpactFormComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(WithoutImpactFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
