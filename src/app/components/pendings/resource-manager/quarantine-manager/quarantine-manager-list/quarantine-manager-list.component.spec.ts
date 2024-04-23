import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {QuarantineManagerListComponent} from './quarantine-manager-list.component';

describe('QuarentineManagerListComponent', () => {
  let component: QuarantineManagerListComponent;
  let fixture: ComponentFixture<QuarantineManagerListComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [QuarantineManagerListComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(QuarantineManagerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
