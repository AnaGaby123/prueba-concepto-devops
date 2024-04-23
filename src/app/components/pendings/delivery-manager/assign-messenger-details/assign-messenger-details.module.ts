import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AssignMessengerDetailsComponent} from '@appComponents/pendings/delivery-manager/assign-messenger-details/assign-messenger-details.component';
import {AssignMessengerDetailsRoutingModule} from '@appComponents/pendings/delivery-manager/assign-messenger-details/assign-messenger-details-routing.module';
import {PopUpGenericModule} from '@appComponents/shared/pop-up-generic/pop-up-generic.module';
import {TranslateModule} from '@ngx-translate/core';
import {VirtualScrollerModule} from '@iharbeck/ngx-virtual-scroller';
import {DragDropModule} from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [AssignMessengerDetailsComponent],
  imports: [
    CommonModule,
    AssignMessengerDetailsRoutingModule,
    PopUpGenericModule,
    TranslateModule,
    VirtualScrollerModule,
    DragDropModule,
  ],
  exports: [AssignMessengerDetailsComponent],
})
export class AssignMessengerDetailsModule {}
