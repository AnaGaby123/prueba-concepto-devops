/* Core Imports */
import {Component, Input} from '@angular/core';
import {ColumnNumberItem} from '@appModels/table/internal-sales-item';

@Component({
  selector: 'app-number-item',
  templateUrl: './number-item.component.html',
  styleUrls: ['./number-item.component.scss'],
})
export class NumberItemComponent {
  @Input() columnNumberItem: ColumnNumberItem;
}
