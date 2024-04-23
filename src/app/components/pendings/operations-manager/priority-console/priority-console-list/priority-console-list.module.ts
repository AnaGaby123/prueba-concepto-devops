import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PriorityConsoleListComponent} from '@appComponents/pendings/operations-manager/priority-console/priority-console-list/priority-console-list.component';
import {PriorityConsoleListRoutingModule} from '@appComponents/pendings/operations-manager/priority-console/priority-console-list/priority-console-list-routing.module';
import {TranslateModule} from '@ngx-translate/core';
import {HamburgerMenuModule} from '@appComponents/shared/hamburger-menu/hamburger-menu.module';
import {SearchModule} from '@appComponents/shared/search/search.module';
import {TabsModule} from '@appComponents/shared/tabs/tabs.module';
import {VirtualScrollerModule} from '@iharbeck/ngx-virtual-scroller';

@NgModule({
  declarations: [PriorityConsoleListComponent],
  imports: [
    CommonModule,
    PriorityConsoleListRoutingModule,
    TranslateModule,
    HamburgerMenuModule,
    SearchModule,
    TabsModule,
    VirtualScrollerModule,
  ],
  exports: [PriorityConsoleListComponent],
})
export class PriorityConsoleListModule {}
