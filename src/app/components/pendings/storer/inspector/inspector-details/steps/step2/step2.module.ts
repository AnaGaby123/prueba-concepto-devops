import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Step2Component} from '@appComponents/pendings/storer/inspector/inspector-details/steps/step2/step2.component';
import {Step2RoutingModule} from '@appComponents/pendings/storer/inspector/inspector-details/steps/step2/step2-routing.module';
import {TranslateModule} from '@ngx-translate/core';
import {DropDownListModule} from '@appComponents/shared/drop-down-list/drop-down-list.module';
import {GenericInputModule} from '@appComponents/shared/generic-input/generic-input.module';
import {PopUpGenericModule} from '@appComponents/shared/pop-up-generic/pop-up-generic.module';
import {TabsModule} from '@appComponents/shared/tabs/tabs.module';
import {EditBatchComponent} from './edit-batch/edit-batch.component';
import {CheckBoxModule} from '@appComponents/shared/check-box/check-box.module';
import {GenericInputFileModule} from '@appComponents/shared/generic-input-file/generic-input-file.module';
import {NonShippablePartComponent} from './non-shippable-part/non-shippable-part.component';
import {GenericTextAreaModule} from '@appComponents/shared/generic-text-area/generic-text-area.module';

@NgModule({
  declarations: [Step2Component, EditBatchComponent, NonShippablePartComponent],
  imports: [
    CommonModule,
    Step2RoutingModule,
    TranslateModule,
    DropDownListModule,
    GenericInputModule,
    PopUpGenericModule,
    TabsModule,
    CheckBoxModule,
    GenericInputFileModule,
    GenericTextAreaModule,
  ],
  exports: [Step2Component],
})
export class Step2Module {}
