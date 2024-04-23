import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GuideClientRoutingModule} from '@appComponents/pendings/guide-client/guide-client/guide-client-routing.module';
import {GuideClientComponent} from '@appComponents/pendings/guide-client/guide-client/guide-client.component';
import {HeaderBarModule} from '@appComponents/shared/header-bar/header-bar.module';
import {TranslateModule} from '@ngx-translate/core';
import {Action, StoreModule} from '@ngrx/store';
import {PendingNodesKeys, PENDINGS_FEATURE_KEY} from '@appUtil/common.protocols';
import {getReducers} from '@appModels/store/pendings/pendings.models';

@NgModule({
  imports: [
    CommonModule,
    GuideClientRoutingModule,
    HeaderBarModule,
    TranslateModule,
    StoreModule.forFeature(PENDINGS_FEATURE_KEY, (state, action: Action) =>
      getReducers(state, action, PendingNodesKeys.guideClient),
    ),
  ],
  exports: [GuideClientComponent],
  declarations: [GuideClientComponent],
})
export class GuideClientModule {}
