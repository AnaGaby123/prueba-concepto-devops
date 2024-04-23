/* Core Imports */
import {Component, Input} from '@angular/core';
import {
  ColumnAgreedPrice,
  ColumnIva,
  ColumnProFreight,
  ColumnSubtotal,
  ColumnUnitPrice,
} from '@appModels/table/internal-sales-item';

@Component({
  selector: 'app-label-number-item',
  templateUrl: './label-number-item.component.html',
  styleUrls: ['./label-number-item.component.scss'],
})
export class LabelNumberItemComponent {
  @Input() colorLabel: 'red' | 'ocean' | 'green' | 'yellow' | '' = '';
  @Input() column:
    | ColumnUnitPrice
    | ColumnIva
    | ColumnSubtotal
    | ColumnProFreight
    | ColumnAgreedPrice;

  isNumber(value: number | string): boolean {
    return typeof value === 'number' && !isNaN(value);
  }
}
