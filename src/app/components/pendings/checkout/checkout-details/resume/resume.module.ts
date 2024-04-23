import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ResumeComponent} from './resume.component';
import {ResumeRoutingModule} from '@appComponents/pendings/checkout/checkout-details/resume/resume-routing.module';
import {TranslateModule} from '@ngx-translate/core';
import {VirtualScrollerModule} from '@iharbeck/ngx-virtual-scroller';
import {GenericTextAreaModule} from '@appComponents/shared/generic-text-area/generic-text-area.module';
import {PopUpGenericModule} from '@appComponents/shared/pop-up-generic/pop-up-generic.module';
import {DateFormatModule} from '@appPipes/date-format.module';
import {UploadViewFileModule} from '@appComponents/shared/upload-view-file/upload-view-file.module';
import {InternalSalesItemModule} from '@appComponents/shared/item-quote/internal-sales-item.module';
import {HeaderInternalSalesItemModule} from '@appComponents/shared/header-internal-sales-item/header-internal-sales-item.module';
import {PqfDraggableModalModule} from '@appComponents/shared/pqf-draggable-modal/pqf-draggable-modal.module';

@NgModule({
  declarations: [ResumeComponent],
  imports: [
    CommonModule,
    ResumeRoutingModule,
    TranslateModule,
    VirtualScrollerModule,
    GenericTextAreaModule,
    PopUpGenericModule,
    DateFormatModule,
    UploadViewFileModule,
    InternalSalesItemModule,
    HeaderInternalSalesItemModule,
    PqfDraggableModalModule,
  ],
  exports: [ResumeComponent],
})
export class ResumeModule {}
