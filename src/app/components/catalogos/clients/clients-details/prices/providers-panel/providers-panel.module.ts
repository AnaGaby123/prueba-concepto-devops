import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProvidersPanelComponent} from './providers-panel.component';
import {SearchModule} from '@appComponents/shared/search/search.module';
import {VirtualScrollerModule} from '@iharbeck/ngx-virtual-scroller';
import {LoadingModule} from '@appComponents/shared/loading/loading.module';
import {WithoutResultsModule} from '@appComponents/shared/without-results/without-results.module';
import {TranslateModule} from '@ngx-translate/core';
import {ProvidersPanelItemModule} from '@appComponents/catalogos/clients/clients-details/prices/providers-panel/providers-panel-item/providers-panel-item.module';

@NgModule({
  declarations: [ProvidersPanelComponent],
  imports: [
    CommonModule,
    SearchModule,
    VirtualScrollerModule,
    LoadingModule,
    WithoutResultsModule,
    TranslateModule,
    ProvidersPanelItemModule,
  ],
  exports: [ProvidersPanelComponent],
})
export class ProvidersPanelModule {}
