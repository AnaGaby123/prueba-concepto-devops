import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {SmartBusinessComponent} from './smart-business.component';

describe('SmartBusinessComponent', () => {
  let component: SmartBusinessComponent;
  let fixture: ComponentFixture<SmartBusinessComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [SmartBusinessComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(SmartBusinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
