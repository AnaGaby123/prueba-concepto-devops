import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ObservationsMessageTooltipComponent} from './observations-message-tooltip.component';

describe('ObservationsMessageTooltipComponent', () => {
  let component: ObservationsMessageTooltipComponent;
  let fixture: ComponentFixture<ObservationsMessageTooltipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ObservationsMessageTooltipComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ObservationsMessageTooltipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
