import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReconfigureFreightPopUpComponent} from './reconfigure-freight-pop-up.component';
import {PopUpGenericModule} from '@appComponents/shared/pop-up-generic/pop-up-generic.module';
import {TranslateModule} from '@ngx-translate/core';
import {ClientsContactModule} from '@appComponents/shared/clients-contact/clients-contact.module';
import {VirtualScrollerModule} from '@iharbeck/ngx-virtual-scroller';
import {CheckBoxModule} from '@appComponents/shared/check-box/check-box.module';
import {GenericInputModule} from '@appComponents/shared/generic-input/generic-input.module';
import {WithoutResultsModule} from '@appComponents/shared/without-results/without-results.module';
import {LoadingModule} from '@appComponents/shared/loading/loading.module';
import {PqfToggleSwitchModule} from '@appComponents/shared/pqf-toggle-switch/pqf-toggle-switch.module';
import {InternalSalesItemModule} from '@appComponents/shared/item-quote/internal-sales-item.module';
import {HeaderInternalSalesItemModule} from '@appComponents/shared/header-internal-sales-item/header-internal-sales-item.module';
import {DatePickerModule} from '@appComponents/shared/date-picker/date-picker.module';

@NgModule({
  declarations: [ReconfigureFreightPopUpComponent],
  imports: [
    CommonModule,
    PopUpGenericModule,
    TranslateModule,
    ClientsContactModule,
    VirtualScrollerModule,
    CheckBoxModule,
    GenericInputModule,
    WithoutResultsModule,
    LoadingModule,
    PqfToggleSwitchModule,
    InternalSalesItemModule,
    HeaderInternalSalesItemModule,
    DatePickerModule,
  ],
  exports: [ReconfigureFreightPopUpComponent],
})
export class ReconfigureFreightPopUpModule {}
