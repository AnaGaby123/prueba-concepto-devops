import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PqfDropDownListComponent} from './pqf-drop-down-list.component';

describe('PqfDropDownListComponent', () => {
  let component: PqfDropDownListComponent;
  let fixture: ComponentFixture<PqfDropDownListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PqfDropDownListComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PqfDropDownListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
