import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AddressComponent} from '@appComponents/catalogos/clients/clients-details/address/address.component';
import {AddressRoutingModule} from './address-routing.module';
import {SearchModule} from '@appComponents/shared/search/search.module';
import {TranslateModule} from '@ngx-translate/core';
import {WithoutResultsModule} from '@appComponents/shared/without-results/without-results.module';
import {CheckBoxModule} from '@appComponents/shared/check-box/check-box.module';
import {GenericInputModule} from '@appComponents/shared/generic-input/generic-input.module';
import {PopUpGenericModule} from '@appComponents/shared/pop-up-generic/pop-up-generic.module';
import {DropDownListModule} from '@appComponents/shared/drop-down-list/drop-down-list.module';
import {AddScheduleModule} from '@appComponents/catalogos/clients/clients-details/address/add-schedule/add-schedule.module';
import {MapModule} from '@appComponents/shared/map/map.module';
import {AddressClientsFormMethodsEffects} from '@appEffects/forms/client-form/clients-details-form/address/address-clients-form-methods.effects';
import {EffectsModule} from '@ngrx/effects';
import {AddressClientsFormEffects} from '@appEffects/forms/client-form/clients-details-form/address/address-clients-form.effects';
import {PqfCheckBoxModule} from '@appComponents/shared/pqf-check-box/pqf-check-box.module';
import {DeliveryAddressesDialogModule} from '@appComponents/catalogos/clients/clients-details/address/delivery-addresses-dialog/delivery-addresses-dialog.module';

@NgModule({
  declarations: [AddressComponent],
  imports: [
    CommonModule,
    AddressRoutingModule,
    SearchModule,
    TranslateModule,
    WithoutResultsModule,
    CheckBoxModule,
    GenericInputModule,
    PopUpGenericModule,
    DropDownListModule,
    AddScheduleModule,
    MapModule,
    EffectsModule.forFeature([AddressClientsFormMethodsEffects, AddressClientsFormEffects]),
    PqfCheckBoxModule,
    DeliveryAddressesDialogModule,
  ],
  exports: [AddressComponent],
})
export class AddressModule {}
