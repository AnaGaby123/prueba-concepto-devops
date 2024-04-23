import {NgModule} from '@angular/core';
import {PreprocessOrderDetailComponent} from '@appComponents/pre-processing/preprocess-order-detail/preprocess-order-detail.component';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {PreprocessOrderDetailRoutingModule} from '@appComponents/pre-processing/preprocess-order-detail/preprocess-order-detail-routing.module';
import {PurchaseOrderListComponent} from './purchase-order-list/purchase-order-list.component';
import {TranslateModule} from '@ngx-translate/core';
import {FilterMenuModule} from '@appComponents/shared/filter-menu/filter-menu.module';
import {HamburgerMenuModule} from '@appComponents/shared/hamburger-menu/hamburger-menu.module';
import {SearchModule} from '@appComponents/shared/search/search.module';
import {DateFormatModule} from '@appPipes/date-format.module';
import {DropdownButtonModule} from '@appComponents/shared/dropdown-button/dropdown-button.module';
import {RequestPreprocessComponent} from './request-preprocess/request-preprocess.component';
import {TextFormatModule} from '@appPipes/text-format/text-format.module';
import {DraggableModalModule} from '@appComponents/shared/draggable-modal/draggable-modal.module';
import {UploadViewFileModule} from '@appComponents/shared/upload-view-file/upload-view-file.module';
import {VirtualScrollerModule} from '@iharbeck/ngx-virtual-scroller';
import {WithoutResultsModule} from '@appComponents/shared/without-results/without-results.module';
import {LoadingModule} from '@appComponents/shared/loading/loading.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PreprocessOrderDetailRoutingModule,
    TranslateModule,
    FilterMenuModule,
    HamburgerMenuModule,
    SearchModule,
    DateFormatModule,
    DropdownButtonModule,
    TextFormatModule,
    DraggableModalModule,
    UploadViewFileModule,
    VirtualScrollerModule,
    WithoutResultsModule,
    LoadingModule,
  ],
  exports: [PreprocessOrderDetailComponent],
  declarations: [
    PreprocessOrderDetailComponent,
    PurchaseOrderListComponent,
    RequestPreprocessComponent,
  ],
})
export class PreprocessOrderDetailModule {}
