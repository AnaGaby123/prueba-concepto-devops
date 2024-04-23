import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ShippingConsoleListComponent} from '@appComponents/pendings/operations-manager/shipping-console/shipping-console-list/shipping-console-list.component';
import {ShippingConsoleListRoutingModule} from '@appComponents/pendings/operations-manager/shipping-console/shipping-console-list/shipping-console-list-routing.module';
import {TranslateModule} from '@ngx-translate/core';
import {TabsModule} from '@appComponents/shared/tabs/tabs.module';
import {HamburgerMenuModule} from '@appComponents/shared/hamburger-menu/hamburger-menu.module';
import {SearchModule} from '@appComponents/shared/search/search.module';
import {VirtualScrollerModule} from '@iharbeck/ngx-virtual-scroller';

@NgModule({
  declarations: [ShippingConsoleListComponent],
  imports: [
    CommonModule,
    ShippingConsoleListRoutingModule,
    TranslateModule,
    TabsModule,
    HamburgerMenuModule,
    SearchModule,
    VirtualScrollerModule,
  ],
  exports: [ShippingConsoleListComponent],
})
export class ShippingConsoleListModule {}
