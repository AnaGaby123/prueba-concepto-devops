/* Core Imports */
import {NgModule} from '@angular/core';

/* Common Imports */
import {CommonModule} from '@angular/common';

/* Component Imports */
import {ExecuteCollectionDetailsComponent} from '@appComponents/pendings/charges/execute-collection/execute-collection-details/execute-collection-details.component';

/* Routing Imports */
import {ExecuteCollectionDetailsRoutingModule} from '@appComponents/pendings/charges/execute-collection/execute-collection-details/execute-collection-details-routing.module';
import {TranslateModule} from '@ngx-translate/core';
import {HamburgerMenuModule} from '@appComponents/shared/hamburger-menu/hamburger-menu.module';
import {SearchModule} from '@appComponents/shared/search/search.module';
import {VirtualScrollerModule} from '@iharbeck/ngx-virtual-scroller';
import {LoadingModule} from '@appComponents/shared/loading/loading.module';
import {WithoutResultsModule} from '@appComponents/shared/without-results/without-results.module';
import {DateFormatModule} from '@appPipes/date-format.module';
import {TextFormatModule} from '@appPipes/text-format/text-format.module';
import {UploadViewFileModule} from '@appComponents/shared/upload-view-file/upload-view-file.module';
import {PqfDraggableModalModule} from '@appComponents/shared/pqf-draggable-modal/pqf-draggable-modal.module';

@NgModule({
  declarations: [ExecuteCollectionDetailsComponent],
  imports: [
    CommonModule,
    ExecuteCollectionDetailsRoutingModule,
    TranslateModule,
    HamburgerMenuModule,
    SearchModule,
    VirtualScrollerModule,
    LoadingModule,
    WithoutResultsModule,
    DateFormatModule,
    TextFormatModule,
    UploadViewFileModule,
    PqfDraggableModalModule,
  ],
  exports: [ExecuteCollectionDetailsComponent],
})
export class ExecuteCollectionDetailsModule {}
