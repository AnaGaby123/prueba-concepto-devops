import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {DispatchPointCustomsAgentComponent} from './dispatch-point-customs-agent.component';

describe('DispatchPointCustomsAgentComponent', () => {
  let component: DispatchPointCustomsAgentComponent;
  let fixture: ComponentFixture<DispatchPointCustomsAgentComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [DispatchPointCustomsAgentComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(DispatchPointCustomsAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
