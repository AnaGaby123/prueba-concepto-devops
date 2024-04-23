import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AddendaPopUpComponent} from './addenda-pop-up.component';

describe('AddendaPopUpComponent', () => {
  let component: AddendaPopUpComponent;
  let fixture: ComponentFixture<AddendaPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddendaPopUpComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddendaPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
