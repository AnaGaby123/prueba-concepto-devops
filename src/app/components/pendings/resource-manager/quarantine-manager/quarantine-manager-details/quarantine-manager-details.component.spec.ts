import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {QuarantineManagerDetailsComponent} from './quarantine-manager-details.component';

describe('QuarentineManagerDetailsComponent', () => {
  let component: QuarantineManagerDetailsComponent;
  let fixture: ComponentFixture<QuarantineManagerDetailsComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [QuarantineManagerDetailsComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(QuarantineManagerDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
