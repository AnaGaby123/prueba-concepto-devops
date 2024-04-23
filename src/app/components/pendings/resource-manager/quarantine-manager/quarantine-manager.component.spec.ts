import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {QuarantineManagerComponent} from './quarantine-manager.component';

describe('QuarantineManagerComponent', () => {
  let component: QuarantineManagerComponent;
  let fixture: ComponentFixture<QuarantineManagerComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [QuarantineManagerComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(QuarantineManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
