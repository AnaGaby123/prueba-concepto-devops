import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ControlMaterialDeliveryDetailsComponent} from '@appComponents/pendings/imports-phs/control-material-delivery/control-material-delivery-details/control-material-delivery-details.component';
import {ControlMaterialDeliveryDetailsRoutingModule} from '@appComponents/pendings/imports-phs/control-material-delivery/control-material-delivery-details/control-material-delivery-details-routing.module';
import {HamburgerMenuModule} from '@appComponents/shared/hamburger-menu/hamburger-menu.module';
import {SearchModule} from '@appComponents/shared/search/search.module';
import {GenericInputModule} from '@appComponents/shared/generic-input/generic-input.module';
import {UploadViewFileModule} from '@appComponents/shared/upload-view-file/upload-view-file.module';
import {TranslateModule} from '@ngx-translate/core';
import {VirtualScrollerModule} from '@iharbeck/ngx-virtual-scroller';
import {DateFormatModule} from '@appPipes/date-format.module';
import {LoadingModule} from '@appComponents/shared/loading/loading.module';
import {WithoutResultsModule} from '@appComponents/shared/without-results/without-results.module';
import {AlertModule} from '@appComponents/shared/alert/alert.module';
import {PopUpGenericModule} from '@appComponents/shared/pop-up-generic/pop-up-generic.module';

@NgModule({
  declarations: [ControlMaterialDeliveryDetailsComponent],
  imports: [
    CommonModule,
    ControlMaterialDeliveryDetailsRoutingModule,
    HamburgerMenuModule,
    SearchModule,
    GenericInputModule,
    UploadViewFileModule,
    TranslateModule,
    VirtualScrollerModule,
    DateFormatModule,
    LoadingModule,
    WithoutResultsModule,
    AlertModule,
    PopUpGenericModule,
  ],
})
export class ControlMaterialDeliveryDetailsModule {}
