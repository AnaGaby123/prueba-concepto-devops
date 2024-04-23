import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {GuideClientListComponent} from './guide-client-list.component';

describe('GuideClientListComponent', () => {
  let component: GuideClientListComponent;
  let fixture: ComponentFixture<GuideClientListComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [GuideClientListComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(GuideClientListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
