import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DocumentationComponent} from './documentation.component';
import {DoughnutChartModule} from '@appComponents/shared/doughnut-chart/doughnut-chart.module';
import {TranslateModule} from '@ngx-translate/core';
import {TabsModule} from '@appComponents/shared/tabs/tabs.module';
import {SearchModule} from '@appComponents/shared/search/search.module';
import {VirtualScrollerModule} from '@iharbeck/ngx-virtual-scroller';
import {UploadViewFileModule} from '@appComponents/shared/upload-view-file/upload-view-file.module';
import {LoadingModule} from '@appComponents/shared/loading/loading.module';
import {WithoutResultsModule} from '@appComponents/shared/without-results/without-results.module';
import {PopUpGenericModule} from '@appComponents/shared/pop-up-generic/pop-up-generic.module';

@NgModule({
  declarations: [DocumentationComponent],
  imports: [
    CommonModule,
    DoughnutChartModule,
    TranslateModule,
    TabsModule,
    SearchModule,
    VirtualScrollerModule,
    UploadViewFileModule,
    LoadingModule,
    WithoutResultsModule,
    PopUpGenericModule,
  ],
  exports: [DocumentationComponent],
})
export class DocumentationModule {}
