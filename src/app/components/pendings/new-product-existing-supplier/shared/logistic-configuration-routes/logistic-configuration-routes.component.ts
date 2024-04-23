import {Component, Input} from '@angular/core';
import {DeliveryRoutes} from '@appModels/store/forms/providers/providers-details/provider-form-step-8-offer.model';
import {InputValidators} from '@appHelpers/shared/shared.helpers';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {deburr, find, isEmpty, toLower} from 'lodash-es';
import {logisticConfigurationDetailsActions} from '@appActions/pendings/new-product-existing-supplier/logistic-configuration';
import {Observable} from 'rxjs';
import {logisticConfigurationDetailsSelectors} from '@appSelectors/pendings/new-product-existing-supplier/logistic-configuration';
import {IOfferDeliveryRoutes} from '@appModels/store/pendings/new-product-existing-supplier/logistic-configuration/logistic-configuration.model';

@Component({
  selector: 'app-logistic-configuration-routes',
  templateUrl: './logistic-configuration-routes.component.html',
  styleUrls: ['./logistic-configuration-routes.component.scss'],
})
export class LogisticConfigurationRoutesComponent {
  @Input() deliveryRoutes: Array<IOfferDeliveryRoutes>;
  @Input() enableEdit: boolean;
  readonly inputValidators = InputValidators;

  isMexican$: Observable<boolean> = this.store.select(
    logisticConfigurationDetailsSelectors.selectProviderIsMexican,
  );

  routes = DeliveryRoutes;
  lodashIsEmpty = isEmpty;

  constructor(private store: Store<AppState>) {}

  selectRoute(routeName: string): void {
    const deliveryRouteId = this.getRouteId(routeName);
    this.store.dispatch(
      logisticConfigurationDetailsActions.SET_SELECTED_DELIVERY_ROUTE({deliveryRouteId}),
    );
  }

  getRoute(routeName: string): IOfferDeliveryRoutes {
    const route: IOfferDeliveryRoutes = find(
      this.deliveryRoutes,
      (o: IOfferDeliveryRoutes) =>
        toLower(deburr(o?.catRutaEntrega?.RutaEntrega)) === deburr(toLower(routeName)),
    );
    return route;
  }

  getRouteName(routeName: string): string {
    const route: IOfferDeliveryRoutes = this.getRoute(routeName);
    return route?.catRutaEntrega?.RutaEntrega || 'N/D';
  }

  getRouteId(routeName: string): string {
    const route: IOfferDeliveryRoutes = this.getRoute(routeName);
    return route?.catRutaEntrega?.IdCatRutaEntrega || 'N/D';
  }

  getRouteIsSelected(routeName: string): boolean {
    const route: IOfferDeliveryRoutes = this.getRoute(routeName);
    if (!isEmpty(route)) {
      return route.isSelected;
    }
    return false;
  }
}
