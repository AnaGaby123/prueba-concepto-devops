/* Core Imports */
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

/* Module imports */
import {BarcodeRoutingModule} from '@purchasing-manager/register-arrival/register-arrival-details/barcode/barcode-routing.module';

/* Components Imports */
import {BarcodeComponent} from '@purchasing-manager/register-arrival/register-arrival-details/barcode/barcode.component';
import {TranslateModule} from '@ngx-translate/core';
import {HamburgerMenuModule} from '@appComponents/shared/hamburger-menu/hamburger-menu.module';
import {SearchModule} from '@appComponents/shared/search/search.module';
import {VirtualScrollerModule} from '@iharbeck/ngx-virtual-scroller';
import {LoadingModule} from '@appComponents/shared/loading/loading.module';
import {WithoutResultsModule} from '@appComponents/shared/without-results/without-results.module';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [BarcodeComponent],
  imports: [
    CommonModule,
    BarcodeRoutingModule,
    TranslateModule,
    HamburgerMenuModule,
    SearchModule,
    VirtualScrollerModule,
    LoadingModule,
    WithoutResultsModule,
    FormsModule,
  ],
  exports: [BarcodeComponent],
})
export class BarcodeModule {}
