import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GenerateRoutingModule} from '@appComponents/pendings/purchasing-manager/process-purchase/process-purchase-details/details/generate/generate-routing.module';
import {GenerateComponent} from '@appComponents/pendings/purchasing-manager/process-purchase/process-purchase-details/details/generate/generate.component';
import {TabsModule} from '@appComponents/shared/tabs/tabs.module';
import {HamburgerMenuModule} from '@appComponents/shared/hamburger-menu/hamburger-menu.module';
import {SearchModule} from '@appComponents/shared/search/search.module';
import {DropDownListModule} from '@appComponents/shared/drop-down-list/drop-down-list.module';
import {TranslateModule} from '@ngx-translate/core';
import {VirtualScrollerModule} from '@iharbeck/ngx-virtual-scroller';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {WithoutResultsModule} from '@appComponents/shared/without-results/without-results.module';
import {CustomPositionPopUpModule} from '@appComponents/shared/custom-position-pop-up/custom-position-pop-up.module';
import {PopUpGenericModule} from '@appComponents/shared/pop-up-generic/pop-up-generic.module';
import {AlertSuccesModule} from '@appComponents/shared/alert-succes/alert-succes.module';
import {PopUpSendEmailModule} from '@appComponents/shared/pop-up-send-email/pop-up-send-email.module';
import {LoadingModule} from '@appComponents/shared/loading/loading.module';
import {ProviderContactsModule} from '@appComponents/shared/provider-contacts/provider-contacts.module';
import {PqfCardModule} from '@appComponents/shared/pqf-card/pqf-card.module';

@NgModule({
  declarations: [GenerateComponent],
  imports: [
    CommonModule,
    GenerateRoutingModule,
    TabsModule,
    HamburgerMenuModule,
    SearchModule,
    DropDownListModule,
    TranslateModule,
    VirtualScrollerModule,
    DragDropModule,
    WithoutResultsModule,
    CustomPositionPopUpModule,
    PopUpGenericModule,
    AlertSuccesModule,
    PopUpSendEmailModule,
    LoadingModule,
    ProviderContactsModule,
    PqfCardModule,
  ],
  exports: [GenerateComponent],
})
export class GenerateModule {}
