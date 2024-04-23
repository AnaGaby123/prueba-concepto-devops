import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AttendNotArriveListComponent} from './attend-not-arrive-list.component';

describe('AttendNotArriveListComponent', () => {
  let component: AttendNotArriveListComponent;
  let fixture: ComponentFixture<AttendNotArriveListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AttendNotArriveListComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendNotArriveListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
