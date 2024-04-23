import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PqfPopUpCarouselComponent} from './pqf-pop-up-carousel.component';

describe('PqfPopUpCarouselComponent', () => {
  let component: PqfPopUpCarouselComponent;
  let fixture: ComponentFixture<PqfPopUpCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PqfPopUpCarouselComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PqfPopUpCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
