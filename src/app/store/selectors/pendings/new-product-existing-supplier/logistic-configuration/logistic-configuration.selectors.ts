import {createSelector} from '@ngrx/store';
import {selectNewProductExistingSupplier} from '@appSelectors/pendings/pendings.selectors';
import {NewProductExistingSupplierState} from '@appModels/store/pendings/new-product-existing-supplier/new-product-existing-supplier.models';
import {ILogisticConfigurationDetailsState} from '@appModels/store/pendings/new-product-existing-supplier/logistic-configuration/logistic-configuration.model';

export const selectLogisticConfiguration = createSelector(
  selectNewProductExistingSupplier,
  (state: NewProductExistingSupplierState): ILogisticConfigurationDetailsState =>
    state.logisticConfiguration,
);
