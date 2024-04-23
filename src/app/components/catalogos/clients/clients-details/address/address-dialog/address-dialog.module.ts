import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AddressDialogComponent} from './address-dialog.component';
import {CheckBoxModule} from '@appComponents/shared/check-box/check-box.module';
import {DropDownListModule} from '@appComponents/shared/drop-down-list/drop-down-list.module';
import {GenericInputModule} from '@appComponents/shared/generic-input/generic-input.module';
import {PopUpGenericModule} from '@appComponents/shared/pop-up-generic/pop-up-generic.module';
import {SearchModule} from '@appComponents/shared/search/search.module';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [AddressDialogComponent],
  imports: [
    CommonModule,
    CheckBoxModule,
    DropDownListModule,
    GenericInputModule,
    PopUpGenericModule,
    SearchModule,
    TranslateModule,
  ],
})
export class AddressDialogModule {}
