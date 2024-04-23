import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {DeclareArrivalGuideRoutingModule} from '@appComponents/pendings/material-receiver/declare-arrival-guide/declare-arrival-guide-routing.module';
import {DeclareArrivalGuideComponent} from '@appComponents/pendings/material-receiver/declare-arrival-guide/declare-arrival-guide.component';
import {HeaderBarModule} from '@appComponents/shared/header-bar/header-bar.module';
import {Action, StoreModule} from '@ngrx/store';
import {PendingNodesKeys, PENDINGS_FEATURE_KEY} from '@appUtil/common.protocols';
import {getReducers} from '@appModels/store/pendings/pendings.models';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DeclareArrivalGuideRoutingModule,
    HeaderBarModule,
    StoreModule.forFeature(PENDINGS_FEATURE_KEY, (state, action: Action) =>
      getReducers(state, action, PendingNodesKeys.materialReceiver),
    ),
  ],
  exports: [DeclareArrivalGuideComponent],
  declarations: [DeclareArrivalGuideComponent],
})
export class DeclareArrivalGuideModule {}
