import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AvailabilityLettersDialogComponent} from '@appComponents/shared/availability-letters-dialog/availability-letters-dialog.component';
import {PopUpGenericModule} from '@appComponents/shared/pop-up-generic/pop-up-generic.module';
import {TranslateModule} from '@ngx-translate/core';
import {DropDownListModule} from '@appComponents/shared/drop-down-list/drop-down-list.module';
import {LoadingModule} from '@appComponents/shared/loading/loading.module';

@NgModule({
  declarations: [AvailabilityLettersDialogComponent],
  imports: [CommonModule, PopUpGenericModule, TranslateModule, DropDownListModule, LoadingModule],
  exports: [AvailabilityLettersDialogComponent],
})
export class AvailabilityLettersDialogModule {}
