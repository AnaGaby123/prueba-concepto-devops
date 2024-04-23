import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {PriorityConsoleListComponent} from './priority-console-list.component';

describe('PriorityConsoleListComponent', () => {
  let component: PriorityConsoleListComponent;
  let fixture: ComponentFixture<PriorityConsoleListComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [PriorityConsoleListComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(PriorityConsoleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
