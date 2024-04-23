import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {SecurityGuardWaybillsComponent} from './security-guard-waybills.component';

describe('SecurityGuardWaybillsComponent', () => {
  let component: SecurityGuardWaybillsComponent;
  let fixture: ComponentFixture<SecurityGuardWaybillsComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [SecurityGuardWaybillsComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(SecurityGuardWaybillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
