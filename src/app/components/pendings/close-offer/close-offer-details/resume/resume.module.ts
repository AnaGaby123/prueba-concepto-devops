import {NgModule} from '@angular/core';
import {ResumeComponent} from './resume.component';
import {ResumeRoutingModule} from '@appComponents/pendings/close-offer/close-offer-details/resume/resume-routing.module';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {TabsModule} from '@appComponents/shared/tabs/tabs.module';
import {SearchModule} from '@appComponents/shared/search/search.module';
import {DatePickerModule} from '@appComponents/shared/date-picker/date-picker.module';
import {DropDownListModule} from '@appComponents/shared/drop-down-list/drop-down-list.module';
import {VirtualScrollerModule} from '@iharbeck/ngx-virtual-scroller';
import {CheckBoxModule} from '@appComponents/shared/check-box/check-box.module';
import {BarActivitiesModule} from '@appComponents/shared/bar-activities/bar-activities.module';
import {GenericInputModule} from '@appComponents/shared/generic-input/generic-input.module';
import {LoadingModule} from '@appComponents/shared/loading/loading.module';
import {WithoutResultsModule} from '@appComponents/shared/without-results/without-results.module';
import {DropListFiltersModule} from '@appComponents/shared/drop-list-filters/drop-list-filters.module';
import {CustomPositionPopUpModule} from '@appComponents/shared/custom-position-pop-up/custom-position-pop-up.module';
import {FormsModule} from '@angular/forms';
import {HeaderInternalSalesItemModule} from '@appComponents/shared/header-internal-sales-item/header-internal-sales-item.module';
import {InternalSalesItemModule} from '@appComponents/shared/item-quote/internal-sales-item.module';

@NgModule({
  declarations: [ResumeComponent],
  imports: [
    CommonModule,
    ResumeRoutingModule,
    TranslateModule,
    TabsModule,
    SearchModule,
    DatePickerModule,
    DropDownListModule,
    VirtualScrollerModule,
    CheckBoxModule,
    BarActivitiesModule,
    GenericInputModule,
    LoadingModule,
    WithoutResultsModule,
    DropListFiltersModule,
    CustomPositionPopUpModule,
    FormsModule,
    HeaderInternalSalesItemModule,
    InternalSalesItemModule,
  ],
  exports: [ResumeComponent],
})
export class ResumeModule {}
