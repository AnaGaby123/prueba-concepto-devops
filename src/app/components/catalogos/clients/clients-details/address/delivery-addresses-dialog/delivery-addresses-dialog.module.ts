import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DeliveryAddressesDialogComponent} from './delivery-addresses-dialog.component';
import {PopUpGenericModule} from '@appComponents/shared/pop-up-generic/pop-up-generic.module';
import {TranslateModule} from '@ngx-translate/core';
import {DropDownListModule} from '@appComponents/shared/drop-down-list/drop-down-list.module';
import {SearchModule} from '@appComponents/shared/search/search.module';
import {CheckBoxModule} from '@appComponents/shared/check-box/check-box.module';
import {GenericInputModule} from '@appComponents/shared/generic-input/generic-input.module';

@NgModule({
  declarations: [DeliveryAddressesDialogComponent],
  imports: [
    CommonModule,
    PopUpGenericModule,
    TranslateModule,
    DropDownListModule,
    SearchModule,
    CheckBoxModule,
    GenericInputModule,
  ],
})
export class DeliveryAddressesDialogModule {}
