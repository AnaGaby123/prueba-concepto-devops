import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WorkArrivalDocumentsDetailsComponent} from './work-arrival-documents-details.component';
import {WorkArrivalDocumentsDetailsRoutingModule} from '@appComponents/pendings/work-arrival-documents/work-arrival-documents-details/work-arrival-documents-details-routing.module';
import {TranslateModule} from '@ngx-translate/core';
import {SearchModule} from '@appComponents/shared/search/search.module';
import {VirtualScrollerModule} from '@iharbeck/ngx-virtual-scroller';
import {DateFormatModule} from '@appPipes/date-format.module';
import {WithoutResultsModule} from '@appComponents/shared/without-results/without-results.module';
import {LoadingModule} from '@appComponents/shared/loading/loading.module';
import {GenericInputFileModule} from '@appComponents/shared/generic-input-file/generic-input-file.module';
import {UploadViewFileModule} from '@appComponents/shared/upload-view-file/upload-view-file.module';

@NgModule({
  declarations: [WorkArrivalDocumentsDetailsComponent],
  imports: [
    CommonModule,
    WorkArrivalDocumentsDetailsRoutingModule,
    TranslateModule,
    SearchModule,
    VirtualScrollerModule,
    DateFormatModule,
    WithoutResultsModule,
    LoadingModule,
    GenericInputFileModule,
    UploadViewFileModule,
  ],
  exports: [WorkArrivalDocumentsDetailsComponent],
})
export class WorkArrivalDocumentsDetailsModule {}
