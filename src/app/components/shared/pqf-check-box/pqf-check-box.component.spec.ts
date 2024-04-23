import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PqfCheckBoxComponent} from './pqf-check-box.component';

describe('PqfCheckBoxComponent', () => {
  let component: PqfCheckBoxComponent;
  let fixture: ComponentFixture<PqfCheckBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PqfCheckBoxComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PqfCheckBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
