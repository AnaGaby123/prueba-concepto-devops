import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CustomAgentCostComponent} from './custom-agent-cost.component';

describe('CustomAgentCostComponent', () => {
  let component: CustomAgentCostComponent;
  let fixture: ComponentFixture<CustomAgentCostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomAgentCostComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomAgentCostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
