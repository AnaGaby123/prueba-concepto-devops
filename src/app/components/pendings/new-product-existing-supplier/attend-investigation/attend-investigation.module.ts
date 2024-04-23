import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AttendInvestigationRoutingModule} from './attend-investigation-routing.module';
import {HeaderBarModule} from '@appComponents/shared/header-bar/header-bar.module';
import {TranslateModule} from '@ngx-translate/core';
import {AttendInvestigationComponent} from '@appComponents/pendings/new-product-existing-supplier/attend-investigation/attend-investigation.component';
import {Action, StoreModule} from '@ngrx/store';
import {PendingNodesKeys, PENDINGS_FEATURE_KEY} from '@appUtil/common.protocols';
import {getReducers} from '@appModels/store/pendings/pendings.models';

@NgModule({
  declarations: [AttendInvestigationComponent],
  imports: [
    CommonModule,
    AttendInvestigationRoutingModule,
    HeaderBarModule,
    TranslateModule,
    StoreModule.forFeature(PENDINGS_FEATURE_KEY, (state, action: Action) =>
      getReducers(state, action, PendingNodesKeys.attendInvestigation),
    ),
  ],
  exports: [AttendInvestigationComponent],
})
export class AttendInvestigationModule {}
