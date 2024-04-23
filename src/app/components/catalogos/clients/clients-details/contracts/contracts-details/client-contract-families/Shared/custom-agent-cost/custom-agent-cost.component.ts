import {Component, Input} from '@angular/core';
import {IConfContratoCliente} from '@appModels/store/forms/clients-form/clients-details-form/contracts/contracts-form.models';

@Component({
  selector: 'app-custom-agent-cost',
  templateUrl: './custom-agent-cost.component.html',
  styleUrls: ['./custom-agent-cost.component.scss'],
})
export class CustomAgentCostComponent {
  @Input() actualConfiguration: IConfContratoCliente;
  @Input() editMode: boolean;
  @Input() enableEdit: boolean;
  @Input() viewType: string;

  constructor() {}
}
