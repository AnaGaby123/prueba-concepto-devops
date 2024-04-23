import {Component, Input} from '@angular/core';
import {IConceptItemQuote} from '@appModels/shared-components/concept-item-quote';
import {ProductsTypes, QuotationItemTypes} from '@appHelpers/pending/quotation/quotation.helpers';
import {AVAILABILITY_TYPES} from '@appUtil/common.protocols';

@Component({
  selector: 'app-concept-item-quote',
  templateUrl: './concept-item-quote.component.html',
  styleUrls: ['./concept-item-quote.component.scss'],
})
export class ConceptItemQuoteComponent {
  @Input() item: IConceptItemQuote;

  readonly availabilityTypes = AVAILABILITY_TYPES;
  readonly productsTypes = ProductsTypes;
  readonly typeItem = QuotationItemTypes;
}
