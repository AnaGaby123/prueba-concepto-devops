import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {SecurityGuardDetailsComponent} from './security-guard-details.component';

describe('SecurityGuardListComponent', () => {
  let component: SecurityGuardDetailsComponent;
  let fixture: ComponentFixture<SecurityGuardDetailsComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [SecurityGuardDetailsComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(SecurityGuardDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
