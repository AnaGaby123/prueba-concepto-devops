/* Core Imports */
import {Component, Input} from '@angular/core';
import {ColumnResearchResponse} from '@appModels/table/internal-sales-item';

@Component({
  selector: 'app-research-response-item',
  templateUrl: './research-response-item.component.html',
  styleUrls: ['./research-response-item.component.scss'],
})
export class ResearchResponseItemComponent {
  @Input() columnResearchResponse: ColumnResearchResponse;
}
