// Dev tools
import {createReducer, on} from '@ngrx/store';
import {filter, forEach, isEmpty, map} from 'lodash-es';
// Actions
import {brandFormDetailsAction, brandFormListAction} from '@appActions/forms/brand-form';
// Models
import {
  CatControlObj,
  CatIndustriaObj,
  CatSectorObj,
  CatSubTipoObj,
  CatTipoObj,
  VMarca,
} from 'api-catalogos';
import {
  IBrandItemConfig,
  IBrandsDetailsForm,
  initialIBrandsDetailsForm,
} from '@appModels/store/forms/brand-form/brand-form-details/brand-form-details.models';

export const detailsBrandsFormReducer = createReducer(
  initialIBrandsDetailsForm(),
  on(
    brandFormListAction.FETCH_FILTERS_LIST_SUCCESS,
    (state: IBrandsDetailsForm, {filtersList}): IBrandsDetailsForm => ({
      ...state,
      filterList: filtersList,
      needsToReloadFiltersList: false,
    }),
  ),
  on(
    brandFormDetailsAction.CHECK_ALL,
    (state: IBrandsDetailsForm, {value}): IBrandsDetailsForm => ({
      ...state,
      filterList: {
        ...state.filterList,
        listaControl: map(
          state.filterList.listaControl,
          (o: CatControlObj): CatControlObj => {
            return {
              ...o,
              Aplica: value,
            };
          },
        ),
        listaIndustria: map(
          state.filterList.listaIndustria,
          (o: CatIndustriaObj): CatIndustriaObj => {
            return {
              ...o,
              Aplica: value,
            };
          },
        ),
        listaSector: map(
          state.filterList.listaSector,
          (o: CatSectorObj): CatSectorObj => {
            return {
              ...o,
              Aplica: value,
            };
          },
        ),
        listaSubtipo: map(
          state.filterList.listaSubtipo,
          (o: CatSubTipoObj): CatSubTipoObj => {
            return {
              ...o,
              Aplica: value,
            };
          },
        ),
        listaTipo: map(
          state.filterList.listaTipo,
          (o: CatTipoObj): CatTipoObj => {
            return {
              ...o,
              Aplica: value,
            };
          },
        ),
      },
    }),
  ),
  on(
    brandFormDetailsAction.HANDLE_FILTER_CHECKED,
    (state: IBrandsDetailsForm, {node, idName, id, value}): IBrandsDetailsForm => {
      let filterList = state.filterList;
      let stop = false;
      forEach(filterList, (value, key) => {
        if (key === node) {
          stop = true;
        }
        if (
          !stop &&
          isEmpty(
            filter(
              value,
              (f: CatControlObj | CatIndustriaObj | CatSectorObj | CatSubTipoObj | CatTipoObj) =>
                f.Aplica,
            ),
          )
        ) {
          filterList = {
            ...filterList,
            [key]: map(filterList[key], (o) => {
              return {...o, Aplica: true};
            }),
          };
        }
      });
      return {
        ...state,
        filterList: {
          ...filterList,
          [node]: map(filterList[node], (o) => {
            if (o[idName] === id) {
              return {
                ...o,
                Aplica: value,
              };
            }
            return o;
          }),
        },
      };
    },
  ),
  on(
    brandFormDetailsAction.SET_SELECTED_BRAND,
    (state: IBrandsDetailsForm, {brand}): IBrandsDetailsForm => ({
      ...state,
      brand,
    }),
  ),
  on(
    brandFormDetailsAction.FETCH_ITEMS_DETAILS_SUCCESS,
    (state: IBrandsDetailsForm, {items}): IBrandsDetailsForm => ({
      ...state,
      items,
    }),
  ),
  on(
    brandFormDetailsAction.HANDLE_CHECK_ITEM,
    (state: IBrandsDetailsForm, {item, value}): IBrandsDetailsForm => ({
      ...state,
      items: map(
        state.items,
        (i: IBrandItemConfig): IBrandItemConfig => {
          if (i === item) {
            return {
              ...i,
              Activo: value,
              original: !i.original,
            };
          }
          return i;
        },
      ),
    }),
  ),
  on(
    brandFormDetailsAction.HANDLE_SET_BRAND_DATA,
    (state: IBrandsDetailsForm, {node, value}): IBrandsDetailsForm => ({
      ...state,
      brand: {
        ...state.brand,
        [node]: value,
      },
    }),
  ),
  on(
    brandFormDetailsAction.GENERATE_BRAND_BACKUP,
    (state: IBrandsDetailsForm): IBrandsDetailsForm => ({
      ...state,
      brandBackup: state.brand,
    }),
  ),
  on(
    brandFormDetailsAction.RESTORE_BACKUP,
    (state: IBrandsDetailsForm): IBrandsDetailsForm => ({
      ...state,
      brand: state.brandBackup,
      forceErrors: false,
      items: map(
        state.items,
        (o: IBrandItemConfig): IBrandItemConfig => {
          if (!o.original) {
            return {
              ...o,
              original: !o.original,
              Activo: !o.Activo,
            };
          }
          return {
            ...o,
          };
        },
      ),
    }),
  ),
  on(
    brandFormDetailsAction.FORCE_ERRORS,
    (state: IBrandsDetailsForm, {value}): IBrandsDetailsForm => ({
      ...state,
      forceErrors: value,
    }),
  ),
  on(
    brandFormDetailsAction.HANDLE_SAVE_BRAND_SUCCESS,
    (state: IBrandsDetailsForm, {IdMarca}): IBrandsDetailsForm => ({
      ...state,
      brand: {
        ...state.brand,
        IdMarca,
      },
    }),
  ),
  on(
    brandFormDetailsAction.CLEAN_DETAILS_STATE,
    (state: IBrandsDetailsForm): IBrandsDetailsForm => ({
      ...state,
      brand: initialIBrandsDetailsForm().brand,
      brandBackup: {} as VMarca,
      items: [],
      needsToReloadFiltersList: true,
      forceErrors: false,
    }),
  ),
);
