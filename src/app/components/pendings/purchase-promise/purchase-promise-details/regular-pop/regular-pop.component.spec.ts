import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {RegularPopComponent} from './regular-pop.component';

describe('RegularPopComponent', () => {
  let component: RegularPopComponent;
  let fixture: ComponentFixture<RegularPopComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [RegularPopComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(RegularPopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
