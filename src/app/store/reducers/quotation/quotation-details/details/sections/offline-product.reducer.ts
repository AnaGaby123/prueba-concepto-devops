/*core imports */
import {createReducer} from '@ngrx/store';

/*model imports */
import {
  initialProduct,
  Product,
} from '@appModels/store/quotation/quotation-details/details/sections/offline-product.models';

/*action imports */

const initialStateOfflineProduct: Product = {...initialProduct()};
export const offlineProductReducer = createReducer(
  initialStateOfflineProduct,
  // on(GET_UNIDAD_SUCCESS, (state, {list}) => ({
  //   ...state,
  //   typesUnitsOptions: list,
  // })),
  // on(
  //   offlineProductActions.FETCH_TYPES_FAMILY_WITH_PRINCIPAL_PROVIDER_SUCCESS,
  //   (state: Product, {typesFamiliesOptionsApi}): Product => ({
  //     ...state,
  //     typesFamiliesOptionsApi,
  //     typesFamiliesOptionsDropList: _.map(
  //       state.typesFamiliesOptionsApi.Results,
  //       (o: VMarcaFamilia) =>
  //         ({
  //           label: `${o.Tipo ? `${o.Tipo}` : ''}${o.Subtipo !== 'N/A' ? ` · ${o.Subtipo}` : ''}${
  //             o.Control !== 'N/A' ? ` · ${o.Control}` : ''
  //           }`,
  //           value: o.IdMarcaFamiliaProveedor,
  //         } as DropListOption),
  //     ),
  //   }),
  // ),
  // on(
  //   offlineProductActions.SET_TYPE_FAMILY_OPTION,
  //   (state: Product, {familyOption}): Product => ({
  //     ...state,
  //     data: {
  //       ...state.data,
  //       IdMarcaFamiliaProveedor: familyOption.value,
  //     },
  //     typeFamilySelected: familyOption,
  //   }),
  // ),
  // on(
  //   offlineProductActions.SET_QUANTITY,
  //   (state: Product, {quantity}): Product => ({
  //     ...state,
  //     data: {...state.data, Cantidad: quantity},
  //   }),
  // ),
  // on(
  //   offlineProductActions.SET_UNIT_PRODUCT,
  //   (state: Product, {idUnit}): Product => ({
  //     ...state,
  //     data: {...state.data, IdCatUnidad: idUnit.value.toString()},
  //   }),
  // ),
  // on(
  //   offlineProductActions.SET_NAME_PRODUCT,
  //   (state: Product, {name}): Product => ({
  //     ...state,
  //     data: {...state.data, Descripcion: name},
  //   }),
  // ),
  // on(
  //   offlineProductActions.SET_NOTES,
  //   (state: Product, {notes}): Product => ({
  //     ...state,
  //     data: {...state.data, NotasParaInvestigador: notes},
  //   }),
  // ),
  // on(
  //   offlineProductActions.SET_STATUS_API,
  //   (state: Product, {offlineProductStatus}): Product => ({
  //     ...state,
  //     offlineProductStatus,
  //   }),
  // ),
  // on(offlineProductActions.INITIAL_OFFLINE_PRODUCT, (state: Product): Product => initialProduct()),
);
