import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AddendaPopUpComponent} from './addenda-pop-up.component';
import {PopUpGenericModule} from '@appComponents/shared/pop-up-generic/pop-up-generic.module';
import {TranslateModule} from '@ngx-translate/core';
import {DropDownListModule} from '@appComponents/shared/drop-down-list/drop-down-list.module';
import {GenericTextAreaModule} from '@appComponents/shared/generic-text-area/generic-text-area.module';

@NgModule({
  declarations: [AddendaPopUpComponent],
  imports: [
    CommonModule,
    PopUpGenericModule,
    TranslateModule,
    DropDownListModule,
    GenericTextAreaModule,
  ],
  exports: [AddendaPopUpComponent],
})
export class AddendaPopUpModule {}
