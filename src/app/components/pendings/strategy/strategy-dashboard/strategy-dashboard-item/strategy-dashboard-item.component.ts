import {Component, Input} from '@angular/core';
import {IStrategyByClient} from '@appModels/store/pendings/strategy/strategy-dashboard/strategy-dashboard.model';

@Component({
  selector: 'app-strategy-dashboard-item',
  templateUrl: './strategy-dashboard-item.component.html',
  styleUrls: ['./strategy-dashboard-item.component.scss'],
})
export class StrategyDashboardItemComponent {
  @Input() strategy: IStrategyByClient;
}
