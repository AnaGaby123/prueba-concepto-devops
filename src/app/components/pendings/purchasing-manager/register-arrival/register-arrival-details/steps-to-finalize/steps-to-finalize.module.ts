/* Core Imports */
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

/* Module imports */
import {StepsToFinalizeRoutingModule} from '@purchasing-manager/register-arrival/register-arrival-details/steps-to-finalize/steps-to-finalize-routing.module';
import {VirtualScrollerModule} from '@iharbeck/ngx-virtual-scroller';
import {GenericInputModule} from '@appComponents/shared/generic-input/generic-input.module';
import {PopUpGenericModule} from '@appComponents/shared/pop-up-generic/pop-up-generic.module';
import {LoadAndCarouselImagesModule} from '@appComponents/shared/load-and-carousel-images/load-and-carousel-images.module';
import {TranslateModule} from '@ngx-translate/core';
import {BarActivitiesModule} from '@appComponents/shared/bar-activities/bar-activities.module';

/* Components Imports */
import {StepsToFinalizeComponent} from '@purchasing-manager/register-arrival/register-arrival-details/steps-to-finalize/steps-to-finalize.component';
import {OpenPackageComponent} from './open-package/open-package.component';
import {PiecesArrivedComponent} from './pieces-arrived/pieces-arrived.component';
import {FingerprintScanComponent} from './fingerprint-scan/fingerprint-scan.component';
import {LoadingModule} from '@appComponents/shared/loading/loading.module';
import {WithoutResultsModule} from '@appComponents/shared/without-results/without-results.module';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    StepsToFinalizeComponent,
    OpenPackageComponent,
    PiecesArrivedComponent,
    FingerprintScanComponent,
  ],
  imports: [
    CommonModule,
    StepsToFinalizeRoutingModule,
    TranslateModule,
    BarActivitiesModule,
    VirtualScrollerModule,
    GenericInputModule,
    PopUpGenericModule,
    LoadAndCarouselImagesModule,
    LoadingModule,
    WithoutResultsModule,
    FormsModule,
  ],
  exports: [StepsToFinalizeComponent],
})
export class StepsToFinalizeModule {}
