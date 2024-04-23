import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {GeneralDataStrategyComponent} from './general-data-strategy.component';

describe('GeneralDataStrategyComponent', () => {
  let component: GeneralDataStrategyComponent;
  let fixture: ComponentFixture<GeneralDataStrategyComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [GeneralDataStrategyComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralDataStrategyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
