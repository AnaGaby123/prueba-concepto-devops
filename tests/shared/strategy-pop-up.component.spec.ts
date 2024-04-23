import {ComponentFixture, TestBed} from '@angular/core/testing';

import {StrategyPopUpComponent} from '@appComponents/shared/strategy-pop-up/strategy-pop-up.component';

describe('StrategyPopUpComponent', () => {
  let component: StrategyPopUpComponent;
  let fixture: ComponentFixture<StrategyPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StrategyPopUpComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StrategyPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
