import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CustomAgentsComponent} from './custom-agents.component';

describe('CustomAgentsComponent', () => {
  let component: CustomAgentsComponent;
  let fixture: ComponentFixture<CustomAgentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomAgentsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomAgentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
