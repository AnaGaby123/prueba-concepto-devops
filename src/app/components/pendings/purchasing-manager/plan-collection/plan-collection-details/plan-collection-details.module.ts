import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CheckBoxModule} from '@appComponents/shared/check-box/check-box.module';
import {CustomPositionPopUpModule} from '@appComponents/shared/custom-position-pop-up/custom-position-pop-up.module';
import {DatePickerModule} from '@appComponents/shared/date-picker/date-picker.module';
import {DropDownListModule} from '@appComponents/shared/drop-down-list/drop-down-list.module';
import {GenericInputModule} from '@appComponents/shared/generic-input/generic-input.module';
import {GenericTextAreaModule} from '@appComponents/shared/generic-text-area/generic-text-area.module';
import {LoadingModule} from '@appComponents/shared/loading/loading.module';
import {PlanCollectionContactModule} from '@purchasing-manager/plan-collection/plan-collection-contact/plan-collection-contact.module';
import {PlanCollectionDetailsComponent} from './plan-collection-details.component';
import {PlanCollectionDetailsRoutingModule} from '@purchasing-manager/plan-collection/plan-collection-details/plan-collection-details-routing.module';
import {PopUpGenericModule} from '@appComponents/shared/pop-up-generic/pop-up-generic.module';
import {ProgressBarModule} from '@appComponents/shared/progress-bar/progress-bar.module';
import {ProviderContactsModule} from '@appComponents/shared/provider-contacts/provider-contacts.module';
import {SearchModule} from '@appComponents/shared/search/search.module';
import {TabsModule} from '@appComponents/shared/tabs/tabs.module';
import {TranslateModule} from '@ngx-translate/core';
import {VirtualScrollerModule} from '@iharbeck/ngx-virtual-scroller';
import {WithoutResultsModule} from '@appComponents/shared/without-results/without-results.module';

@NgModule({
  imports: [
    CommonModule,
    CheckBoxModule,
    CustomPositionPopUpModule,
    DatePickerModule,
    DropDownListModule,
    GenericInputModule,
    GenericTextAreaModule,
    LoadingModule,
    PlanCollectionContactModule,
    PlanCollectionDetailsRoutingModule,
    PopUpGenericModule,
    ProgressBarModule,
    ProviderContactsModule,
    SearchModule,
    TabsModule,
    TranslateModule,
    VirtualScrollerModule,
    WithoutResultsModule,
  ],
  exports: [PlanCollectionDetailsComponent],
  declarations: [PlanCollectionDetailsComponent],
})
export class PlanCollectionDetailsModule {}
