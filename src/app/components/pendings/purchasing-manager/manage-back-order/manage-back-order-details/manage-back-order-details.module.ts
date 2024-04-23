import {NgModule} from '@angular/core';
import {ManageBackOrderDetailsComponent} from '@purchasing-manager/manage-back-order/manage-back-order-details/manage-back-order-details.component';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ManageBackOrderDetailsRoutingModule} from '@purchasing-manager/manage-back-order/manage-back-order-details/manage-back-order-details-routing.module';
import {TranslateModule} from '@ngx-translate/core';
import {TabsModule} from '@appComponents/shared/tabs/tabs.module';
import {SearchModule} from '@appComponents/shared/search/search.module';
import {VirtualScrollerModule} from '@iharbeck/ngx-virtual-scroller';
import {DateFormatModule} from '@appPipes/date-format.module';
import {RadioButtonModule} from '@appComponents/shared/radio-button/radio-button.module';
import {DropDownListModule} from '@appComponents/shared/drop-down-list/drop-down-list.module';
import {PopUpGenericModule} from '@appComponents/shared/pop-up-generic/pop-up-generic.module';
import {PopUpBackOrderComponent} from '@purchasing-manager/manage-back-order/manage-back-order-details/pop-up-back-order/pop-up-back-order.component';
import {GenericTextAreaModule} from '@appComponents/shared/generic-text-area/generic-text-area.module';
import {DateRangeModule} from '@appComponents/shared/date-range/date-range.module';
import {DatePickerModule} from '@appComponents/shared/date-picker/date-picker.module';
import {LoadingModule} from '@appComponents/shared/loading/loading.module';
import {PopUpRecordComponent} from './pop-up-record/pop-up-record.component';
import {ProviderContactsModule} from '@appComponents/shared/provider-contacts/provider-contacts.module';
import {PqfCardModule} from '@appComponents/shared/pqf-card/pqf-card.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ManageBackOrderDetailsRoutingModule,
    TranslateModule,
    TabsModule,
    SearchModule,
    VirtualScrollerModule,
    DateFormatModule,
    RadioButtonModule,
    DropDownListModule,
    PopUpGenericModule,
    GenericTextAreaModule,
    DateRangeModule,
    DatePickerModule,
    LoadingModule,
    ProviderContactsModule,
    PqfCardModule,
  ],
  exports: [ManageBackOrderDetailsComponent],
  declarations: [ManageBackOrderDetailsComponent, PopUpBackOrderComponent, PopUpRecordComponent],
})
export class ManageBackOrderDetailsModule {}
