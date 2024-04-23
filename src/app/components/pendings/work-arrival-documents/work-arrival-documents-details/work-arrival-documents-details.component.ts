import {Component} from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';

// Actions
import {workArrivalDocumentsDetailsActions} from '@appActions/pendings/work-arrival-documents';

// Selectors
import {workArrivalDocumentsDetailsSelectors} from '@appSelectors/pendings/work-arrival-documents';

// Utils
import {debounce, isEmpty} from 'lodash-es';
import {DEFAULT_TIME_DEBOUNCE_SEARCH} from '@appUtil/common.protocols';

@Component({
  selector: 'app-work-arrival-documents-details',
  templateUrl: './work-arrival-documents-details.component.html',
  styleUrls: ['./work-arrival-documents-details.component.scss'],
})
export class WorkArrivalDocumentsDetailsComponent {
  searchTerm$: Observable<string> = this.store.select(
    workArrivalDocumentsDetailsSelectors.selectSearchTerm,
  );
  productsStatus$: Observable<number> = this.store.select(
    workArrivalDocumentsDetailsSelectors.selectProductsStatus,
  );
  handleSearchTerm = debounce(this.setSearchTerm, DEFAULT_TIME_DEBOUNCE_SEARCH);
  lodashIsEmpty = isEmpty;
  products = [
    {
      Index: 1,
      catalog: '1631500',
      product: 'Nombre del producto, puede ser largo hasta dos renglones',
      oc: '112321-9130',
      internalOrder: '112321-9130',
      date: '2021-03-01T00:00:00.000Z',
      inspector: 'Inspector',
      date2: '2021-03-01T00:00:00.000Z',
      dre: '11',
      type: 'Estándares',
      lot: 'R087U0',
    },
    {
      Index: 2,
      catalog: '1631500',
      product: 'Nombre del producto, puede ser largo hasta dos renglones',
      oc: '112321-9130',
      internalOrder: '112321-9130',
      date: '2021-03-01T00:00:00.000Z',
      inspector: 'Inspector',
      date2: '2021-03-01T00:00:00.000Z',
      dre: '11',
      type: 'Estándares',
      lot: 'R087U0',
    },
  ];
  selectedProduct = {
    Index: 1,
    catalog: '1631500',
    product: 'Nombre del producto, puede ser largo hasta dos renglones',
    oc: '112321-9130',
    internalOrder: '112321-9130',
    date: '2021-03-01T00:00:00.000Z',
    inspector: 'Inspector',
    date2: '2021-03-01T00:00:00.000Z',
    dre: '11',
    type: 'Estándares',
    lot: 'R087U0',
  };

  constructor(private store: Store<AppState>) {}

  setSearchTerm(searchTerm: string): void {
    this.store.dispatch(
      workArrivalDocumentsDetailsActions.SET_SEARCH_TERM({
        searchTerm,
      }),
    );
  }

  setSelectedProduct(selectedProduct: any): void {
    this.store.dispatch(
      workArrivalDocumentsDetailsActions.SET_SELECTED_PRODUCT({
        productId: selectedProduct.id,
      }),
    );
  }
}
