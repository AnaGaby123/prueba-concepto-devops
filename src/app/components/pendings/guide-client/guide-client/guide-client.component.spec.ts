import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {GuideClientComponent} from './guide-client.component';

describe('GuideClientComponent', () => {
  let component: GuideClientComponent;
  let fixture: ComponentFixture<GuideClientComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [GuideClientComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(GuideClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
