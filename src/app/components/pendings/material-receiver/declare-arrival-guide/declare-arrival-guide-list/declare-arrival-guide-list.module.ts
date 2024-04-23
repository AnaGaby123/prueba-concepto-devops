import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {DeclareArrivalGuideListComponent} from '@appComponents/pendings/material-receiver/declare-arrival-guide/declare-arrival-guide-list/declare-arrival-guide-list.component';
import {DeclareArrivalGuideListRoutingModule} from '@appComponents/pendings/material-receiver/declare-arrival-guide/declare-arrival-guide-list/declare-arrival-guide-list-routing.module';
import {DoughnutChartModule} from '@appComponents/shared/doughnut-chart/doughnut-chart.module';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DeclareArrivalGuideListRoutingModule,
    DoughnutChartModule,
    TranslateModule,
  ],
  exports: [DeclareArrivalGuideListComponent],
  declarations: [DeclareArrivalGuideListComponent],
})
export class DeclareArrivalGuideListModule {}
