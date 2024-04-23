import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AddScheduleComponent} from '@appComponents/catalogos/clients/clients-details/address/add-schedule/add-schedule.component';
import {PopUpGenericModule} from '@appComponents/shared/pop-up-generic/pop-up-generic.module';
import {TranslateModule} from '@ngx-translate/core';
import {CheckBoxModule} from '@appComponents/shared/check-box/check-box.module';
import {DropDownListModule} from '@appComponents/shared/drop-down-list/drop-down-list.module';
import {DropListModule} from '@appComponents/shared/drop-list/drop-list.module';

@NgModule({
  declarations: [AddScheduleComponent],
  imports: [
    CommonModule,
    PopUpGenericModule,
    TranslateModule,
    CheckBoxModule,
    DropDownListModule,
    DropListModule,
  ],
  exports: [AddScheduleComponent],
})
export class AddScheduleModule {}
