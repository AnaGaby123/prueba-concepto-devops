import {NgModule} from '@angular/core';
import {ClientInfoSideBarComponent} from '@appComponents/quotation/quotation-details/client-info-side-bar/client-info-side-bar.component';
import {TranslateModule} from '@ngx-translate/core';
import {CommonModule} from '@angular/common';
import {DropDownListModule} from '@appComponents/shared/drop-down-list/drop-down-list.module';
import {CheckBoxModule} from '@appComponents/shared/check-box/check-box.module';
import {PqfSearchModule} from '@appComponents/shared/pqf-search/pqf-search.module';
import {LinkNewContactModule} from '@appComponents/quotation/quotation-details/client-info-side-bar/link-new-contact/link-new-contact.module';

@NgModule({
  declarations: [ClientInfoSideBarComponent],
  imports: [
    TranslateModule,
    CommonModule,
    DropDownListModule,
    CheckBoxModule,
    PqfSearchModule,
    LinkNewContactModule,
  ],
  exports: [ClientInfoSideBarComponent],
})
export class ClientInfoSideBarModule {}
