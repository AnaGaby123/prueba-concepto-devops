import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AddCampaingComponent} from '@appComponents/catalogos/providers/providers-details/sections/campaing/add-campaing/add-campaing.component';
import {TranslateModule} from '@ngx-translate/core';
import {GenericInputModule} from '@appComponents/shared/generic-input/generic-input.module';
import {DatePickerModule} from '@appComponents/shared/date-picker/date-picker.module';
import {SearchModule} from '@appComponents/shared/search/search.module';
import {VirtualScrollerModule} from '@iharbeck/ngx-virtual-scroller';
import {LoadingModule} from '@appComponents/shared/loading/loading.module';
import {WithoutResultsModule} from '@appComponents/shared/without-results/without-results.module';
import {DropDownListModule} from '@appComponents/shared/drop-down-list/drop-down-list.module';
import {RadioButtonModule} from '@appComponents/shared/radio-button/radio-button.module';
import {GenericTextAreaModule} from '@appComponents/shared/generic-text-area/generic-text-area.module';

@NgModule({
  declarations: [AddCampaingComponent],
  exports: [AddCampaingComponent],
  imports: [
    CommonModule,
    TranslateModule,
    GenericInputModule,
    DatePickerModule,
    SearchModule,
    VirtualScrollerModule,
    LoadingModule,
    WithoutResultsModule,
    DropDownListModule,
    RadioButtonModule,
    GenericTextAreaModule,
  ],
})
export class AddCampaingModule {}
