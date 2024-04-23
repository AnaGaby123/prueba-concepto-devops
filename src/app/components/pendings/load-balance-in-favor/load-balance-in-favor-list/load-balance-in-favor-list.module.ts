/* Core Imports */
import {NgModule} from '@angular/core';

/* Components Imports */
import {LoadBalanceInFavorListComponent} from '@appComponents/pendings/load-balance-in-favor/load-balance-in-favor-list/load-balance-in-favor-list.component';

/* Module Imports */
import {CommonModule} from '@angular/common';
import {LoadBalanceInFavorListRoutingModule} from '@appComponents/pendings/load-balance-in-favor/load-balance-in-favor-list/load-balance-in-favor-list-routing.module';
import {TranslateModule} from '@ngx-translate/core';
import {TabsModule} from '@appComponents/shared/tabs/tabs.module';
import {HamburgerMenuModule} from '@appComponents/shared/hamburger-menu/hamburger-menu.module';
import {DropDownListModule} from '@appComponents/shared/drop-down-list/drop-down-list.module';
import {SearchModule} from '@appComponents/shared/search/search.module';
import {VirtualScrollerModule} from '@iharbeck/ngx-virtual-scroller';

@NgModule({
  imports: [
    CommonModule,
    LoadBalanceInFavorListRoutingModule,
    TranslateModule,
    TabsModule,
    HamburgerMenuModule,
    DropDownListModule,
    SearchModule,
    VirtualScrollerModule,
  ],
  exports: [LoadBalanceInFavorListComponent],
  declarations: [LoadBalanceInFavorListComponent],
})
export class LoadBalanceInFavorListModule {}
