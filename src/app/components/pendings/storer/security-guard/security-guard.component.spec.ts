import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {SecurityGuardComponent} from './security-guard.component';

describe('SegurityGuardComponent', () => {
  let component: SecurityGuardComponent;
  let fixture: ComponentFixture<SecurityGuardComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [SecurityGuardComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(SecurityGuardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
