import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {UploadReceiptListComponent} from '@appComponents/pendings/imports-phs/upload-receipt/upload-receipt-list/upload-receipt-list.component';
import {UploadReceiptListRoutingModule} from '@appComponents/pendings/imports-phs/upload-receipt/upload-receipt-list/upload-receipt-list-routing.module';
import {HamburgerMenuModule} from '@appComponents/shared/hamburger-menu/hamburger-menu.module';
import {SearchModule} from '@appComponents/shared/search/search.module';
import {TranslateModule} from '@ngx-translate/core';
import {VirtualScrollerModule} from '@iharbeck/ngx-virtual-scroller';
import {DoughnutChartModule} from '@appComponents/shared/doughnut-chart/doughnut-chart.module';
import {WithoutResultsModule} from '@appComponents/shared/without-results/without-results.module';
import {LoadingModule} from '@appComponents/shared/loading/loading.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    UploadReceiptListRoutingModule,
    HamburgerMenuModule,
    SearchModule,
    TranslateModule,
    VirtualScrollerModule,
    DoughnutChartModule,
    WithoutResultsModule,
    LoadingModule,
  ],
  exports: [UploadReceiptListComponent],
  declarations: [UploadReceiptListComponent],
})
export class UploadReceiptListModule {}
