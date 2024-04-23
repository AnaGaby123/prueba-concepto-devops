import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RegulatoryResearchDetailsComponent} from '@appComponents/pendings/new-product-existing-supplier/regulatory-research/regulatory-research-details/regulatory-research-details.component';
import {RegulatoryResearchDetailsRoutingModule} from '@appComponents/pendings/new-product-existing-supplier/regulatory-research/regulatory-research-details/regulatory-research-details-routing.module';
import {PqfTabOptionsModule} from '@appComponents/shared/pqf-tab-options/pqf-tab-options.module';
import {PqfDashboardFiltersModule} from '@appComponents/shared/pqf-dashboard-filters/pqf-dashboard-filters.module';
import {TranslateModule} from '@ngx-translate/core';
import {VirtualScrollerModule} from '@iharbeck/ngx-virtual-scroller';
import {PqfDropDownListModule} from '@appComponents/shared/pqf-drop-down-list/pqf-drop-down-list.module';
import {ProductInfoComponent} from './product-info/product-info.component';
import {PqfSearchModule} from '@appComponents/shared/pqf-search/pqf-search.module';
import {PqfFilterOptionsModule} from '@appComponents/shared/pqf-filter-options/pqf-filter-options.module';
import {PqfGenericPopUpFilesModule} from '@appComponents/shared/pqf-generic-pop-up-files/pqf-generic-pop-up-files.module';
import {DateFormatModule} from '@appPipes/date-format.module';
import {DropDownListModule} from '@appComponents/shared/drop-down-list/drop-down-list.module';
import {PqfDatePickerModule} from '@appComponents/shared/generic-date-picker/pqf-date-picker.module';
import {PqfGenericInputModule} from '@appComponents/shared/pqf-generic-input/pqf-generic-input.module';
import {PqfRadioButtonModule} from '@appComponents/shared/pqf-radio-button/pqf-radio-button.module';
import {EffectsModule} from '@ngrx/effects';
import {RegulatoryResearchDetailsMethodsEffects} from '@appEffects/pendings/new-product-existing-supplier/regulatory-research/regulatory-research-details/regulatory-research-details-methods.effects';

@NgModule({
  declarations: [RegulatoryResearchDetailsComponent, ProductInfoComponent],
  imports: [
    CommonModule,
    RegulatoryResearchDetailsRoutingModule,
    PqfTabOptionsModule,
    PqfDashboardFiltersModule,
    TranslateModule,
    VirtualScrollerModule,
    PqfDropDownListModule,
    PqfSearchModule,
    PqfFilterOptionsModule,
    PqfGenericPopUpFilesModule,
    DateFormatModule,
    DropDownListModule,
    PqfDatePickerModule,
    PqfGenericInputModule,
    PqfRadioButtonModule,
    EffectsModule.forFeature([RegulatoryResearchDetailsMethodsEffects]),
  ],
  exports: [RegulatoryResearchDetailsComponent],
})
export class RegulatoryResearchDetailsModule {}
