/* Core Imports */
import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {IPageInfo} from '@iharbeck/ngx-virtual-scroller';

//  Selectors
import {providerListSelectors} from '@appSelectors/forms/providers';

// Actions
// Models
import {AppState} from '@appCore/core.state';
import {VProveedor} from 'api-catalogos';
import {ProvidersFormFilter} from '@appModels/store/forms/providers/providers-list/providers-form-filter';
import {IItemCatalogData} from '@appModels/item-card-catalog/item-card-catalog';

/* Dev Tools */
import {isEmpty} from 'lodash-es';
import {providersListActions} from '@appActions/forms/providers';
import {IVProveedor} from '@appModels/store/forms/providers/providers-list/providers-list.models';

@Component({
  selector: 'app-list-providers',
  templateUrl: './list-providers.component.html',
  styleUrls: ['./list-providers.component.scss'],
})
export class ListProvidersComponent implements OnInit {
  filters$: Observable<Array<ProvidersFormFilter>> = this.store.select(
    providerListSelectors.selectFiltersProviders,
  );
  providers$: Observable<Array<IVProveedor>> = this.store.select(
    providerListSelectors.selectProviders,
  );
  providersRequestStatus$: Observable<number> = this.store.select(
    providerListSelectors.selectProvidersStatus,
  );
  totalProviders$: Observable<number> = this.store.select(
    providerListSelectors.selectTotalProviders,
  );

  scrollItems: Array<IVProveedor> = [];
  lodashIsEmpty = isEmpty;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(providersListActions.ON_INIT_COMPONENT_EFFECT());
  }

  fetchMore(event: IPageInfo): void {
    this.store.dispatch(providersListActions.FETCH_MORE_COMPONENT_EFFECT({event}));
  }

  navigateToAddEditProviders(edit: boolean, provider: VProveedor): void {
    this.store.dispatch(providersListActions.NAVIGATE_TO_ADD_OR_EDIT({provider, edit}));
  }

  buildItem(provider: IVProveedor): IItemCatalogData {
    return {
      title: provider.Nombre || 'N/D',
      subtitle: `Rol: ${provider.Rol || 'N/D'}`,
      active: provider.Activo,
      image: provider.image,
      imageHover: provider.imageHover,
    };
  }
}
