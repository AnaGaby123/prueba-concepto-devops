import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WorkArrivalDocumentsComponent} from './work-arrival-documents.component';
import {WorkArrivalDocumentsRoutingModule} from '@appComponents/pendings/work-arrival-documents/work-arrival-documents-routing.module';
import {HeaderBarModule} from '@appComponents/shared/header-bar/header-bar.module';
import {TranslateModule} from '@ngx-translate/core';
import {Action, StoreModule} from '@ngrx/store';
import {PendingNodesKeys, PENDINGS_FEATURE_KEY} from '@appUtil/common.protocols';
import {getReducers} from '@appModels/store/pendings/pendings.models';

@NgModule({
  declarations: [WorkArrivalDocumentsComponent],
  imports: [
    CommonModule,
    WorkArrivalDocumentsRoutingModule,
    HeaderBarModule,
    TranslateModule,
    StoreModule.forFeature(PENDINGS_FEATURE_KEY, (state, action: Action) =>
      getReducers(state, action, PendingNodesKeys.workArrivalDocuments),
    ),
  ],
  exports: [WorkArrivalDocumentsComponent],
})
export class WorkArrivalDocumentsModule {}
