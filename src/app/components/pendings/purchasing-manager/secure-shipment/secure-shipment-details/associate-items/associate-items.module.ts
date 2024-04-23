import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AssociateItemsRoutingModule} from './associate-items-routing.module';
import {AssociateItemsComponent} from '@purchasing-manager/secure-shipment/secure-shipment-details/associate-items/associate-items.component';
import {VirtualScrollerModule} from '@iharbeck/ngx-virtual-scroller';
import {ProviderContactsModule} from '@appComponents/shared/provider-contacts/provider-contacts.module';
import {ProgressBarModule} from '@appComponents/shared/progress-bar/progress-bar.module';
import {GenericInputFileModule} from '@appComponents/shared/generic-input-file/generic-input-file.module';
import {GenericInputModule} from '@appComponents/shared/generic-input/generic-input.module';
import {DropDownListModule} from '@appComponents/shared/drop-down-list/drop-down-list.module';
import {DateFormatModule} from '@appPipes/date-format.module';
import {LoadingModule} from '@appComponents/shared/loading/loading.module';
import {WithoutResultsModule} from '@appComponents/shared/without-results/without-results.module';
import {TranslateModule} from '@ngx-translate/core';
import {DatePickerModule} from '@appComponents/shared/date-picker/date-picker.module';
import {PopUpSendEmailModule} from '@appComponents/shared/pop-up-send-email/pop-up-send-email.module';
import {GenericTextAreaModule} from '@appComponents/shared/generic-text-area/generic-text-area.module';

@NgModule({
  declarations: [AssociateItemsComponent],
  imports: [
    CommonModule,
    AssociateItemsRoutingModule,
    VirtualScrollerModule,
    ProviderContactsModule,
    ProgressBarModule,
    GenericInputFileModule,
    GenericInputModule,
    DropDownListModule,
    DateFormatModule,
    LoadingModule,
    WithoutResultsModule,
    TranslateModule,
    DatePickerModule,
    PopUpSendEmailModule,
    GenericTextAreaModule,
  ],
  exports: [AssociateItemsComponent],
})
export class AssociateItemsModule {}
