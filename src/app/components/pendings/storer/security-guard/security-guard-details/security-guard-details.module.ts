import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SecurityGuardDetailsComponent} from './security-guard-details.component';
import {SecurityGuardDetailsRoutingModule} from '@appComponents/pendings/storer/security-guard/security-guard-details/security-guard-details-routing.module';
import {TabsModule} from '@appComponents/shared/tabs/tabs.module';
import {SearchModule} from '@appComponents/shared/search/search.module';
import {BarActivitiesModule} from '@appComponents/shared/bar-activities/bar-activities.module';
import {DropDownListModule} from '@appComponents/shared/drop-down-list/drop-down-list.module';
import {GenericInputModule} from '@appComponents/shared/generic-input/generic-input.module';
import {RadioButtonModule} from '@appComponents/shared/radio-button/radio-button.module';
import {VirtualScrollerModule} from '@iharbeck/ngx-virtual-scroller';
import {WithoutResultsModule} from '@appComponents/shared/without-results/without-results.module';
import {LoadingModule} from '@appComponents/shared/loading/loading.module';
import {LoadAndCarouselImagesModule} from '@appComponents/shared/load-and-carousel-images/load-and-carousel-images.module';
import {PopUpGenericModule} from '@appComponents/shared/pop-up-generic/pop-up-generic.module';
import {GenericTextAreaModule} from '@appComponents/shared/generic-text-area/generic-text-area.module';
import {DateFormatModule} from '@appPipes/date-format.module';
import {AgentsListComponent} from './agents-list/agents-list.component';
import {SecurityGuardRegisterComponent} from './security-guard-register/security-guard-register.component';
import {SecurityGuardWaybillsComponent} from './security-guard-waybills/security-guard-waybills.component';
import {ImageProfileComponent} from './image-profile/image-profile.component';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [
    SecurityGuardDetailsComponent,
    AgentsListComponent,
    SecurityGuardRegisterComponent,
    SecurityGuardWaybillsComponent,
    ImageProfileComponent,
  ],
  imports: [
    CommonModule,
    SecurityGuardDetailsRoutingModule,
    TabsModule,
    SearchModule,
    BarActivitiesModule,
    DropDownListModule,
    GenericInputModule,
    RadioButtonModule,
    VirtualScrollerModule,
    WithoutResultsModule,
    LoadingModule,
    LoadAndCarouselImagesModule,
    PopUpGenericModule,
    GenericTextAreaModule,
    DateFormatModule,
    TranslateModule,
  ],
})
export class SecurityGuardDetailsModule {}
