import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {CustomsAgentsDetailsComponent} from './customs-agents-details.component';

describe('CustomsAgentsDetailsComponent', () => {
  let component: CustomsAgentsDetailsComponent;
  let fixture: ComponentFixture<CustomsAgentsDetailsComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [CustomsAgentsDetailsComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomsAgentsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
