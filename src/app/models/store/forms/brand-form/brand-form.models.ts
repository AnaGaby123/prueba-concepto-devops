import {
  IBrandFormList,
  initialBrandFormListState,
} from '@appModels/store/forms/brand-form/brand-form-list/brand-form-list.models';
import {
  IBrandsDetailsForm,
  initialIBrandsDetailsForm,
} from '@appModels/store/forms/brand-form/brand-form-details/brand-form-details.models';

export const TITLE_BRAND_FORM = 'CATÁLOGO DE MARCAS';
export const TITLE_BRAND_ADD_FORM = 'AGREGAR MARCA';
export const TITLE_BRAND_SEE_FORM = 'VER MARCA';

export interface IBrandFormState {
  allowToDetails: boolean;
  isInDetails: boolean;
  title: string;
  brandFormList: IBrandFormList;
  brandFormDetails: IBrandsDetailsForm;
  popAlert: popAlert;
}

export const initialBrandFormState = (): IBrandFormState => ({
  title: TITLE_BRAND_FORM,
  allowToDetails: false,
  isInDetails: false,
  brandFormDetails: initialIBrandsDetailsForm(),
  brandFormList: initialBrandFormListState(),
  popAlert: {
    type: '',
    message: '',
    isOpen: false,
  },
});

export interface popAlert {
  type: string;
  message: string;
  isOpen: boolean;
}
