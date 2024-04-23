import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {PopUpStrategyComponent} from './pop-up-strategy.component';

describe('PopUpStrategyComponent', () => {
  let component: PopUpStrategyComponent;
  let fixture: ComponentFixture<PopUpStrategyComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [PopUpStrategyComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(PopUpStrategyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
