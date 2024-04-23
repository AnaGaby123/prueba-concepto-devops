import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {SecurityGuardRegisterComponent} from './security-guard-register.component';

describe('SecurityGuardRegisterComponent', () => {
  let component: SecurityGuardRegisterComponent;
  let fixture: ComponentFixture<SecurityGuardRegisterComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [SecurityGuardRegisterComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(SecurityGuardRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
