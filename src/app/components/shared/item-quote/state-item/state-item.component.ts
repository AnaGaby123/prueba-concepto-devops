/* Core Imports */
import {Component, Input} from '@angular/core';
import {ColumnState} from '@appModels/table/internal-sales-item';

@Component({
  selector: 'app-state-item',
  templateUrl: './state-item.component.html',
  styleUrls: ['./state-item.component.scss'],
})
export class StateItemComponent {
  @Input() columnState: ColumnState;
}
