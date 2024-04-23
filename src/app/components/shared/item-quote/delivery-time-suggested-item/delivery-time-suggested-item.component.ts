/* Core Imports */
import {Component, Input} from '@angular/core';
import {ColumnDeliveryTimeSuggested} from '@appModels/table/internal-sales-item';

@Component({
  selector: 'app-delivery-time-suggested-item',
  templateUrl: './delivery-time-suggested-item.component.html',
  styleUrls: ['./delivery-time-suggested-item.component.scss'],
})
export class DeliveryTimeSuggestedItemComponent {
  @Input() columnDeliveryTimeSuggested: ColumnDeliveryTimeSuggested;
}
