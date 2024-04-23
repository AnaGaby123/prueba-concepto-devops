import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {CustomsAgentsListComponent} from './customs-agents-list.component';

describe('CustomsAgentsListComponent', () => {
  let component: CustomsAgentsListComponent;
  let fixture: ComponentFixture<CustomsAgentsListComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [CustomsAgentsListComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomsAgentsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
