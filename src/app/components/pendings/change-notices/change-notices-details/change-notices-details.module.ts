import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ChangeNoticesDetailsComponent} from './change-notices-details.component';
import {ChangeNoticesDetailsRoutingModule} from '@appComponents/pendings/change-notices/change-notices-details/change-notices-details-routing.module';
import {TranslateModule} from '@ngx-translate/core';
import {TabsModule} from '@appComponents/shared/tabs/tabs.module';
import {HamburgerMenuModule} from '@appComponents/shared/hamburger-menu/hamburger-menu.module';
import {SearchModule} from '@appComponents/shared/search/search.module';
import {VirtualScrollerModule} from '@iharbeck/ngx-virtual-scroller';
import {GenericTextAreaModule} from '@appComponents/shared/generic-text-area/generic-text-area.module';

@NgModule({
  declarations: [ChangeNoticesDetailsComponent],
  imports: [
    CommonModule,
    ChangeNoticesDetailsRoutingModule,
    TranslateModule,
    TabsModule,
    HamburgerMenuModule,
    SearchModule,
    VirtualScrollerModule,
    GenericTextAreaModule,
  ],
})
export class ChangeNoticesDetailsModule {}
