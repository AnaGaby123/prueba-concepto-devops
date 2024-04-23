import * as importProductSelectors from '@appSelectors/forms/product-form/product-form.selectors';
import * as importProductListSelectors from '@appSelectors/forms/product-form/product-form-list/product-form-list.selectors';
import * as importProductDetailsSelectors from '@appSelectors/forms/product-form/products-details/product-details-form.selectors';
import * as importProductDetailsTechnicalCommercialInvestigation from '@appSelectors/forms/product-form/products-details/technical-commercial-investigation/technical-commercial-investigation.selectors';
import * as importProductDetailsLogistic from '@appSelectors/forms/product-form/products-details/logistic/logistic.selectors';
import * as importProductDetailsLinked from '@appSelectors/forms/product-form/products-details/link-alternative-complementary/link-alternative-complementary.selectors';
import * as importProductDetailsRegulation from '@appSelectors/forms/product-form/products-details/regulation-restriction-non-tariff/regulation-restriction-non-tariff.selectors';

export const productSelectors = importProductSelectors;
export const productListSelectors = importProductListSelectors;
export const productDetailsSelectors = importProductDetailsSelectors;
export const productTechnicalCommercialInvestigationSelectors = importProductDetailsTechnicalCommercialInvestigation;
export const productLogisticSelectors = importProductDetailsLogistic;
export const productLinkedSelectors = importProductDetailsLinked;
export const productRegulationSelectors = importProductDetailsRegulation;
