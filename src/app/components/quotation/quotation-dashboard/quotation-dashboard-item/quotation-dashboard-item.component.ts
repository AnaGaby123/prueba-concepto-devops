import {Component, Input} from '@angular/core';
import {ClientsListItemForQuotation} from '@appModels/store/quotation/quotation-dashboard/quotation-dashboard.models';
import {getIncomeLevelImage} from '@appHelpers/shared/shared.helpers';

@Component({
  selector: 'app-quotation-dashboard-item',
  templateUrl: './quotation-dashboard-item.component.html',
  styleUrls: ['./quotation-dashboard-item.component.scss'],
})
export class QuotationDashboardItemComponent {
  @Input() item: ClientsListItemForQuotation;
  getCategoryImage(value: string) {
    return `assets/Images/clientes/categorias/${value.toLowerCase()}.svg`;
  }
  getLevel(value: string) {
    return `assets/Images/clientes/niveles-ingreso/${getIncomeLevelImage(value)}.svg`;
  }
}
