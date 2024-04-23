import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ReferenceFormEditComponent} from './reference-form-edit.component';

describe('ReferenceFormEditComponent', () => {
  let component: ReferenceFormEditComponent;
  let fixture: ComponentFixture<ReferenceFormEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReferenceFormEditComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferenceFormEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
