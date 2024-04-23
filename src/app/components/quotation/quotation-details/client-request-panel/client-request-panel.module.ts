import {NgModule} from '@angular/core';
import {ClientRequestPanelComponent} from '@appComponents/quotation/quotation-details/client-request-panel/client-request-panel.component';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {TextFormatModule} from '@appPipes/text-format/text-format.module';
import {LoadingModule} from '@appComponents/shared/loading/loading.module';

@NgModule({
  declarations: [ClientRequestPanelComponent],
  imports: [CommonModule, TranslateModule, TextFormatModule, LoadingModule],
  exports: [ClientRequestPanelComponent],
})
export class ClientRequestPanelModule {}
