import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ConceptItemQuoteComponent} from '@appComponents/shared/concept-item-quote/concept-item-quote.component';
import {TranslateModule} from '@ngx-translate/core';
import {DateFormatModule} from '@appPipes/date-format.module';

@NgModule({
  imports: [CommonModule, FormsModule, TranslateModule, DateFormatModule],
  exports: [ConceptItemQuoteComponent],
  declarations: [ConceptItemQuoteComponent],
})
export class ConceptItemQuoteModule {}
