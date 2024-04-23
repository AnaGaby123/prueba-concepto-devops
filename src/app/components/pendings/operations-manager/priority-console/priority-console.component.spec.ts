import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {PriorityConsoleComponent} from './priority-console.component';

describe('PriorityConsoleComponent', () => {
  let component: PriorityConsoleComponent;
  let fixture: ComponentFixture<PriorityConsoleComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [PriorityConsoleComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(PriorityConsoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
