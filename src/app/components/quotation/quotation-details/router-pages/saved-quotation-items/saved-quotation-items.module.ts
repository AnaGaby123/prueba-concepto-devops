import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SavedQuotationItemsRoutingModule} from '@appComponents/quotation/quotation-details/router-pages/saved-quotation-items/saved-quotation-items-routing.module';
import {SavedQuotationItemsComponent} from '@appComponents/quotation/quotation-details/router-pages/saved-quotation-items/saved-quotation-items.component';
import {PopUpGenericModule} from '@appComponents/shared/pop-up-generic/pop-up-generic.module';
import {TranslateModule} from '@ngx-translate/core';
import {TabsModule} from '@appComponents/shared/tabs/tabs.module';
import {ToggleSwitchModule} from '@appComponents/shared/toggle-switch/toggle-switch.module';
import {SearchModule} from '@appComponents/shared/search/search.module';
import {VirtualScrollerModule} from '@iharbeck/ngx-virtual-scroller';
import {WithoutResultsModule} from '@appComponents/shared/without-results/without-results.module';
import {DateFormatModule} from '@appPipes/date-format.module';
import {DropDownListModule} from '@appComponents/shared/drop-down-list/drop-down-list.module';
import {BarActivitiesModule} from '@appComponents/shared/bar-activities/bar-activities.module';
import {GenericTextAreaModule} from '@appComponents/shared/generic-text-area/generic-text-area.module';
import {CheckBoxModule} from '@appComponents/shared/check-box/check-box.module';
import {RadioButtonModule} from '@appComponents/shared/radio-button/radio-button.module';
import {FormsModule} from '@angular/forms';
import {FreightConfiguratorModule} from '@appComponents/quotation/quotation-details/router-pages/saved-quotation-items/freight-configurator/freight-configurator.module';
import {PqfToggleSwitchModule} from '@appComponents/shared/pqf-toggle-switch/pqf-toggle-switch.module';
import {PopItemsProductsModule} from '@appComponents/quotation/quotation-details/router-pages/main-page/pop-items-products/pop-items-products.module';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {CustomPositionPopUpModule} from '@appComponents/shared/custom-position-pop-up/custom-position-pop-up.module';
import {AddRealizationDatesPopUpModule} from '@appComponents/quotation/quotation-details/router-pages/main-page/products-items/item-training/add-realization-dates-pop-up/add-realization-dates-pop-up.module';
import {GenericInputFileModule} from '@appComponents/shared/generic-input-file/generic-input-file.module';
import {ItemSavedListModule} from '@appComponents/quotation/quotation-details/router-pages/saved-quotation-items/item-saved-list/item-saved-list.module';
import {ItemInvestigationListModule} from '@appComponents/quotation/quotation-details/router-pages/saved-quotation-items/item-investigation-list/item-investigation-list.module';
import {InvestigationDetailsModule} from '@appComponents/quotation/quotation-details/router-pages/shared/investigation-details/investigation-details.module';
import {SendEmailDialogModule} from '@appComponents/shared/send-email-dialog/send-email-dialog.module';
import {PreviewQuotationModule} from '@appComponents/quotation/quotation-details/router-pages/saved-quotation-items/preview-quotation/preview-quotation.module';

@NgModule({
  imports: [
    CommonModule,
    SavedQuotationItemsRoutingModule,
    PopUpGenericModule,
    TranslateModule,
    TabsModule,
    ToggleSwitchModule,
    SearchModule,
    VirtualScrollerModule,
    WithoutResultsModule,
    DateFormatModule,
    DropDownListModule,
    BarActivitiesModule,
    GenericTextAreaModule,
    CheckBoxModule,
    RadioButtonModule,
    FormsModule,
    FreightConfiguratorModule,
    PreviewQuotationModule,
    PqfToggleSwitchModule,
    PopItemsProductsModule,
    DragDropModule,
    CustomPositionPopUpModule,
    AddRealizationDatesPopUpModule,
    GenericInputFileModule,
    ItemSavedListModule,
    ItemInvestigationListModule,
    InvestigationDetailsModule,
    SendEmailDialogModule,
  ],
  exports: [SavedQuotationItemsComponent],
  declarations: [SavedQuotationItemsComponent],
})
export class SavedQuotationItemsModule {}
