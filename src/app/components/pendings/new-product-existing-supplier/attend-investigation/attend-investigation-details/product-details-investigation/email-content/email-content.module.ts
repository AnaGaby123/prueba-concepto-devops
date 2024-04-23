import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EmailContentComponent} from '@appComponents/pendings/new-product-existing-supplier/attend-investigation/attend-investigation-details/product-details-investigation/email-content/email-content.component';
import {GenericTextAreaModule} from '@appComponents/shared/generic-text-area/generic-text-area.module';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [EmailContentComponent],
  imports: [CommonModule, GenericTextAreaModule, TranslateModule],
  exports: [EmailContentComponent],
})
export class EmailContentModule {}
