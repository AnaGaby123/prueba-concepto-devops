import * as ImportProductFormActions from '@appActions/forms/product-form/product-form.actions';
import * as ImportProductListActions from '@appActions/forms/product-form/product-form-list/product-form-list.actions';
import * as ImportProductFormTechnicalCommercialInvestigation from '@appActions/forms/product-form/product-details-form/technical-commercial-investigation/technical-commercial-investigation-form.actions';
import * as ImportProductLogisticActions from '@appActions/forms/product-form/product-details-form/logistic/logistic-product-form.actions';
import * as ImportProductDetailsFormActions from '@appActions/forms/product-form/product-details-form/product-form-details.actions';
import * as ImportProductLinkedActions from '@appActions/forms/product-form/product-details-form/link-alternative-complementary/link-alternative-complementary-product-form.actions';
import * as ImportProductRegulation from '@appActions/forms/product-form/product-details-form/regulation-restriction-non-tariff/regulation-restriction-non-tariff-form.actions';

export const productFormActions = ImportProductFormActions;
export const productListActions = ImportProductListActions;
export const productDetailsActions = ImportProductDetailsFormActions;
export const technicalCommercialInvestigationActions = ImportProductFormTechnicalCommercialInvestigation;
export const productLogisticActions = ImportProductLogisticActions;
export const productLinkedActions = ImportProductLinkedActions;
export const productRegulationActions = ImportProductRegulation;
