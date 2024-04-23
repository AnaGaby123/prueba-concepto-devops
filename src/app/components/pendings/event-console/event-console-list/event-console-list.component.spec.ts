import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {EventConsoleListComponent} from './event-console-list.component';

describe('EventConsoleListComponent', () => {
  let component: EventConsoleListComponent;
  let fixture: ComponentFixture<EventConsoleListComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [EventConsoleListComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(EventConsoleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
