import {Component, Input} from '@angular/core';
import {InputValidators} from '@appHelpers/shared/shared.helpers';
import {Observable} from 'rxjs';
import {OfferFields} from '@appModels/store/forms/providers/providers-details/provider-form-step-8-offer.model';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {logisticConfigurationDetailsSelectors} from '@appSelectors/pendings/new-product-existing-supplier/logistic-configuration';
import {logisticConfigurationDetailsActions} from '@appActions/pendings/new-product-existing-supplier/logistic-configuration';
import {
  IOfferDeliveryRoutes,
  totalsDaysTimeLogistic,
} from '@appModels/store/pendings/new-product-existing-supplier/logistic-configuration/logistic-configuration.model';

@Component({
  selector: 'app-logistic-configuration-routes-details',
  templateUrl: './logistic-configuration-routes-times.component.html',
  styleUrls: ['./logistic-configuration-routes-times.component.scss'],
})
export class LogisticConfigurationRoutesTimesComponent {
  @Input() isMexican: boolean;
  route$: Observable<IOfferDeliveryRoutes> = this.store.select(
    logisticConfigurationDetailsSelectors.selectLogisticConfigurationDeliveryRouteSelected,
  );
  sumLogisticTimes$: Observable<totalsDaysTimeLogistic> = this.store.select(
    logisticConfigurationDetailsSelectors.selectSumLogisticsTime,
  );

  readonly fields = OfferFields;
  readonly inputValidators = InputValidators;

  constructor(private store: Store<AppState>) {}

  handleLogisticTimeChange(value: string, field: string): void {
    this.store.dispatch(
      logisticConfigurationDetailsActions.SET_DELIVERY_ROUTE_DELIVERY_TIME_CONFIGURATION_VALUE({
        field,
        value: value === '' ? null : Number(value),
      }),
    );
  }
}
