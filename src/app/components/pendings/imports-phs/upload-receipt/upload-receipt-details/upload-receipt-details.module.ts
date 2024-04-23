/* Core Imports */
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

/* Routing Imports */
import {UploadReceiptDetailsRoutingModule} from '@appComponents/pendings/imports-phs/upload-receipt/upload-receipt-details/upload-receipt-details-routing.module';

/* Components Imports */
import {UploadReceiptDetailsComponent} from '@appComponents/pendings/imports-phs/upload-receipt/upload-receipt-details/upload-receipt-details.component';

/* Module Imports */
import {TranslateModule} from '@ngx-translate/core';
import {HamburgerMenuModule} from '@appComponents/shared/hamburger-menu/hamburger-menu.module';
import {SearchModule} from '@appComponents/shared/search/search.module';
import {VirtualScrollerModule} from '@iharbeck/ngx-virtual-scroller';
import {LoadingModule} from '@appComponents/shared/loading/loading.module';
import {WithoutResultsModule} from '@appComponents/shared/without-results/without-results.module';
import {DateFormatModule} from '@appPipes/date-format.module';
import {UploadViewFileModule} from '@appComponents/shared/upload-view-file/upload-view-file.module';

@NgModule({
  imports: [
    CommonModule,
    UploadReceiptDetailsRoutingModule,
    TranslateModule,
    HamburgerMenuModule,
    SearchModule,
    VirtualScrollerModule,
    LoadingModule,
    WithoutResultsModule,
    DateFormatModule,
    UploadViewFileModule,
  ],
  exports: [UploadReceiptDetailsComponent],
  declarations: [UploadReceiptDetailsComponent],
})
export class UploadReceiptDetailsModule {}
