import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PqfGenericInputComponent} from './pqf-generic-input.component';

describe('GenericInputComponent', () => {
  let component: PqfGenericInputComponent;
  let fixture: ComponentFixture<PqfGenericInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PqfGenericInputComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PqfGenericInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
