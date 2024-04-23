import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PqfToggleComponent} from './pqf-toggle.component';

describe('PqfToggleComponent', () => {
  let component: PqfToggleComponent;
  let fixture: ComponentFixture<PqfToggleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PqfToggleComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PqfToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
