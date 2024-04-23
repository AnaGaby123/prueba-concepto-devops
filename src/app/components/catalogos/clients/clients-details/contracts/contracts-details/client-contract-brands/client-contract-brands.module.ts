import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ClientContractBrandsComponent} from '@appComponents/catalogos/clients/clients-details/contracts/contracts-details/client-contract-brands/client-contract-brands.component';
import {TranslateModule} from '@ngx-translate/core';
import {DatePickerModule} from '@appComponents/shared/date-picker/date-picker.module';
import {DropDownListModule} from '@appComponents/shared/drop-down-list/drop-down-list.module';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {SearchModule} from '@appComponents/shared/search/search.module';
import {VirtualScrollerModule} from '@iharbeck/ngx-virtual-scroller';
import {WithoutResultsModule} from '@appComponents/shared/without-results/without-results.module';
import {LoadingModule} from '@appComponents/shared/loading/loading.module';

@NgModule({
  declarations: [ClientContractBrandsComponent],
  imports: [
    CommonModule,
    TranslateModule,
    DatePickerModule,
    DropDownListModule,
    DragDropModule,
    SearchModule,
    VirtualScrollerModule,
    WithoutResultsModule,
    LoadingModule,
  ],
  exports: [ClientContractBrandsComponent],
})
export class ClientContractBrandsModule {}
