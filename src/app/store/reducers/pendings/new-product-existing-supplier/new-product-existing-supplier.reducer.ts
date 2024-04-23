import {ActionReducer, combineReducers} from '@ngrx/store';
import {
  initialNewProductExistingSupplierState,
  NewProductExistingSupplierState,
} from '@appModels/store/pendings/new-product-existing-supplier/new-product-existing-supplier.models';
import {regulatoryResearchReducer} from '@appReducers/pendings/new-product-existing-supplier/regulatory-research/regulatory-research.reducer';
import {logisticConfigurationDetailsReducer} from '@appReducers/pendings/new-product-existing-supplier/logistic-configuration/logistic-configuration.reducer';
import {purchasingConfigurationDetailsReducer} from '@appReducers/pendings/new-product-existing-supplier/purchasing-configuration/purchasing-configuration-details.reducer';
import {salesConfigurationDetailsReducer} from '@appReducers/pendings/new-product-existing-supplier/sales-configuration/sales-configuration-details.reducer';

export const newProductExistingSupplierReducer: ActionReducer<NewProductExistingSupplierState> = combineReducers(
  {
    regulatoryResearch: regulatoryResearchReducer,
    purchasingConfiguration: purchasingConfigurationDetailsReducer,
    salesConfiguration: salesConfigurationDetailsReducer,
    logisticConfiguration: logisticConfigurationDetailsReducer,
  },
  {
    ...initialNewProductExistingSupplierState(),
  },
);
