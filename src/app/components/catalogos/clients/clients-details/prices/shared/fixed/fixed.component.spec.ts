import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {FixedComponent} from './fixed.component';

describe('FixedComponent', () => {
  let component: FixedComponent;
  let fixture: ComponentFixture<FixedComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [FixedComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(FixedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
