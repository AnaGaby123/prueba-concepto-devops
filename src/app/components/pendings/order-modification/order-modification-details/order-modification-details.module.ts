import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OrderModificationDetailsComponent} from './order-modification-details.component';
import {OrderModificationDetailsRoutingModule} from '@appComponents/pendings/order-modification/order-modification-details/order-modification-details-routing.module';
import {HamburgerMenuModule} from '@appComponents/shared/hamburger-menu/hamburger-menu.module';
import {SearchModule} from '@appComponents/shared/search/search.module';
import {TranslateModule} from '@ngx-translate/core';
import {GenericTextAreaModule} from '@appComponents/shared/generic-text-area/generic-text-area.module';
import {DropDownListModule} from '@appComponents/shared/drop-down-list/drop-down-list.module';
import {CustomPositionPopUpModule} from '@appComponents/shared/custom-position-pop-up/custom-position-pop-up.module';
import {WithoutResultsModule} from '@appComponents/shared/without-results/without-results.module';
import {DropListContactModule} from '@appComponents/shared/drop-list-contact/drop-list-contact.module';
import {CheckBoxModule} from '@appComponents/shared/check-box/check-box.module';
import {GenericInputModule} from '@appComponents/shared/generic-input/generic-input.module';
import {VirtualScrollerModule} from '@iharbeck/ngx-virtual-scroller';
import {GenericInputFileModule} from '@appComponents/shared/generic-input-file/generic-input-file.module';
import {PopUpGenericModule} from '@appComponents/shared/pop-up-generic/pop-up-generic.module';
import {DateFormatModule} from '@appPipes/date-format.module';
import {BarActivitiesModule} from '@appComponents/shared/bar-activities/bar-activities.module';
import {RadioButtonModule} from '@appComponents/shared/radio-button/radio-button.module';
import {LoadingModule} from '@appComponents/shared/loading/loading.module';
import {TextFormatModule} from '@appPipes/text-format/text-format.module';
import {UploadViewFileModule} from '@appComponents/shared/upload-view-file/upload-view-file.module';
import {PopUpAlertModule} from '@appComponents/shared/pop-up-alert/pop-up-alert.module';
import {FreightConfiguratorModule} from '@appComponents/quotation/quotation-details/router-pages/saved-quotation-items/freight-configurator/freight-configurator.module';
import {PqfCardModule} from '@appComponents/shared/pqf-card/pqf-card.module';
import {FreightConfiguratorComponent} from '@appComponents/pendings/order-modification/order-modification-details/freight-configurator/freight-configurator.component';
import {PqfDraggableModalModule} from '@appComponents/shared/pqf-draggable-modal/pqf-draggable-modal.module';

@NgModule({
  declarations: [OrderModificationDetailsComponent, FreightConfiguratorComponent],
  imports: [
    CommonModule,
    OrderModificationDetailsRoutingModule,
    HamburgerMenuModule,
    SearchModule,
    TranslateModule,
    GenericTextAreaModule,
    DropDownListModule,
    CustomPositionPopUpModule,
    WithoutResultsModule,
    DropListContactModule,
    CheckBoxModule,
    GenericInputModule,
    VirtualScrollerModule,
    GenericInputFileModule,
    PopUpGenericModule,
    DateFormatModule,
    BarActivitiesModule,
    RadioButtonModule,
    LoadingModule,
    TextFormatModule,
    UploadViewFileModule,
    PopUpAlertModule,
    FreightConfiguratorModule,
    PqfCardModule,
    PqfDraggableModalModule,
  ],
  exports: [OrderModificationDetailsComponent],
})
export class OrderModificationDetailsModule {}
