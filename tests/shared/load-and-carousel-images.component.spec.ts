import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {LoadAndCarouselImagesComponent} from '@appComponents/shared/load-and-carousel-images/load-and-carousel-images.component';

describe('LoadAndCarouselImagesComponent', () => {
  let component: LoadAndCarouselImagesComponent;
  let fixture: ComponentFixture<LoadAndCarouselImagesComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [LoadAndCarouselImagesComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadAndCarouselImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
