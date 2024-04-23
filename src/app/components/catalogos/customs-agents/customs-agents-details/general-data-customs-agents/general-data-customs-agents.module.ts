import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GeneralDataCustomsAgentsComponent} from '@appComponents/catalogos/customs-agents/customs-agents-details/general-data-customs-agents/general-data-customs-agents.component';
import {CheckBoxModule} from '@appComponents/shared/check-box/check-box.module';
import {TranslateModule} from '@ngx-translate/core';
import {GenericInputModule} from '@appComponents/shared/generic-input/generic-input.module';
import {ContactItemModule} from '@appComponents/shared/contact-item/contact-item.module';
import {VirtualScrollerModule} from '@iharbeck/ngx-virtual-scroller';
import {PopUpGenericModule} from '@appComponents/shared/pop-up-generic/pop-up-generic.module';
import {DateFormatModule} from '@appPipes/date-format.module';
import {DropDownListModule} from '@appComponents/shared/drop-down-list/drop-down-list.module';
import {NewContactDialogModule} from '@appComponents/catalogos/customs-agents/customs-agents-details/general-data-customs-agents/new-contact-dialog/new-contact-dialog.module';

@NgModule({
  declarations: [GeneralDataCustomsAgentsComponent],
  imports: [
    CommonModule,
    CheckBoxModule,
    TranslateModule,
    GenericInputModule,
    ContactItemModule,
    VirtualScrollerModule,
    PopUpGenericModule,
    DateFormatModule,
    DropDownListModule,
    NewContactDialogModule,
  ],
  exports: [GeneralDataCustomsAgentsComponent],
})
export class GeneralDataCustomsAgentsModule {}
