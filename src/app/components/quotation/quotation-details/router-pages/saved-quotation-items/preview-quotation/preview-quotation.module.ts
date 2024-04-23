import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PopUpGenericModule} from '@appComponents/shared/pop-up-generic/pop-up-generic.module';
import {BarActivitiesModule} from '@appComponents/shared/bar-activities/bar-activities.module';
import {CheckBoxModule} from '@appComponents/shared/check-box/check-box.module';
import {VirtualScrollerModule} from '@iharbeck/ngx-virtual-scroller';
import {WithoutResultsModule} from '@appComponents/shared/without-results/without-results.module';
import {RadioButtonModule} from '@appComponents/shared/radio-button/radio-button.module';
import {GenericTextAreaModule} from '@appComponents/shared/generic-text-area/generic-text-area.module';
import {TranslateModule} from '@ngx-translate/core';
import {PreviewQuotationComponent} from '@appComponents/quotation/quotation-details/router-pages/saved-quotation-items/preview-quotation/preview-quotation.component';
import {UploadViewFileModule} from '@appComponents/shared/upload-view-file/upload-view-file.module';
import {LoadingModule} from '@appComponents/shared/loading/loading.module';

@NgModule({
  imports: [
    CommonModule,
    PopUpGenericModule,
    BarActivitiesModule,
    CheckBoxModule,
    VirtualScrollerModule,
    WithoutResultsModule,
    RadioButtonModule,
    GenericTextAreaModule,
    TranslateModule,
    UploadViewFileModule,
    LoadingModule,
  ],
  exports: [PreviewQuotationComponent],
  declarations: [PreviewQuotationComponent],
})
export class PreviewQuotationModule {}
