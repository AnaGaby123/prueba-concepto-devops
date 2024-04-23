import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AttendNotArrivedComponent} from './attend-not-arrived.component';

describe('AttendNotArrivedComponent', () => {
  let component: AttendNotArrivedComponent;
  let fixture: ComponentFixture<AttendNotArrivedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AttendNotArrivedComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendNotArrivedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
