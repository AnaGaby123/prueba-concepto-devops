import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PqfGenericPopUpComponent} from './pqf-generic-pop-up.component';

describe('PqfGenericPopUpComponent', () => {
  let component: PqfGenericPopUpComponent;
  let fixture: ComponentFixture<PqfGenericPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PqfGenericPopUpComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PqfGenericPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
