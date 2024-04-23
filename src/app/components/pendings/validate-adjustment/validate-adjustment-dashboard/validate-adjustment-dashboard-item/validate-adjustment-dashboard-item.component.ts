/*Core imports*/
import {Component, Input} from '@angular/core';
import {IValidateAdjustment} from '@appModels/store/pendings/validate-adjustment/validate-adjustment-dashboard/validate-adjustment-dashboard.models';

@Component({
  selector: 'app-validate-adjustment-dashboard-item',
  templateUrl: './validate-adjustment-dashboard-item.component.html',
  styleUrls: ['./validate-adjustment-dashboard-item.component.scss'],
})
export class ValidateAdjustmentDashboardItemComponent {
  @Input() item: IValidateAdjustment;
}
