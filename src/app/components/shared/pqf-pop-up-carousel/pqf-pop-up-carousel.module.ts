import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PqfPopUpCarouselComponent} from '@appComponents/shared/pqf-pop-up-carousel/pqf-pop-up-carousel.component';
import {PqfGenericPopUpFilesModule} from '@appComponents/shared/pqf-generic-pop-up-files/pqf-generic-pop-up-files.module';
import {PqfGenericPopUpModule} from '@appComponents/shared/pqf-generic-pop-up/pqf-generic-pop-up.module';

@NgModule({
  declarations: [PqfPopUpCarouselComponent],
  imports: [CommonModule, PqfGenericPopUpFilesModule, PqfGenericPopUpModule],
  exports: [PqfPopUpCarouselComponent],
})
export class PqfPopUpCarouselModule {}
