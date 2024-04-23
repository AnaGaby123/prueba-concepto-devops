import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SeeResumeComponent} from './see-resume.component';

describe('SecureShipmentSeeResumeComponent', () => {
  let component: SeeResumeComponent;
  let fixture: ComponentFixture<SeeResumeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SeeResumeComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeeResumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
