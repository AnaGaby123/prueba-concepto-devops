import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {CustomsAgentsComponent} from './customs-agents.component';

describe('CustomsAgentsComponent', () => {
  let component: CustomsAgentsComponent;
  let fixture: ComponentFixture<CustomsAgentsComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [CustomsAgentsComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomsAgentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
