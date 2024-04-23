import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PqfDashboardFiltersComponent} from '@appComponents/shared/pqf-dashboard-filters/pqf-dashboard-filters.component';
import {PqfSearchModule} from '@appComponents/shared/pqf-search/pqf-search.module';
import {PqfFilterOptionsModule} from '@appComponents/shared/pqf-filter-options/pqf-filter-options.module';

@NgModule({
  declarations: [PqfDashboardFiltersComponent],
  imports: [CommonModule, PqfSearchModule, PqfFilterOptionsModule],
  exports: [PqfDashboardFiltersComponent],
})
export class PqfDashboardFiltersModule {}
