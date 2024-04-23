import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AttendInvestigationDetailsRoutingModule} from './attend-investigation-details-routing.module';
import {TabsModule} from '@appComponents/shared/tabs/tabs.module';
import {HamburgerMenuModule} from '@appComponents/shared/hamburger-menu/hamburger-menu.module';
import {SearchModule} from '@appComponents/shared/search/search.module';
import {VirtualScrollerModule} from '@iharbeck/ngx-virtual-scroller';
import {TranslateModule} from '@ngx-translate/core';
import {CheckBoxModule} from '@appComponents/shared/check-box/check-box.module';
import {DropDownListModule} from '@appComponents/shared/drop-down-list/drop-down-list.module';
import {WithoutResultsModule} from '@appComponents/shared/without-results/without-results.module';
import {RadioButtonModule} from '@appComponents/shared/radio-button/radio-button.module';
import {GenericTextAreaModule} from '@appComponents/shared/generic-text-area/generic-text-area.module';
import {PopUpSendEmailModule} from '@appComponents/shared/pop-up-send-email/pop-up-send-email.module';
import {DateFormatModule} from '@appPipes/date-format.module';
import {GenericInputModule} from '@appComponents/shared/generic-input/generic-input.module';
import {DatePickerModule} from '@appComponents/shared/date-picker/date-picker.module';
import {GenericInputFileModule} from '@appComponents/shared/generic-input-file/generic-input-file.module';
import {AttendInvestigationDetailsListProductsEffects} from '@appEffects/pendings/attend-investigation/attend-investigation-details/attend-investigation-details-list-products.effects';
import {EffectsModule} from '@ngrx/effects';
import {AttendInvestigationDetailsAddProductEffects} from '@appEffects/pendings/attend-investigation/attend-investigation-details/attend-investigation-details-add-product.effects';
import {AttendInvestigationDetailsComponent} from '@appComponents/pendings/new-product-existing-supplier/attend-investigation/attend-investigation-details/attend-investigation-details.component';
import {AttendInvestigationDetailsEffects} from '@appEffects/pendings/attend-investigation/attend-investigation-details/attend-investigation-details.effects';

@NgModule({
  declarations: [AttendInvestigationDetailsComponent],
  imports: [
    CommonModule,
    AttendInvestigationDetailsRoutingModule,
    TabsModule,
    CheckBoxModule,
    HamburgerMenuModule,
    SearchModule,
    TranslateModule,
    VirtualScrollerModule,
    RadioButtonModule,
    GenericTextAreaModule,
    DateFormatModule,
    DropDownListModule,
    WithoutResultsModule,
    PopUpSendEmailModule,
    GenericInputModule,
    DatePickerModule,
    GenericInputFileModule,
    EffectsModule.forFeature([
      AttendInvestigationDetailsAddProductEffects,
      AttendInvestigationDetailsListProductsEffects,
      AttendInvestigationDetailsEffects,
    ]),
  ],
  exports: [AttendInvestigationDetailsComponent],
})
export class AttendInvestigationDetailsModule {}
