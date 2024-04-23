import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ConfigurationComponent} from './configuration.component';
import {TranslateModule} from '@ngx-translate/core';
import {UploadViewFileModule} from '@appComponents/shared/upload-view-file/upload-view-file.module';
import {LoadAndCarouselImagesModule} from '@appComponents/shared/load-and-carousel-images/load-and-carousel-images.module';
import {GenericInputModule} from '@appComponents/shared/generic-input/generic-input.module';
import {DatePickerModule} from '@appComponents/shared/date-picker/date-picker.module';
import {DropDownListModule} from '@appComponents/shared/drop-down-list/drop-down-list.module';
import {PopUpAlertModule} from '@appComponents/shared/pop-up-alert/pop-up-alert.module';

@NgModule({
  declarations: [ConfigurationComponent],
  imports: [
    CommonModule,
    TranslateModule,
    UploadViewFileModule,
    LoadAndCarouselImagesModule,
    GenericInputModule,
    DatePickerModule,
    DropDownListModule,
    PopUpAlertModule,
  ],
  exports: [ConfigurationComponent],
})
export class ConfigurationModule {}
