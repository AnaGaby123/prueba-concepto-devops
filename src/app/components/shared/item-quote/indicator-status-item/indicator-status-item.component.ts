/* Core Imports */
import {Component, Input} from '@angular/core';
import {ColumnOptions} from '@appModels/table/internal-sales-item';

@Component({
  selector: 'app-indicator-item',
  templateUrl: './indicator-status-item.component.html',
  styleUrls: ['./indicator-status-item.component.scss'],
})
export class IndicatorStatusItemComponent {
  @Input() columnOptions: ColumnOptions;
}
