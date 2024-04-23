/* Core Imports */
import {NgModule} from '@angular/core';

/* Common Imports */
import {CommonModule} from '@angular/common';

/* Components Imports */
import {LoadAndCarouselImagesComponent} from '@appComponents/shared/load-and-carousel-images/load-and-carousel-images.component';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  imports: [CommonModule, TranslateModule],
  exports: [LoadAndCarouselImagesComponent],
  declarations: [LoadAndCarouselImagesComponent],
})
export class LoadAndCarouselImagesModule {}
