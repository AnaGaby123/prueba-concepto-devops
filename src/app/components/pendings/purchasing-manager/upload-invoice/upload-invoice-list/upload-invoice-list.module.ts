import {NgModule} from '@angular/core';
import {UploadInvoiceListComponent} from '@appComponents/pendings/purchasing-manager/upload-invoice/upload-invoice-list/upload-invoice-list.component';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {UploadInvoiceListRoutingModule} from '@appComponents/pendings/purchasing-manager/upload-invoice/upload-invoice-list/upload-invoice-list-routing.module';
import {TranslateModule} from '@ngx-translate/core';
import {HamburgerMenuModule} from '@appComponents/shared/hamburger-menu/hamburger-menu.module';
import {SearchModule} from '@appComponents/shared/search/search.module';
import {VirtualScrollerModule} from '@iharbeck/ngx-virtual-scroller';
import {DoughnutChartModule} from '@appComponents/shared/doughnut-chart/doughnut-chart.module';
import {WithoutResultsModule} from '@appComponents/shared/without-results/without-results.module';
import {LoadingModule} from '@appComponents/shared/loading/loading.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    UploadInvoiceListRoutingModule,
    TranslateModule,
    HamburgerMenuModule,
    SearchModule,
    VirtualScrollerModule,
    DoughnutChartModule,
    WithoutResultsModule,
    LoadingModule,
  ],
  exports: [UploadInvoiceListComponent],
  declarations: [UploadInvoiceListComponent],
})
export class UploadInvoiceListModule {}
