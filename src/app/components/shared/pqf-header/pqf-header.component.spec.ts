import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PqfHeaderComponent} from './pqf-header.component';

describe('PqfHeaderComponent', () => {
  let component: PqfHeaderComponent;
  let fixture: ComponentFixture<PqfHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PqfHeaderComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PqfHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
