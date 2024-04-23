import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PendingsComponent} from '@appComponents/pendings/pendings.component';
import {PendingsRoutingModule} from '@appComponents/pendings/pendings-routing.module';
import {HeaderBarModule} from '@appComponents/shared/header-bar/header-bar.module';
import {RouterModule} from '@angular/router';
import {StoreModule} from '@ngrx/store';
import {PENDINGS_FEATURE_KEY} from '@appUtil/common.protocols';

@NgModule({
  declarations: [PendingsComponent],
  imports: [
    PendingsRoutingModule,
    CommonModule,
    HeaderBarModule,
    RouterModule,
    StoreModule.forFeature(PENDINGS_FEATURE_KEY, {}),
  ],
  exports: [PendingsComponent],
})
export class PendingModule {}
