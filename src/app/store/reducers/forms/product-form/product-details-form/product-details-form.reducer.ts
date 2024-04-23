import {createReducer, on} from '@ngrx/store';
import {
  backOrderString,
  initialILinkedProducts,
  initialISupplements,
  initialLabwareProduct,
  initialMedicalDevice,
  initialProductsDetails,
  initialPublications,
  initialReactiverProduct,
  initialStandarProduct,
  initialTrainingDevice,
  IVProductoAlternativo,
  IVProductoComplementario,
  ProductsDetails,
} from '@appModels/store/forms/product-form/products-details-form/product-details.model';
import {
  productDetailsActions,
  productFormActions,
  productLinkedActions,
  productLogisticActions,
  productRegulationActions,
  technicalCommercialInvestigationActions,
} from '@appActions/forms/product-form';
import {filter, find, forEach, map} from 'lodash-es';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {AgrupadorCaracteristica, ArchivoTratadosOtrosDetalle, Producto} from 'api-catalogos';
import {
  API_REQUEST_STATUS_DEFAULT,
  API_REQUEST_STATUS_LOADING,
  API_REQUEST_STATUS_SUCCEEDED,
  DEFAULT_UUID,
  ENUM_CONTROL_FAMILY,
  ENUM_PRODUCT_FAMILY_KEY,
} from '@appUtil/common.protocols';

const initialProductDetailsState: ProductsDetails = {
  ...initialProductsDetails(),
};
export const productDetailsReducer = createReducer(
  initialProductDetailsState,
  on(productFormActions.SET_ACTUAL_STEP_NUMBER, (state, {actualStep}) => ({
    ...state,
    tabSelected: actualStep,
  })),
  on(productDetailsActions.SET_INITIAL_STATE, (state) => initialProductsDetails()),
  on(
    productDetailsActions.GENERATE_BACKUP,
    (state: ProductsDetails): ProductsDetails => {
      const isBackOrder = state.availabilitySelected?.labelKey === backOrderString;
      return {
        ...state,
        productDetails: {
          ...state.productDetails,
          Producto: {
            ...state.productDetails.Producto,
            FechaDisponibilidadBackOrder: isBackOrder
              ? state.productDetails.Producto.FechaDisponibilidadBackOrder
              : null,
          },
        },
        backUp: state.productDetails,
        backUpData: {
          linkedProducts: state.linkedProducts,
          selectedTradeMark: state.selectedTradeMark,
          productsTypeFamily: state.productsTypeFamily,
          productTypeFamilySelected: state.productTypeFamilySelected,
          characteristicGrouper: state.characteristicGrouper,
          characteristicGrouperSelected: state.characteristicGrouperSelected,
          unitSelected: state.unitSelected,
          availabilitySelected: state.availabilitySelected,
          billingRestrictionSelected: state.billingRestrictionSelected,
          selectedPhysicalState: state.selectedPhysicalState,
          logisticFiles: state.logisticFiles,
          technicalCommercialInvestigationFiles: state.technicalCommercialInvestigationFiles,
          publicationsFormatSelected: state.publicationsFormatSelected,
          validateCas: state.validateCas,
          useSelected: state.useSelected,
          classificationProductSelected: state.classificationProductSelected,
          internationalDepositarySelected: state.internationalDepositarySelected,
          typePresentationSelected: state.typePresentationSelected,
          typeApplicationSelected: state.typeApplicationSelected,
          transportationWaySelected: state.transportationWaySelected,
          transportationManagementSelected: state.transportationManagementSelected,
          storageSelected: state.storageSelected,
          restrictionFreightSelected: state.restrictionFreightSelected,
          dateValidityCuratorship: state.dateValidityCuratorship,
          supplementaryProducts: state.supplementaryProducts,
          supplementaryProductsToDelete: state.supplementaryProductsToDelete,
          productSupplementaryData: state.productSupplementaryData,
          productPublicationSupplementaryData: state.productPublicationSupplementaryData,
          fechaDisponibilidadBackOrderSelected: isBackOrder
            ? state.fechaDisponibilidadBackOrderSelected
            : null,
        },
      };
    },
  ),

  on(productDetailsActions.CLEAN_BACKUP, (state) => ({
    ...state,
    productDetails: state.backUp,
    logisticFiles: {
      ArchivoHojaSeguridad: null,
      ArchivoCertificadoLote: null,
      ArchivoFichaTecnica: null,
      ArchivoTratado: null,
      OtrosTratados: [],
    },
    filesToDelete: [],
    backUp: null,
    linkedProducts: state.backUpData.linkedProducts,
    selectedTradeMark: state.backUpData.selectedTradeMark,
    productsTypeFamily: state.backUpData.productsTypeFamily,
    productTypeFamilySelected: state.backUpData.productTypeFamilySelected,
    characteristicGrouper: state.backUpData.characteristicGrouper,
    characteristicGrouperSelected: state.backUpData.characteristicGrouperSelected,
    unitSelected: state.backUpData.unitSelected,
    availabilitySelected: state.backUpData.availabilitySelected,
    billingRestrictionSelected: state.backUpData.billingRestrictionSelected,
    selectedPhysicalState: state.backUpData.selectedPhysicalState,
    technicalCommercialInvestigationFiles: state.backUpData.technicalCommercialInvestigationFiles,
    publicationsFormatSelected: state.backUpData.publicationsFormatSelected,
    validateCas: state.backUpData.validateCas,
    useSelected: state.backUpData.useSelected,
    classificationProductSelected: state.backUpData.classificationProductSelected,
    internationalDepositarySelected: state.backUpData.internationalDepositarySelected,
    typePresentationSelected: state.backUpData.typePresentationSelected,
    typeApplicationSelected: state.backUpData.typeApplicationSelected,
    transportationWaySelected: state.backUpData.transportationWaySelected,
    transportationManagementSelected: state.backUpData.transportationManagementSelected,
    storageSelected: state.backUpData.storageSelected,
    restrictionFreightSelected: state.backUpData.restrictionFreightSelected,
    dateValidityCuratorship: state.backUpData.dateValidityCuratorship,
    supplementaryProducts: state.backUpData.supplementaryProducts,
    supplementaryProductsToDelete: state.backUpData.supplementaryProductsToDelete,
    productSupplementaryData: state.backUpData.productSupplementaryData,
    productPublicationSupplementaryData: state.backUpData.productPublicationSupplementaryData,
    fechaDisponibilidadBackOrderSelected: state.backUpData.fechaDisponibilidadBackOrderSelected,
  })),
  on(
    productDetailsActions.SET_ID_FILE_TO_DELETE,
    (state, {idFile, tabId, node}): ProductsDetails => {
      switch (tabId) {
        case 1:
          if (state.productDetails.TipoProductoClave === ENUM_PRODUCT_FAMILY_KEY.standards) {
            return {
              ...state,
              productDetails: {
                ...state.productDetails,
                ProductoEstandar: {
                  ...state.productDetails.ProductoEstandar,
                  IdArchivoEstructuraMolecular: idFile,
                },
                [node]: null,
              },
              technicalCommercialInvestigationFiles: {
                ArchivoEstructuraMolecular: null,
              },
            };
          }
          if (state.productDetails.TipoProductoClave === ENUM_PRODUCT_FAMILY_KEY.reactives) {
            return {
              ...state,
              productDetails: {
                ...state.productDetails,
                ProductoReactivo: {
                  ...state.productDetails.ProductoReactivo,
                  IdArchivoEstructuraMolecular: idFile,
                },
                [node]: null,
              },
              technicalCommercialInvestigationFiles: {
                ArchivoEstructuraMolecular: null,
              },
            };
          }
          break;
        case 2:
          return {
            ...state,
            productDetails:
              idFile === null
                ? {
                    ...state.productDetails,
                    [node]: null,
                    IdArchivoCartaDeDisponibilidad:
                      node === 'ArchivoCartaDeDisponibilidad'
                        ? null
                        : state.productDetails.IdArchivoCartaDeDisponibilidad,
                    IdArchivoCartaDeUso:
                      node === 'ArchivoCartaDeUso'
                        ? null
                        : state.productDetails.IdArchivoCartaDeUso,
                    IdArchivoPermisoDeAdquisicionEnPlaza:
                      node === 'ArchivoPermisoDeAdquisicionEnPlaza'
                        ? null
                        : state.productDetails.IdArchivoPermisoDeAdquisicionEnPlaza,
                    IdArchivoPermisoDeImprotacion:
                      node === 'ArchivoPermisoDeImprotacion'
                        ? null
                        : state.productDetails.IdArchivoPermisoDeImprotacion,
                    IdArchivoAvisoDeQuimicosEsenciales:
                      node === 'ArchivoAvisoDeQuimicosEsenciales'
                        ? null
                        : state.productDetails.IdArchivoAvisoDeQuimicosEsenciales,
                    IdArchivoZoosanitarios:
                      node === 'ArchivoZoosanitarios'
                        ? null
                        : state.productDetails.IdArchivoZoosanitarios,
                    IdArchivoCicoplafest:
                      node === 'ArchivoCicoplafest'
                        ? null
                        : state.productDetails.IdArchivoCicoplafest,
                    IdArchivoOtroPermiso:
                      node === 'ArchivoOtroPermiso'
                        ? null
                        : state.productDetails.IdArchivoOtroPermiso,
                  }
                : state.productDetails,
            regulationFiles: {
              ...state.regulationFiles,
              [node]: null,
            },
          };
        case 3:
          return {
            ...state,
            productDetails:
              idFile === null
                ? {
                    ...state.productDetails,
                    [node]: null,
                    IdArchivoHojaSeguridad:
                      node === 'ArchivoHojaSeguridad'
                        ? null
                        : state.productDetails.IdArchivoHojaSeguridad,
                    IdArchivoCertificado:
                      node === 'ArchivoCertificadoLote'
                        ? null
                        : state.productDetails.IdArchivoCertificado,
                    IdArchivoFichaTecnica:
                      node === 'ArchivoFichaTecnica'
                        ? null
                        : state.productDetails.IdArchivoFichaTecnica,
                    IdArchivoTratado:
                      node === 'ArchivoTratado' ? null : state.productDetails.IdArchivoTratado,
                  }
                : state.productDetails,
            logisticFiles: {
              ...state.logisticFiles,
              [node]: null,
            },
            filesToDelete: idFile !== null ? [...state.filesToDelete, idFile] : state.filesToDelete,
          };
      }
    },
  ),
  // DOCS Seccion del Reducer para iNVESTIGACIÓN TéCNICO COMERCIAL
  on(technicalCommercialInvestigationActions.GET_PRODUCT_DETAILS_SUCCESS, (state, {payload}) => ({
    ...state,
    ...payload,
  })),

  on(
    technicalCommercialInvestigationActions.SET_VALUE_DROP,
    (state, {value, node, nodeSelected}) => ({
      ...state,
      productDetails: {
        ...state.productDetails,
        [node]: value.value,
        Producto: {
          ...state.productDetails.Producto,
          [node]: value.value,
        },
      },
      [nodeSelected]: value,
    }),
  ),
  on(
    technicalCommercialInvestigationActions.SET_VALUE_DROP_TRADEMARK,
    (state, {value, node, nodeSelected}) => ({
      ...state,
      productDetails: {
        ...state.productDetails,
        [node]: value.value,
      },
      [nodeSelected]: value,
      productTypeFamilySelected: null,
      characteristicGrouperSelected: null,
      classificationProductSelected: null,
    }),
  ),
  on(
    technicalCommercialInvestigationActions.SET_VALUE_DROP_WITH_CONFIGURATION,
    (state: ProductsDetails, {value, nodeRoot, node, nodeSelected}): ProductsDetails => {
      if (nodeRoot === 'ProductoEstandar') {
        return {
          ...state,
          productDetails: {
            ...state.productDetails,
            Producto: {
              ...state.productDetails.Producto,
              NumeroDePiezas:
                nodeSelected === 'billingRestrictionSelected'
                  ? null
                  : state.productDetails.NumeroDePiezas,
            },

            NumeroDePiezas:
              nodeSelected === 'billingRestrictionSelected'
                ? null
                : state.productDetails.NumeroDePiezas,
            ProductoEstandar: {
              ...state.productDetails.ProductoEstandar,
              [node]: value.value,
            },
          },
          [nodeSelected]: value,
        };
      } else if (nodeRoot === 'ProductoReactivo') {
        return {
          ...state,
          productDetails: {
            ...state.productDetails,
            NumeroDePiezas:
              nodeSelected === 'billingRestrictionSelected'
                ? null
                : state.productDetails.NumeroDePiezas,
            ProductoReactivo: {
              ...state.productDetails.ProductoReactivo,
              [node]: value.value,
            },
          },
          [nodeSelected]: value,
        };
      } else if (nodeRoot === 'ProductoPublicacion') {
        return {
          ...state,
          productDetails: {
            ...state.productDetails,
            NumeroDePiezas:
              nodeSelected === 'billingRestrictionSelected'
                ? null
                : state.productDetails.NumeroDePiezas,
            ProductoPublicacion: {
              ...state.productDetails.ProductoPublicacion,
              [node]: value.value,
            },
          },
          [nodeSelected]: value,
        };
      } else if (nodeRoot === 'ProductoLabware') {
        return {
          ...state,
          productDetails: {
            ...state.productDetails,
            NumeroDePiezas:
              nodeSelected === 'billingRestrictionSelected'
                ? null
                : state.productDetails.NumeroDePiezas,
            ProductoLabware: {
              ...state.productDetails.ProductoLabware,
              [node]: value.value,
            },
          },
          [nodeSelected]: value,
        };
      } else if (nodeRoot === 'ProductoDispositivoMedico') {
        return {
          ...state,
          productDetails: {
            ...state.productDetails,
            NumeroDePiezas:
              nodeSelected === 'billingRestrictionSelected'
                ? null
                : state.productDetails.NumeroDePiezas,
            ProductoDispositivoMedico: {
              ...state.productDetails.ProductoDispositivoMedico,
              [node]: value.value,
            },
          },
          [nodeSelected]: value,
        };
      }
    },
  ),
  on(
    technicalCommercialInvestigationActions.SET_VALUE_INPUT_PUBLICATIONS,
    (state, {value, node}) => ({
      ...state,
      productDetails: {
        ...state.productDetails,
        ProductoPublicacion: {
          ...state.productDetails.ProductoPublicacion,
          [node]: value,
        },
      },
    }),
  ),
  on(
    technicalCommercialInvestigationActions.SET_VALUE_INPUT_SUPPLEMENT_PRODUCT,
    (state, {value, node}) => ({
      ...state,
      supplement: {
        ...state.supplement,
        [node]: value,
      },
    }),
  ),
  on(
    technicalCommercialInvestigationActions.SET_VALUE_INPUT,
    (state, {value, node}): ProductsDetails => ({
      ...state,
      productDetails: {
        ...state.productDetails,
        [node]: value,
        Producto: {
          ...state.productDetails.Producto,
          [node]: value,
        },
      },
    }),
  ),
  on(
    technicalCommercialInvestigationActions.SET_VALUE_INPUT_WITH_CONFIGURATION,
    (state, {value, node, nodeRoot}): ProductsDetails => {
      if (nodeRoot === 'ProductoEstandar') {
        return {
          ...state,
          productDetails: {
            ...state.productDetails,
            ProductoEstandar: {
              ...state.productDetails.ProductoEstandar,
              [node]: value,
            },
          },
        };
      } else if (nodeRoot === 'ProductoReactivo') {
        return {
          ...state,
          productDetails: {
            ...state.productDetails,
            ProductoReactivo: {
              ...state.productDetails.ProductoReactivo,
              [node]: value,
            },
          },
        };
      } else if (nodeRoot === 'ProductoPublicacion') {
        return {
          ...state,
          productDetails: {
            ...state.productDetails,
            ProductoPublicacion: {
              ...state.productDetails.ProductoPublicacion,
              [node]: value,
            },
          },
        };
      } else if (nodeRoot === 'ProductoLabware') {
        return {
          ...state,
          productDetails: {
            ...state.productDetails,
            ProductoLabware: {
              ...state.productDetails.ProductoLabware,
              [node]: value,
            },
          },
        };
      } else if (nodeRoot === 'ProductoCapacitacion') {
        if (node === 'PrecioPorPersona' || node === 'PrecioPorGrupo') {
          return {
            ...state,
            productDetails: {
              ...state.productDetails,
              ProductoCapacitacion: {
                ...state.productDetails.ProductoCapacitacion,
                NumeroDePersonasPorGrupo:
                  node === 'PrecioPorGrupo'
                    ? state.productDetails.ProductoCapacitacion.NumeroDePersonasPorGrupo
                    : null,
                PrecioPorPersona: node === 'PrecioPorPersona',
                PrecioPorGrupo: node === 'PrecioPorGrupo',
              },
              PrecioListaMonedaProveedor:
                (node === 'PrecioPorGrupo' &&
                  !state.productDetails.ProductoCapacitacion.PrecioPorGrupo) ||
                (node === 'PrecioPorPersona' &&
                  !state.productDetails.ProductoCapacitacion.PrecioPorPersona)
                  ? null
                  : state.productDetails.PrecioListaMonedaProveedor,
              Producto: {
                ...state.productDetails.Producto,
                PrecioListaMonedaProveedor:
                  (node === 'PrecioPorGrupo' &&
                    !state.productDetails.ProductoCapacitacion.PrecioPorGrupo) ||
                  (node === 'PrecioPorPersona' &&
                    !state.productDetails.ProductoCapacitacion.PrecioPorPersona)
                    ? null
                    : state.productDetails.Producto.PrecioListaMonedaProveedor,
              },
            },
          };
        }
        return {
          ...state,
          productDetails: {
            ...state.productDetails,
            ProductoCapacitacion: {
              ...state.productDetails.ProductoCapacitacion,
              [node]: node !== 'IdCatMedioDifusion' ? value : value.value,
            },
          },
        };
      } else if (nodeRoot === 'ProductoDispositivoMedico') {
        return {
          ...state,
          productDetails: {
            ...state.productDetails,
            ProductoDispositivoMedico: {
              ...state.productDetails.ProductoDispositivoMedico,
              [node]: value,
            },
          },
        };
      }
    },
  ),
  on(
    technicalCommercialInvestigationActions.SET_INITIAL_DATA_CONFIGURATION,
    (state, {nodeRoot, familySelected}): ProductsDetails => {
      if (nodeRoot === 'ProductoEstandar') {
        return {
          ...state,
          productDetails: {
            ...state.productDetails,
            NumeroDePiezas: null,
            Producto: {
              ...state.productDetails.Producto,
              NumeroDePiezas: null,
              IdCatClasificacionInformativaProducto: null,
              IdCatDepositarioInternacional: null,
              IdAgrupadorCaracteristica: null,
              Controlado: !(
                familySelected.ClaveControl === 'n/a' || familySelected.ClaveControl === 'normal'
              ),
            },
            ProductoEstandar:
              state.productDetails.ProductoEstandar &&
              state.productDetails.ProductoEstandar?.IdProductoEstandar !== DEFAULT_UUID
                ? {
                    ...state.productDetails.ProductoEstandar,
                    IdCatUso: null,
                    IdCatTipoPresentacion: null,
                    Activo: true,
                  }
                : initialStandarProduct(),
            ProductoLabware:
              state.productDetails.ProductoLabware &&
              state.productDetails.ProductoLabware?.IdProductoLabware !== DEFAULT_UUID
                ? {...state.productDetails.ProductoLabware, Activo: false}
                : null,
            ProductoPublicacion:
              state.productDetails.ProductoPublicacion &&
              state.productDetails.ProductoPublicacion?.IdProductoPublicacion !== DEFAULT_UUID
                ? {
                    ...state.productDetails.ProductoPublicacion,
                    Activo: false,
                    IdCatFormatoPublicacion: null,
                  }
                : null,
            ProductoReactivo:
              state.productDetails.ProductoReactivo &&
              state.productDetails.ProductoReactivo?.IdProductoReactivo !== DEFAULT_UUID
                ? {
                    ...state.productDetails.ProductoReactivo,
                    Activo: false,
                    IdCatEstadoFisico: null,
                    IdCatUso: null,
                    IdCatTipoPresentacion: null,
                    IdCatAplicacion: null,
                    IdCatManejoAlmacenaje: null,
                    IdCatMedioTransporte: null,
                    IdCatManejoTransporte: null,
                  }
                : null,
            ProductoDispositivoMedico:
              state.productDetails.ProductoDispositivoMedico &&
              state.productDetails.ProductoDispositivoMedico?.IdProductoDispositivoMedico !==
                DEFAULT_UUID
                ? {
                    ...state.productDetails.ProductoDispositivoMedico,
                    Activo: true,
                    IdCatManejoAlmacenaje: null,
                  }
                : null,
            ProductoCapacitacion:
              state.productDetails.ProductoCapacitacion &&
              state.productDetails.ProductoCapacitacion?.IdProductoCapacitacion !== DEFAULT_UUID
                ? {
                    ...state.productDetails.ProductoCapacitacion,
                    Activo: true,
                  }
                : null,
            Subtipo: familySelected.Subtipo,
            IdCatSubtipoProducto: familySelected.IdCatSubtipoProducto,
            Control: familySelected.Control,
            // FIXME: Hacer enum de claves control
            Controlado: !(
              familySelected.ClaveControl === ENUM_CONTROL_FAMILY.NA ||
              familySelected.ClaveControl === ENUM_CONTROL_FAMILY.Normal
            ),
            Tipo: familySelected.Tipo,
            TipoProductoClave: ENUM_PRODUCT_FAMILY_KEY.standards,
            IdCatTipoProducto: familySelected.IdCatTipoProducto,
            IdCatControl: familySelected.IdCatControl,
            IdProveedor: familySelected.IdProveedor,
            NombreProveedor: familySelected.NombreProveedor,
          },
          technicalCommercialInvestigationFiles: {
            ArchivoEstructuraMolecular: null,
          },
          classificationProductSelected: null,
          internationalDepositarySelected: null,
          publicationsFormatSelected: null,
          selectedPhysicalState: null,
          useSelected: null,
          typePresentationSelected: null,
          typeApplicationSelected: null,
          transportationManagementSelected: null,
          transportationWaySelected: null,
          storageSelected: null,
          characteristicGrouperSelected: null,
        };
      } else if (nodeRoot === 'ProductoReactivo') {
        return {
          ...state,
          productDetails: {
            ...state.productDetails,
            NumeroDePiezas: null,
            Producto: {
              ...state.productDetails.Producto,
              NumeroDePiezas: null,
              IdCatClasificacionInformativaProducto: null,
              IdCatDepositarioInternacional: null,
              IdAgrupadorCaracteristica: null,
              Controlado: !(
                familySelected.ClaveControl === 'n/a' || familySelected.ClaveControl === 'normal'
              ),
            },
            ProductoLabware:
              state.productDetails.ProductoLabware &&
              state.productDetails.ProductoLabware?.IdProductoLabware !== DEFAULT_UUID
                ? {...state.productDetails.ProductoLabware, Activo: false}
                : null,
            ProductoPublicacion:
              state.productDetails.ProductoPublicacion &&
              state.productDetails.ProductoPublicacion?.IdProductoPublicacion !== DEFAULT_UUID
                ? {
                    ...state.productDetails.ProductoPublicacion,
                    Activo: false,
                    IdCatFormatoPublicacion: null,
                  }
                : null,
            ProductoEstandar:
              state.productDetails.ProductoEstandar &&
              state.productDetails.ProductoEstandar?.IdProductoEstandar !== DEFAULT_UUID
                ? {
                    ...state.productDetails.ProductoEstandar,
                    Activo: false,
                    IdCatEstadoFisico: null,
                    IdCatUso: null,
                    IdCatTipoPresentacion: null,
                    IdCatAplicacion: null,
                    IdCatManejoAlmacenaje: null,
                    IdCatMedioTransporte: null,
                    IdCatManejoTransporte: null,
                  }
                : null,
            ProductoReactivo:
              state.productDetails.ProductoReactivo &&
              state.productDetails.ProductoReactivo?.IdProductoReactivo !== DEFAULT_UUID
                ? {
                    ...state.productDetails.ProductoReactivo,
                    IdCatUso: null,
                    IdCatTipoPresentacion: null,
                    Activo: true,
                  }
                : initialReactiverProduct(),
            ProductoDispositivoMedico:
              state.productDetails.ProductoDispositivoMedico &&
              state.productDetails.ProductoDispositivoMedico?.IdProductoDispositivoMedico !==
                DEFAULT_UUID
                ? {
                    ...state.productDetails.ProductoDispositivoMedico,
                    Activo: true,
                    IdCatManejoAlmacenaje: null,
                  }
                : null,
            ProductoCapacitacion:
              state.productDetails.ProductoCapacitacion &&
              state.productDetails.ProductoCapacitacion?.IdProductoCapacitacion !== DEFAULT_UUID
                ? {
                    ...state.productDetails.ProductoCapacitacion,
                    Activo: true,
                  }
                : null,
            Subtipo: familySelected.Subtipo,
            IdCatSubtipoProducto: familySelected.IdCatSubtipoProducto,
            Control: familySelected.Control,
            Tipo: familySelected.Tipo,
            TipoProductoClave: ENUM_PRODUCT_FAMILY_KEY.reactives,
            IdCatTipoProducto: familySelected.IdCatTipoProducto,
            IdCatControl: familySelected.IdCatControl,
            IdProveedor: familySelected.IdProveedor,
            NombreProveedor: familySelected.NombreProveedor,
            Controlado: !(
              familySelected.ClaveControl === 'n/a' || familySelected.ClaveControl === 'normal'
            ),
          },
          technicalCommercialInvestigationFiles: {
            ArchivoEstructuraMolecular: null,
          },
          classificationProductSelected: null,
          internationalDepositarySelected: null,
          publicationsFormatSelected: null,
          selectedPhysicalState: null,
          useSelected: null,
          typePresentationSelected: null,
          typeApplicationSelected: null,
          transportationManagementSelected: null,
          transportationWaySelected: null,
          storageSelected: null,
          characteristicGrouperSelected: null,
        };
      } else if (nodeRoot === 'ProductoPublicacion') {
        return {
          ...state,
          productDetails: {
            ...state.productDetails,
            NumeroDePiezas: null,
            Producto: {
              ...state.productDetails.Producto,
              GravaIVA: false,
              NumeroDePiezas: null,
              IdCatClasificacionInformativaProducto: null,
              IdCatDepositarioInternacional: null,
              IdAgrupadorCaracteristica: null,
              Controlado: !(
                familySelected.ClaveControl === 'n/a' || familySelected.ClaveControl === 'normal'
              ),
            },
            ProductoLabware:
              state.productDetails.ProductoLabware &&
              state.productDetails.ProductoLabware?.IdProductoLabware !== DEFAULT_UUID
                ? {...state.productDetails.ProductoLabware, Activo: false}
                : null,
            ProductoEstandar:
              state.productDetails.ProductoEstandar &&
              state.productDetails.ProductoEstandar?.IdProductoEstandar !== DEFAULT_UUID
                ? {
                    ...state.productDetails.ProductoEstandar,
                    Activo: false,
                    IdCatEstadoFisico: null,
                    IdCatUso: null,
                    IdCatTipoPresentacion: null,
                    IdCatAplicacion: null,
                    IdCatManejoAlmacenaje: null,
                    IdCatMedioTransporte: null,
                    IdCatManejoTransporte: null,
                  }
                : null,
            ProductoReactivo:
              state.productDetails.ProductoReactivo &&
              state.productDetails.ProductoReactivo?.IdProductoReactivo !== DEFAULT_UUID
                ? {
                    ...state.productDetails.ProductoReactivo,
                    Activo: false,
                    IdCatEstadoFisico: null,
                    IdCatUso: null,
                    IdCatTipoPresentacion: null,
                    IdCatAplicacion: null,
                    IdCatManejoAlmacenaje: null,
                    IdCatMedioTransporte: null,
                    IdCatManejoTransporte: null,
                  }
                : null,
            ProductoPublicacion:
              state.productDetails.ProductoPublicacion &&
              state.productDetails.ProductoPublicacion?.IdProductoPublicacion !== DEFAULT_UUID
                ? {...state.productDetails.ProductoPublicacion, Activo: true}
                : initialPublications(),
            ProductoDispositivoMedico:
              state.productDetails.ProductoDispositivoMedico &&
              state.productDetails.ProductoDispositivoMedico?.IdProductoDispositivoMedico !==
                DEFAULT_UUID
                ? {
                    ...state.productDetails.ProductoDispositivoMedico,
                    Activo: true,
                    IdCatManejoAlmacenaje: null,
                  }
                : null,
            ProductoCapacitacion:
              state.productDetails.ProductoCapacitacion &&
              state.productDetails.ProductoCapacitacion?.IdProductoCapacitacion !== DEFAULT_UUID
                ? {
                    ...state.productDetails.ProductoCapacitacion,
                    Activo: true,
                  }
                : null,
            Subtipo: familySelected.Subtipo,
            IdCatSubtipoProducto: familySelected.IdCatSubtipoProducto,
            Control: familySelected.Control,
            Tipo: familySelected.Tipo,
            TipoProductoClave: ENUM_PRODUCT_FAMILY_KEY.publications,
            IdCatTipoProducto: familySelected.IdCatTipoProducto,
            IdCatControl: familySelected.IdCatControl,
            IdProveedor: familySelected.IdProveedor,
            NombreProveedor: familySelected.NombreProveedor,
            Controlado: !(
              familySelected.ClaveControl === 'n/a' || familySelected.ClaveControl === 'normal'
            ),
          },
          technicalCommercialInvestigationFiles: {
            ArchivoEstructuraMolecular: null,
          },
          classificationProductSelected: null,
          internationalDepositarySelected: null,
          publicationsFormatSelected: null,
          selectedPhysicalState: null,
          useSelected: null,
          typePresentationSelected: null,
          typeApplicationSelected: null,
          transportationManagementSelected: null,
          transportationWaySelected: null,
          storageSelected: null,
          characteristicGrouperSelected: null,

          /*
        characteristicGrouperSelected: null,
*/
          /*unitSelected: null,*/
          /*availabilitySelected: null,*/
        };
      } else if (nodeRoot === 'ProductoLabware') {
        return {
          ...state,
          productDetails: {
            ...state.productDetails,
            NumeroDePiezas: null,
            Producto: {
              ...state.productDetails.Producto,
              NumeroDePiezas: null,
              IdCatClasificacionInformativaProducto: null,
              IdCatDepositarioInternacional: null,
              IdAgrupadorCaracteristica: null,
              Controlado: !(
                familySelected.ClaveControl === 'n/a' || familySelected.ClaveControl === 'normal'
              ),
            },
            ProductoEstandar:
              state.productDetails.ProductoEstandar &&
              state.productDetails.ProductoEstandar?.IdProductoEstandar !== DEFAULT_UUID
                ? {
                    ...state.productDetails.ProductoEstandar,
                    Activo: false,
                    IdCatEstadoFisico: null,
                    IdCatUso: null,
                    IdCatTipoPresentacion: null,
                    IdCatAplicacion: null,
                    IdCatManejoAlmacenaje: null,
                    IdCatMedioTransporte: null,
                    IdCatManejoTransporte: null,
                  }
                : null,
            ProductoReactivo:
              state.productDetails.ProductoReactivo &&
              state.productDetails.ProductoReactivo?.IdProductoReactivo !== DEFAULT_UUID
                ? {
                    ...state.productDetails.ProductoReactivo,
                    Activo: false,
                    IdCatEstadoFisico: null,
                    IdCatUso: null,
                    IdCatTipoPresentacion: null,
                    IdCatAplicacion: null,
                    IdCatManejoAlmacenaje: null,
                    IdCatMedioTransporte: null,
                    IdCatManejoTransporte: null,
                  }
                : null,
            ProductoPublicacion:
              state.productDetails.ProductoPublicacion &&
              state.productDetails.ProductoPublicacion?.IdProductoPublicacion !== DEFAULT_UUID
                ? {
                    ...state.productDetails.ProductoPublicacion,
                    Activo: false,
                    IdCatFormatoPublicacion: null,
                  }
                : null,
            ProductoLabware:
              state.productDetails.ProductoLabware &&
              state.productDetails.ProductoLabware?.IdProductoLabware !== DEFAULT_UUID
                ? {...state.productDetails.ProductoLabware, Activo: true}
                : initialLabwareProduct(),
            ProductoDispositivoMedico:
              state.productDetails.ProductoDispositivoMedico &&
              state.productDetails.ProductoDispositivoMedico?.IdProductoDispositivoMedico !==
                DEFAULT_UUID
                ? {
                    ...state.productDetails.ProductoDispositivoMedico,
                    Activo: true,
                    IdCatManejoAlmacenaje: null,
                  }
                : null,
            ProductoCapacitacion:
              state.productDetails.ProductoCapacitacion &&
              state.productDetails.ProductoCapacitacion?.IdProductoCapacitacion !== DEFAULT_UUID
                ? {
                    ...state.productDetails.ProductoCapacitacion,
                    Activo: true,
                  }
                : null,
            Subtipo: familySelected.Subtipo,
            IdCatSubtipoProducto: familySelected.IdCatSubtipoProducto,
            Control: familySelected.Control,
            IdCatControl: familySelected.IdCatControl,
            Tipo: familySelected.Tipo,
            TipoProductoClave: ENUM_PRODUCT_FAMILY_KEY.labware,
            IdCatTipoProducto: familySelected.IdCatTipoProducto,
            IdProveedor: familySelected.IdProveedor,
            NombreProveedor: familySelected.NombreProveedor,
            Controlado: !(
              familySelected.ClaveControl === 'n/a' || familySelected.ClaveControl === 'normal'
            ),
          },
          technicalCommercialInvestigationFiles: {
            ArchivoEstructuraMolecular: null,
          },
          classificationProductSelected: null,
          internationalDepositarySelected: null,
          publicationsFormatSelected: null,
          selectedPhysicalState: null,
          useSelected: null,
          typePresentationSelected: null,
          typeApplicationSelected: null,
          transportationManagementSelected: null,
          transportationWaySelected: null,
          storageSelected: null,
          characteristicGrouperSelected: null,

          /*
        characteristicGrouperSelected: null,
*/
          /*unitSelected: null,*/
          /*availabilitySelected: null,*/
        };
      } else if (nodeRoot === 'ProductoDispositivoMedico') {
        return {
          ...state,
          productDetails: {
            ...state.productDetails,
            NumeroDePiezas: null,
            Producto: {
              ...state.productDetails.Producto,
              NumeroDePiezas: null,
              IdCatClasificacionInformativaProducto: null,
              IdCatDepositarioInternacional: null,
              IdAgrupadorCaracteristica: null,
              Controlado: !(
                familySelected.ClaveControl === 'n/a' || familySelected.ClaveControl === 'normal'
              ),
            },
            ProductoEstandar:
              state.productDetails.ProductoEstandar &&
              state.productDetails.ProductoEstandar?.IdProductoEstandar !== DEFAULT_UUID
                ? {
                    ...state.productDetails.ProductoEstandar,
                    Activo: false,
                    IdCatEstadoFisico: null,
                    IdCatUso: null,
                    IdCatTipoPresentacion: null,
                    IdCatAplicacion: null,
                    IdCatManejoAlmacenaje: null,
                    IdCatMedioTransporte: null,
                    IdCatManejoTransporte: null,
                  }
                : null,
            ProductoReactivo:
              state.productDetails.ProductoReactivo &&
              state.productDetails.ProductoReactivo?.IdProductoReactivo !== DEFAULT_UUID
                ? {
                    ...state.productDetails.ProductoReactivo,
                    Activo: false,
                    IdCatEstadoFisico: null,
                    IdCatUso: null,
                    IdCatTipoPresentacion: null,
                    IdCatAplicacion: null,
                    IdCatManejoAlmacenaje: null,
                    IdCatMedioTransporte: null,
                    IdCatManejoTransporte: null,
                  }
                : null,
            ProductoPublicacion:
              state.productDetails.ProductoPublicacion &&
              state.productDetails.ProductoPublicacion?.IdProductoPublicacion !== DEFAULT_UUID
                ? {
                    ...state.productDetails.ProductoPublicacion,
                    Activo: false,
                    IdCatFormatoPublicacion: null,
                  }
                : null,
            ProductoLabware:
              state.productDetails.ProductoLabware &&
              state.productDetails.ProductoLabware?.IdProductoLabware !== DEFAULT_UUID
                ? {...state.productDetails.ProductoLabware, Activo: true}
                : null,
            ProductoDispositivoMedico:
              state.productDetails.ProductoDispositivoMedico &&
              state.productDetails.ProductoDispositivoMedico.IdProductoDispositivoMedico !==
                DEFAULT_UUID
                ? {
                    ...state.productDetails.ProductoDispositivoMedico,
                    Activo: true,
                  }
                : initialMedicalDevice(),
            ProductoCapacitacion:
              state.productDetails.ProductoCapacitacion &&
              state.productDetails.ProductoCapacitacion?.IdProductoCapacitacion !== DEFAULT_UUID
                ? {
                    ...state.productDetails.ProductoCapacitacion,
                    Activo: true,
                  }
                : null,
            Subtipo: familySelected.Subtipo,
            IdCatSubtipoProducto: familySelected.IdCatSubtipoProducto,
            Control: familySelected.Control,
            IdCatControl: familySelected.IdCatControl,
            Tipo: familySelected.Tipo,
            TipoProductoClave: ENUM_PRODUCT_FAMILY_KEY.medicalDevice,
            IdCatTipoProducto: familySelected.IdCatTipoProducto,
            IdProveedor: familySelected.IdProveedor,
            NombreProveedor: familySelected.NombreProveedor,
            Controlado: !(
              familySelected.ClaveControl === 'n/a' || familySelected.ClaveControl === 'normal'
            ),
          },
          technicalCommercialInvestigationFiles: {
            ArchivoEstructuraMolecular: null,
          },
          classificationProductSelected: null,
          internationalDepositarySelected: null,
          publicationsFormatSelected: null,
          selectedPhysicalState: null,
          useSelected: null,
          typePresentationSelected: null,
          typeApplicationSelected: null,
          transportationManagementSelected: null,
          transportationWaySelected: null,
          storageSelected: null,
          characteristicGrouperSelected: null,
        };
      } else if (nodeRoot === 'ProductoCapacitacion') {
        return {
          ...state,
          productDetails: {
            ...state.productDetails,
            NumeroDePiezas: null,
            Producto: {
              ...state.productDetails.Producto,
              NumeroDePiezas: null,
              IdCatClasificacionInformativaProducto: null,
              IdCatDepositarioInternacional: null,
              IdAgrupadorCaracteristica: null,
              Controlado: !(
                familySelected.ClaveControl === 'n/a' || familySelected.ClaveControl === 'normal'
              ),
              IdCatDisponibilidad:
                state.availabilitySelected?.labelKey === backOrderString
                  ? null
                  : state.productDetails?.Producto?.IdCatDisponibilidad,
            },
            ProductoEstandar:
              state.productDetails.ProductoEstandar &&
              state.productDetails.ProductoEstandar?.IdProductoEstandar !== DEFAULT_UUID
                ? {
                    ...state.productDetails.ProductoEstandar,
                    Activo: false,
                    IdCatEstadoFisico: null,
                    IdCatUso: null,
                    IdCatTipoPresentacion: null,
                    IdCatAplicacion: null,
                    IdCatManejoAlmacenaje: null,
                    IdCatMedioTransporte: null,
                    IdCatManejoTransporte: null,
                  }
                : null,
            ProductoReactivo:
              state.productDetails.ProductoReactivo &&
              state.productDetails.ProductoReactivo?.IdProductoReactivo !== DEFAULT_UUID
                ? {
                    ...state.productDetails.ProductoReactivo,
                    Activo: false,
                    IdCatEstadoFisico: null,
                    IdCatUso: null,
                    IdCatTipoPresentacion: null,
                    IdCatAplicacion: null,
                    IdCatManejoAlmacenaje: null,
                    IdCatMedioTransporte: null,
                    IdCatManejoTransporte: null,
                  }
                : null,
            ProductoPublicacion:
              state.productDetails.ProductoPublicacion &&
              state.productDetails.ProductoPublicacion?.IdProductoPublicacion !== DEFAULT_UUID
                ? {
                    ...state.productDetails.ProductoPublicacion,
                    Activo: false,
                    IdCatFormatoPublicacion: null,
                  }
                : null,
            ProductoLabware:
              state.productDetails.ProductoLabware &&
              state.productDetails.ProductoLabware?.IdProductoLabware !== DEFAULT_UUID
                ? {...state.productDetails.ProductoLabware, Activo: true}
                : null,
            ProductoDispositivoMedico:
              state.productDetails.ProductoDispositivoMedico &&
              state.productDetails.ProductoDispositivoMedico?.IdProductoDispositivoMedico !==
                DEFAULT_UUID
                ? {
                    ...state.productDetails.ProductoDispositivoMedico,
                    Activo: true,
                    IdCatManejoAlmacenaje: null,
                  }
                : null,
            ProductoCapacitacion:
              state.productDetails.ProductoCapacitacion &&
              state.productDetails.ProductoCapacitacion.IdProductoCapacitacion !== DEFAULT_UUID
                ? {
                    ...state.productDetails.ProductoCapacitacion,
                    Activo: true,
                  }
                : initialTrainingDevice(),
            Subtipo: familySelected.Subtipo,
            IdCatSubtipoProducto: familySelected.IdCatSubtipoProducto,
            Control: familySelected.Control,
            IdCatControl: familySelected.IdCatControl,
            Tipo: familySelected.Tipo,
            TipoProductoClave: ENUM_PRODUCT_FAMILY_KEY.trainings,
            IdCatTipoProducto: familySelected.IdCatTipoProducto,
            IdCatDisponibilidad:
              state.availabilitySelected?.labelKey === backOrderString
                ? null
                : state.productDetails?.IdCatDisponibilidad,
            IdProveedor: familySelected.IdProveedor,
            NombreProveedor: familySelected.NombreProveedor,
            Controlado: !(
              familySelected.ClaveControl === 'n/a' || familySelected.ClaveControl === 'normal'
            ),
          },
          technicalCommercialInvestigationFiles: {
            ArchivoEstructuraMolecular: null,
          },
          classificationProductSelected: null,
          internationalDepositarySelected: null,
          publicationsFormatSelected: null,
          selectedPhysicalState: null,
          useSelected: null,
          typePresentationSelected: null,
          typeApplicationSelected: null,
          transportationManagementSelected: null,
          transportationWaySelected: null,
          storageSelected: null,
          characteristicGrouperSelected: null,
          availabilitySelected:
            state.availabilitySelected?.labelKey === backOrderString
              ? null
              : state.availabilitySelected,
        };
      } else {
        /*DOCS: Comodín para familias no contempladas*/
        return {
          ...state,
          productDetails: {
            ...state.productDetails,
            ProductoEstandar: null,
            ProductoPublicacion: null,
            ProductoReactivo: null,
            ProductoLabware: null,
            Subtipo: familySelected.Subtipo,
            IdCatSubtipoProducto: familySelected.IdCatSubtipoProducto,
            Control: familySelected.Control,
            IdCatControl: familySelected.IdCatControl,
            Controlado: !(
              familySelected.ClaveControl === 'n/a' || familySelected.ClaveControl === 'normal'
            ),
          },
          characteristicGrouperSelected: null,
          unitSelected: null,
          availabilitySelected: null,
          billingRestrictionSelected: null,
          selectedPhysicalState: null,
          useSelected: null,
          internationalDepositarySelected: null,
          typePresentationSelected: null,
          typeApplicationSelected: null,
          transportationWaySelected: null,
          classificationProductSelected: null,
          transportationManagementSelected: null,
          storageSelected: null,
          restrictionFreightSelected: null,
          publicationsFormatSelected: null,
        };
      }
    },
  ),
  on(
    technicalCommercialInvestigationActions.SET_SUCCESS_TYPE_PRODUCT_FAMILY,
    (state, {payload}) => ({
      ...state,
      productsTypeFamily: payload,
    }),
  ),
  on(technicalCommercialInvestigationActions.SET_CAS_VALUE, (state, {value}) => ({
    ...state,
    productDetails: {
      ...state.productDetails,
      Producto: {
        ...state.productDetails.Producto,
        TieneCAS: value,
      },
    },
  })),
  on(
    technicalCommercialInvestigationActions.SAVE_MOLECULAR_STRUCTURE_FILE_SUCCESS,
    (state: ProductsDetails, {file}): ProductsDetails => {
      if (state.productDetails.TipoProductoClave === ENUM_PRODUCT_FAMILY_KEY.standards) {
        return {
          ...state,
          productDetails: {
            ...state.productDetails,
            ProductoEstandar: {
              ...state.productDetails.ProductoEstandar,
              IdArchivoEstructuraMolecular: file.IdArchivo,
            },
            ArchivoEstructuraMolecular: file,
            IdArchivoEstructuraMolecular: file.IdArchivo,
          },
          technicalCommercialInvestigationFiles: {
            ...state.technicalCommercialInvestigationFiles,
            ArchivoEstructuraMolecular: null,
          },
        };
      } else if (state.productDetails.TipoProductoClave === ENUM_PRODUCT_FAMILY_KEY.reactives) {
        return {
          ...state,
          productDetails: {
            ...state.productDetails,
            ProductoReactivo: {
              ...state.productDetails.ProductoReactivo,
              IdArchivoEstructuraMolecular: file.IdArchivo,
            },
            ArchivoEstructuraMolecular: file,
            IdArchivoEstructuraMolecular: file.IdArchivo,
          },
          technicalCommercialInvestigationFiles: {
            ...state.technicalCommercialInvestigationFiles,
            ArchivoEstructuraMolecular: null,
          },
        };
      }
    },
  ),
  on(
    technicalCommercialInvestigationActions.SET_SUCCESS_CHARASTERISTIC_GROUPER,
    (state: ProductsDetails, {payload}) => ({
      ...state,
      characteristicGrouper: map(
        payload,
        (o: AgrupadorCaracteristica) =>
          ({
            value: o.IdAgrupadorCaracteristica,
            label: o.Descripcion,
          } as DropListOption),
      ),
    }),
  ),
  on(technicalCommercialInvestigationActions.SET_SAVE_PRODUCT_SUCCESS, (state, {payload}) => {
    if (state.productDetails.TipoProductoClave === ENUM_PRODUCT_FAMILY_KEY.standards) {
      return {
        ...state,
        productDetails: {
          ...state.productDetails,
          IdProducto: payload,
          Producto: {
            ...state.productDetails.Producto,
            IdProducto: payload,
          },
          ProductoEstandar: {
            ...state.productDetails.ProductoEstandar,
            IdProducto: payload,
          },
        },
      };
    } else if (state.productDetails.TipoProductoClave === ENUM_PRODUCT_FAMILY_KEY.reactives) {
      return {
        ...state,
        productDetails: {
          ...state.productDetails,
          IdProducto: payload,
          Producto: {
            ...state.productDetails.Producto,
            IdProducto: payload,
          },
          ProductoReactivo: {
            ...state.productDetails.ProductoReactivo,
            IdProducto: payload,
          },
        },
      };
    } else if (state.productDetails.TipoProductoClave === ENUM_PRODUCT_FAMILY_KEY.labware) {
      return {
        ...state,
        productDetails: {
          ...state.productDetails,
          IdProducto: payload,
          Producto: {
            ...state.productDetails.Producto,
            IdProducto: payload,
          },
          ProductoLabware: {
            ...state.productDetails.ProductoLabware,
            IdProducto: payload,
          },
        },
      };
    } else if (state.productDetails.TipoProductoClave === ENUM_PRODUCT_FAMILY_KEY.publications) {
      return {
        ...state,
        productDetails: {
          ...state.productDetails,
          IdProducto: payload,
          Producto: {
            ...state.productDetails.Producto,
            IdProducto: payload,
          },
          ProductoPublicacion: {
            ...state.productDetails.ProductoPublicacion,
            IdProducto: payload,
          },
        },
      };
    } else if (state.productDetails.TipoProductoClave === ENUM_PRODUCT_FAMILY_KEY.medicalDevice) {
      return {
        ...state,
        productDetails: {
          ...state.productDetails,
          IdProducto: payload,
          Producto: {
            ...state.productDetails.Producto,
            IdProducto: payload,
          },
          ProductoDispositivoMedico: {
            ...state.productDetails.ProductoDispositivoMedico,
            IdProducto: payload,
          },
        },
      };
    } else if (state.productDetails.TipoProductoClave === ENUM_PRODUCT_FAMILY_KEY.trainings) {
      return {
        ...state,
        productDetails: {
          ...state.productDetails,
          IdProducto: payload,
          Producto: {
            ...state.productDetails.Producto,
            IdProducto: payload,
          },
          ProductoCapacitacion: {
            ...state.productDetails.ProductoCapacitacion,
            IdProducto: payload,
          },
        },
      };
    }
  }),
  on(
    technicalCommercialInvestigationActions.SET_DATE_VALIDITY_CURATORSHIP,
    (state, {dateType, finalDate}) => ({
      ...state,
      productDetails: {
        ...state.productDetails,
        Producto: {
          ...state.productDetails.Producto,
          FechaCaducidadVigenciaCuraduria: finalDate,
        },
      },
      dateValidityCuratorship: dateType,
    }),
  ),
  on(
    technicalCommercialInvestigationActions.SET_BACKORDER_AVAILABILITY_DATE,
    (state, {finalDate, dateType}) => {
      return {
        ...state,
        productDetails: {
          ...state.productDetails,
          Producto: {
            ...state.productDetails.Producto,
            FechaDisponibilidadBackOrder: finalDate,
          },
        },
        fechaDisponibilidadBackOrderSelected: dateType,
      };
    },
  ),
  on(
    technicalCommercialInvestigationActions.SET_DATE_EXPIRATION_HEALTH_REGISTER,
    (state, {dateType, finalDate}) => ({
      ...state,
      productDetails: {
        ...state.productDetails,
        Producto: {
          ...state.productDetails.Producto,
          FechaCaducidadRegistroSanitario: finalDate,
        },
      },
      dateExpirationHealthRegister: dateType,
    }),
  ),
  on(
    technicalCommercialInvestigationActions.SET_SAVE_PRODUCT_FAMILY_TYPE_SUCCESS,
    (state, {payload}): ProductsDetails => {
      if (state.productDetails.TipoProductoClave === ENUM_PRODUCT_FAMILY_KEY.standards) {
        return {
          ...state,
          productDetails: {
            ...state.productDetails,
            ProductoEstandar: {
              ...state.productDetails.ProductoEstandar,
              IdProductoEstandar: state.productDetails.ProductoEstandar.IdProductoEstandar
                ? state.productDetails.ProductoEstandar.IdProductoEstandar
                : payload,
            },
          },
        };
      } else if (state.productDetails.TipoProductoClave === ENUM_PRODUCT_FAMILY_KEY.reactives) {
        return {
          ...state,
          productDetails: {
            ...state.productDetails,
            ProductoReactivo: {
              ...state.productDetails.ProductoReactivo,
              IdProductoReactivo: state.productDetails.ProductoReactivo.IdProductoReactivo
                ? state.productDetails.ProductoReactivo.IdProductoReactivo
                : payload,
            },
          },
        };
      } else if (state.productDetails.TipoProductoClave === ENUM_PRODUCT_FAMILY_KEY.labware) {
        return {
          ...state,
          productDetails: {
            ...state.productDetails,
            ProductoLabware: {
              ...state.productDetails.ProductoLabware,
              IdProductoLabware: state.productDetails.ProductoLabware.IdProductoLabware
                ? state.productDetails.ProductoLabware.IdProductoLabware
                : payload,
            },
          },
        };
      } else if (state.productDetails.TipoProductoClave === ENUM_PRODUCT_FAMILY_KEY.publications) {
        return {
          ...state,
          productDetails: {
            ...state.productDetails,
            ProductoPublicacion: {
              ...state.productDetails.ProductoPublicacion,
              IdProductoPublicacion: state.productDetails.ProductoPublicacion.IdProductoPublicacion
                ? state.productDetails.ProductoPublicacion.IdProductoPublicacion
                : payload,
            },
          },
        };
      } else if (state.productDetails.TipoProductoClave === ENUM_PRODUCT_FAMILY_KEY.medicalDevice) {
        return {
          ...state,
          productDetails: {
            ...state.productDetails,
            ProductoDispositivoMedico: {
              ...state.productDetails.ProductoDispositivoMedico,
              IdProductoDispositivoMedico: state.productDetails.ProductoDispositivoMedico
                .IdProductoDispositivoMedico
                ? state.productDetails.ProductoDispositivoMedico.IdProductoDispositivoMedico
                : payload,
            },
          },
        };
      } else if (state.productDetails.TipoProductoClave === ENUM_PRODUCT_FAMILY_KEY.trainings) {
        return {
          ...state,
          productDetails: {
            ...state.productDetails,
            ProductoCapacitacion: {
              ...state.productDetails.ProductoCapacitacion,
              IdProductoCapacitacion: state.productDetails.ProductoCapacitacion
                .IdProductoCapacitacion
                ? state.productDetails.ProductoCapacitacion.IdProductoCapacitacion
                : payload,
            },
          },
        };
      }
    },
  ),
  on(technicalCommercialInvestigationActions.SET_VALIDATE_CAS_SUCCESS, (state, {value}) => ({
    ...state,
    validateCas: value,
  })),
  on(
    technicalCommercialInvestigationActions.SET_SUPPLEMENTARY_PRODUCT_SUCCESS,
    (state, {payload}) => ({
      ...state,
      supplementaryProducts: payload,
    }),
  ),
  on(technicalCommercialInvestigationActions.SET_NEW_PRODUCT_FILE, (state, {node, newFile}) => ({
    ...state,
    technicalCommercialInvestigationFiles: {
      ...state.technicalCommercialInvestigationFiles,
      [node]: newFile,
    },
  })),
  on(technicalCommercialInvestigationActions.SET_NEW_SUPPLEMENTS_PRODUCTS, (state) => ({
    ...state,
    supplementaryProducts: [...state.supplementaryProducts, state.supplement],
    supplement: initialISupplements(),
  })),

  on(technicalCommercialInvestigationActions.SET_DELETE_SUPPLEMENT, (state, {payload}) => ({
    ...state,
    supplementaryProducts: filter(state.supplementaryProducts, (o) => o !== payload),
    supplementaryProductsToDelete: [
      ...state.supplementaryProductsToDelete,
      ...filter(state.supplementaryProducts, (o) => {
        return o === payload && o.IdProductoSuplementario !== DEFAULT_UUID;
      }),
    ],
  })),
  // DOCS Fin de la seccion del Reducer para  iNVESTIGACIÓN TéCNICO COMERCIAL

  // SECCION REGULACION Y RESTRICCION NO ARANCELARIAS
  on(productRegulationActions.SET_NEW_FILE, (state, {file, node}) => ({
    ...state,
    regulationFiles: {
      ...state.regulationFiles,
      [node]: file,
    },
  })),
  on(productRegulationActions.SET_PRODUCT_DATA, (state, {data, node}) => ({
    ...state,
    productDetails: {
      ...state.productDetails,
      Producto: {
        ...state.productDetails.Producto,
        [node]: data,
      },
      [node]: data,
    },
  })),
  on(
    productRegulationActions.SET_SELECTED_CLASSIFICATION,
    (state, {value}): ProductsDetails => {
      const type = state.productDetails.TipoProductoClave;
      if (type === ENUM_PRODUCT_FAMILY_KEY.standards) {
        return {
          ...state,
          productDetails: {
            ...state.productDetails,
            ProductoEstandar: {
              ...state.productDetails.ProductoEstandar,
              IdCatClasificacionRegulatoria: value.value.toString(),
            },
          },
        };
      }
      if (type === ENUM_PRODUCT_FAMILY_KEY.labware) {
        return {
          ...state,
          productDetails: {
            ...state.productDetails,
            ProductoLabware: {
              ...state.productDetails.ProductoLabware,
              IdCatClasificacionRegulatoria: value.value.toString(),
            },
          },
        };
      }
      if (type === ENUM_PRODUCT_FAMILY_KEY.reactives) {
        return {
          ...state,
          productDetails: {
            ...state.productDetails,
            ProductoReactivo: {
              ...state.productDetails.ProductoReactivo,
              IdCatClasificacionRegulatoria: value.value.toString(),
            },
          },
        };
      }
      /*      if (type === 'Dispositivo Medico') {
        return {
          ...state,
          productDetails: {
            ...state.productDetails,
            ProductoDispositivoMedico: {
              ...state.productDetails.ProductoDispositivoMedico,
              IdCatClasificacionRegulatoria: value.value,
            },
          },
        };
      }*/
    },
  ),
  on(
    productRegulationActions.SET_LETTER_REGULATORY,
    (state, {data}): ProductsDetails => {
      const type = state.productDetails.TipoProductoClave;
      if (type === ENUM_PRODUCT_FAMILY_KEY.standards) {
        return {
          ...state,
          productDetails: {
            ...state.productDetails,
            ProductoEstandar: {
              ...state.productDetails.ProductoEstandar,
              NotasRegulatoriasALaImportacion: data,
            },
          },
        };
      }
      if (type === ENUM_PRODUCT_FAMILY_KEY.labware) {
        return {
          ...state,
          productDetails: {
            ...state.productDetails,
            ProductoLabware: {
              ...state.productDetails.ProductoLabware,
              NotasRegulatoriasALaImportacion: data,
            },
          },
        };
      }
      if (type === ENUM_PRODUCT_FAMILY_KEY.reactives) {
        return {
          ...state,
          productDetails: {
            ...state.productDetails,
            ProductoReactivo: {
              ...state.productDetails.ProductoReactivo,
              NotasRegulatoriasALaImportacion: data,
            },
          },
        };
      }
      if (type === ENUM_PRODUCT_FAMILY_KEY.medicalDevice) {
        return {
          ...state,
          productDetails: {
            ...state.productDetails,
            ProductoDispositivoMedico: {
              ...state.productDetails.ProductoDispositivoMedico,
              NumeroDeRegistroSanitario: data,
            },
          },
        };
      }
    },
  ),
  on(productRegulationActions.SAVE_AVAILABLE_LETTER_SUCCESS, (state, {file}) => ({
    ...state,
    productDetails: {
      ...state.productDetails,
      ArchivoCartaDeDisponibilidad: file,
      IdArchivoCartaDeDisponibilidad: file.IdArchivo,
    },
  })),
  on(productRegulationActions.SAVE_USE_LETTER_SUCCESS, (state, {file}) => ({
    ...state,
    productDetails: {
      ...state.productDetails,
      ArchivoCartaDeUso: file,
      IdArchivoCartaDeUso: file.IdArchivo,
    },
  })),
  on(productRegulationActions.SAVE_ACQUISITION_IN_PLACE_SUCCESS, (state, {file}) => ({
    ...state,
    productDetails: {
      ...state.productDetails,
      ArchivoPermisoDeAdquisicionEnPlaza: file,
      IdArchivoPermisoDeAdquisicionEnPlaza: file.IdArchivo,
    },
  })),
  on(productRegulationActions.SAVE_IMPORT_LICENSE_SUCCESS, (state, {file}) => ({
    ...state,
    productDetails: {
      ...state.productDetails,
      ArchivoPermisoDeImprotacion: file,
      IdArchivoPermisoDeImprotacion: file.IdArchivo,
    },
  })),
  on(productRegulationActions.SAVE_ESSENTIAL_CHEMICALS_SUCCESS, (state, {file}) => ({
    ...state,
    productDetails: {
      ...state.productDetails,
      ArchivoAvisoDeQuimicosEsenciales: file,
      IdArchivoAvisoDeQuimicosEsenciales: file.IdArchivo,
    },
  })),
  on(productRegulationActions.SAVE_ZOOSANITARIE_SUCCESS, (state, {file}) => ({
    ...state,
    productDetails: {
      ...state.productDetails,
      ArchivoZoosanitarios: file,
      IdArchivoZoosanitarios: file.IdArchivo,
    },
  })),
  on(productRegulationActions.SAVE_CICLOPAFEST_SUCCESS, (state, {file}) => ({
    ...state,
    productDetails: {
      ...state.productDetails,
      ArchivoCicoplafest: file,
      IdArchivoCicoplafest: file.IdArchivo,
    },
  })),
  on(productRegulationActions.SAVE_OTHER_PERMISION_SUCCESS, (state, {file}) => ({
    ...state,
    productDetails: {
      ...state.productDetails,
      ArchivoOtroPermiso: file,
      IdArchivoOtroPermiso: file.IdArchivo,
    },
  })),
  on(productRegulationActions.SAVE_TYPE_CONFIGURATION_LOAD, (state, {typeName}) => {
    if (typeName === 'ProductoEstandar') {
      return {
        ...state,
        productDetails: {
          ...state.productDetails,
          ProductoEstandar: {
            ...state.productDetails.ProductoEstandar,
            IdArchivoCartaDeDisponibilidad: state.productDetails.IdArchivoCartaDeDisponibilidad,
            IdArchivoCartaDeUso: state.productDetails.IdArchivoCartaDeUso,
            IdArchivoPermisoDeAdquisicionEnPlaza:
              state.productDetails.IdArchivoPermisoDeAdquisicionEnPlaza,
            IdArchivoPermisoDeImprotacion: state.productDetails.IdArchivoPermisoDeImprotacion,
            IdArchivoAvisoDeQuimicosEsenciales:
              state.productDetails.IdArchivoAvisoDeQuimicosEsenciales,
            IdArchivoZoosanitarios: state.productDetails.IdArchivoZoosanitarios,
            IdArchivoCicoplafest: state.productDetails.IdArchivoCicoplafest,
            IdArchivoOtroPermiso: state.productDetails.IdArchivoOtroPermiso,
          },
        },
      };
    }
    if (typeName === 'ProductoLabware') {
      return {
        ...state,
        productDetails: {
          ...state.productDetails,
          ProductoLabware: {
            ...state.productDetails.ProductoLabware,
            IdArchivoCartaDeDisponibilidad: state.productDetails.IdArchivoCartaDeDisponibilidad,
            IdArchivoCartaDeUso: state.productDetails.IdArchivoCartaDeUso,
            IdArchivoPermisoDeAdquisicionEnPlaza:
              state.productDetails.IdArchivoPermisoDeAdquisicionEnPlaza,
            IdArchivoPermisoDeImprotacion: state.productDetails.IdArchivoPermisoDeImprotacion,
            IdArchivoAvisoDeQuimicosEsenciales:
              state.productDetails.IdArchivoAvisoDeQuimicosEsenciales,
            IdArchivoZoosanitarios: state.productDetails.IdArchivoZoosanitarios,
            IdArchivoCicoplafest: state.productDetails.IdArchivoCicoplafest,
            IdArchivoOtroPermiso: state.productDetails.IdArchivoOtroPermiso,
          },
        },
      };
    }
    if (typeName === 'ProductoReactivo') {
      return {
        ...state,
        productDetails: {
          ...state.productDetails,
          ProductoReactivo: {
            ...state.productDetails.ProductoReactivo,
            IdArchivoCartaDeDisponibilidad: state.productDetails.IdArchivoCartaDeDisponibilidad,
            IdArchivoCartaDeUso: state.productDetails.IdArchivoCartaDeUso,
            IdArchivoPermisoDeAdquisicionEnPlaza:
              state.productDetails.IdArchivoPermisoDeAdquisicionEnPlaza,
            IdArchivoPermisoDeImprotacion: state.productDetails.IdArchivoPermisoDeImprotacion,
            IdArchivoAvisoDeQuimicosEsenciales:
              state.productDetails.IdArchivoAvisoDeQuimicosEsenciales,
            IdArchivoZoosanitarios: state.productDetails.IdArchivoZoosanitarios,
            IdArchivoCicoplafest: state.productDetails.IdArchivoCicoplafest,
            IdArchivoOtroPermiso: state.productDetails.IdArchivoOtroPermiso,
          },
        },
      };
    }
  }),
  on(productRegulationActions.SET_LABWARE_DATA, (state, {data}) => ({
    ...state,
    productDetails: {
      ...state.productDetails,
      ProductoLabware: {
        ...state.productDetails.ProductoLabware,
        NumeroDeRegistroSanitario: data,
      },
    },
  })),
  on(productRegulationActions.SET_DATE, (state, {date, dateFormat}) => ({
    ...state,
    productDetails: {
      ...state.productDetails,
      Producto: {
        ...state.productDetails.Producto,
        FechaCaducidadRegistroSanitario: date,
      },
    },
  })),
  on(productRegulationActions.SAVE_TYPE_CONFIGURATION_SUCCESS, (state) => ({
    ...state,
    regulationFiles: {
      ArchivoCartaDeDisponibilidad: null,
      ArchivoCartaDeUso: null,
      ArchivoPermisoDeAdquisicionEnPlaza: null,
      ArchivoPermisoDeImprotacion: null,
      ArchivoAvisoDeQuimicosEsenciales: null,
      ArchivoZoosanitarios: null,
      ArchivoCicoplafest: null,
      ArchivoOtroPermiso: null,
    },
  })),

  // SECCION LOGISTICA
  on(
    productLogisticActions.SET_RADIOBUTTON,
    (state, {option}): ProductsDetails => {
      if (state.productDetails.TipoProductoClave === ENUM_PRODUCT_FAMILY_KEY.medicalDevice) {
        return {
          ...state,
          productDetails: {
            ...state.productDetails,
            ProductoDispositivoMedico: {
              ...state.productDetails.ProductoDispositivoMedico,
              AELC: option.label === 'AELC',
              TLCUE: option.label === 'TLCUE',
              USMCA: option.label === 'USMCA',
              TMEC: option.label === 'TMEC',
            },
          },
        };
      }
      if (state.productDetails.TipoProductoClave === ENUM_PRODUCT_FAMILY_KEY.standards) {
        return {
          ...state,
          productDetails: {
            ...state.productDetails,
            ProductoEstandar: {
              ...state.productDetails.ProductoEstandar,
              AELC: option.label === 'AELC',
              TLCUE: option.label === 'TLCUE',
              USMCA: option.label === 'USMCA',
              TMEC: option.label === 'TMEC',
            },
          },
        };
      }
      if (state.productDetails.TipoProductoClave === ENUM_PRODUCT_FAMILY_KEY.reactives) {
        return {
          ...state,
          productDetails: {
            ...state.productDetails,
            ProductoReactivo: {
              ...state.productDetails.ProductoReactivo,
              AELC: option.label === 'AELC',
              TLCUE: option.label === 'TLCUE',
              USMCA: option.label === 'USMCA',
              TMEC: option.label === 'TMEC',
            },
          },
        };
      }
      if (state.productDetails.TipoProductoClave === ENUM_PRODUCT_FAMILY_KEY.labware) {
        return {
          ...state,
          productDetails: {
            ...state.productDetails,
            ProductoLabware: {
              ...state.productDetails.ProductoLabware,
              AELC: option.label === 'AELC',
              TLCUE: option.label === 'TLCUE',
              USMCA: option.label === 'USMCA',
              TMEC: option.label === 'TMEC',
            },
          },
        };
      }
    },
  ),
  on(productLogisticActions.SET_NEW_PRODUCT_FILE, (state, {newFile, node}) => ({
    ...state,
    logisticFiles: {
      ...state.logisticFiles,
      [node]: newFile,
    },
  })),
  on(
    productLogisticActions.ADD_OTHER_FILE,
    (state, {file}): ProductsDetails => ({
      ...state,
      logisticFiles: {
        ...state.logisticFiles,
        OtrosTratados: [...state.logisticFiles.OtrosTratados, file],
      },
    }),
  ),
  on(
    productLogisticActions.SET_DROP_OPTION,
    (state, {option}): ProductsDetails => {
      if (state.productDetails.TipoProductoClave === ENUM_PRODUCT_FAMILY_KEY.medicalDevice) {
        return {
          ...state,
          productDetails: {
            ...state.productDetails,
            ProductoDispositivoMedico: {
              ...state.productDetails.ProductoDispositivoMedico,
              IdCatRestriccionFlete: option.value,
            },
          },
          restrictionFreightSelected: option,
        };
      }
      if (state.productDetails.TipoProductoClave === ENUM_PRODUCT_FAMILY_KEY.standards) {
        return {
          ...state,
          productDetails: {
            ...state.productDetails,
            ProductoEstandar: {
              ...state.productDetails.ProductoEstandar,
              IdCatRestriccionFlete: option.value,
            },
          },
          restrictionFreightSelected: option,
        };
      }
      if (state.productDetails.TipoProductoClave === ENUM_PRODUCT_FAMILY_KEY.reactives) {
        return {
          ...state,
          productDetails: {
            ...state.productDetails,
            ProductoReactivo: {
              ...state.productDetails.ProductoReactivo,
              IdCatRestriccionFlete: option.value,
            },
          },
          restrictionFreightSelected: option,
        };
      }
      if (state.productDetails.TipoProductoClave === ENUM_PRODUCT_FAMILY_KEY.labware) {
        return {
          ...state,
          productDetails: {
            ...state.productDetails,
            ProductoLabware: {
              ...state.productDetails.ProductoLabware,
              IdCatRestriccionFlete: option.value,
            },
          },
          restrictionFreightSelected: option,
        };
      }
      if (state.productDetails.TipoProductoClave === ENUM_PRODUCT_FAMILY_KEY.publications) {
        return {
          ...state,
          productDetails: {
            ...state.productDetails,
            ProductoPublicacion: {
              ...state.productDetails.ProductoPublicacion,
              IdCatRestriccionFlete: option.value,
            },
          },
          restrictionFreightSelected: option,
        };
      }
    },
  ),
  on(productLogisticActions.FETCH_CUSTOM_AGENT_SUCCESS, (state, {customAgenteData}) => ({
    ...state,
    customAgent: customAgenteData,
  })),
  on(productLogisticActions.SET_OTHER_FILE_TO_DELETE, (state, {index, IdArchivoTratadosOtros}) => {
    if (index !== null) {
      const newList: Array<ArchivoTratadosOtrosDetalle | File> = [
        ...state.productDetails.OtrosTratados,
        ...state.logisticFiles.OtrosTratados,
      ];
      const resultList = [];
      forEach(newList, (o: ArchivoTratadosOtrosDetalle | File, i) => {
        // @ts-ignore
        if (o.name) {
          if (i !== index) {
            return resultList.push(o);
          }
        }
      });
      return {
        ...state,
        logisticFiles: {
          ...state.logisticFiles,
          OtrosTratados: resultList,
        },
      };
    }
    if (IdArchivoTratadosOtros !== null) {
      return {
        ...state,
        productDetails: {
          ...state.productDetails,
          OtrosTratados: filter(
            state.productDetails.OtrosTratados,
            (o: ArchivoTratadosOtrosDetalle) => o.IdArchivoTratadosOtros !== IdArchivoTratadosOtros,
          ),
        },
        filesToDelete: [...state.filesToDelete, IdArchivoTratadosOtros],
      };
    }
  }),
  on(productLogisticActions.SAVE_CERTIFICATE_FILE_SUCCESS, (state, {file}) => ({
    ...state,
    productDetails: {
      ...state.productDetails,
      Producto: {
        ...state.productDetails.Producto,
        IdArchivoCertificado: file.IdArchivo,
      },
      IdArchivoCertificado: file.IdArchivo,
      ArchivoCertificadoLote: file,
    },
  })),
  on(
    productLogisticActions.SAVE_SECURITY_FILE_SUCCESS,
    (state, {file}): ProductsDetails => ({
      ...state,
      productDetails: {
        ...state.productDetails,
        ArchivoHojaSeguridad: file,
        IdArchivoHojaSeguridad: file.IdArchivo,
      },
    }),
  ),
  on(productLogisticActions.SAVE_DATASHEET_SUCCESS, (state, {file}) => ({
    ...state,
    productDetails: {
      ...state.productDetails,
      ArchivoFichaTecnica: file,
      IdArchivoFichaTecnica: file.IdArchivo,
    },
  })),
  on(productLogisticActions.SAVE_TREATY_FILE_SUCCESS, (state, {file}) => ({
    ...state,
    productDetails: {
      ...state.productDetails,
      ArchivoTratado: file,
      IdArchivoTratado: file.IdArchivo,
    },
  })),
  on(productLogisticActions.SAVE_TREATY_LIST_SUCCESS, (state, {list}) => ({
    ...state,
    productDetails: {
      ...state.productDetails,
      OtrosTratados: [...state.productDetails.OtrosTratados, ...list],
    },
  })),
  on(
    productLogisticActions.SAVE_PRODUCT_CONFIG_LOAD,
    (state, {typeName}): ProductsDetails => ({
      ...state,
      productDetails: {
        ...state.productDetails,
        [typeName]: {
          ...state.productDetails[typeName],
          IdArchivoHojaSeguridad: state.productDetails.IdArchivoHojaSeguridad,
          IdArchivoFichaTecnica: state.productDetails.IdArchivoFichaTecnica,
          IdArchivoTratado: state.productDetails.IdArchivoTratado,
        },
      },
    }),
  ),
  on(
    productLogisticActions.SAVE_PRODUCT_CONFIG_SUCCESS,
    (state): ProductsDetails => ({
      ...state,
      logisticFiles: {
        ArchivoHojaSeguridad: null,
        ArchivoCertificadoLote: null,
        ArchivoFichaTecnica: null,
        ArchivoTratado: null,
        OtrosTratados: [],
      },
      filesToDelete: [],
    }),
  ),
  // REDUCER DE VINCULACIONES
  on(productLinkedActions.CLEAN_PRODUCTS_LINKED, (state) => ({
    ...state,
    linkedProducts: initialILinkedProducts(),
  })),
  on(productLinkedActions.FETCH_ALTERNATIVE_PRODUCTS_SUCCESS, (state, {alternatives}) => ({
    ...state,
    productDetails: {
      ...state.productDetails,
      vProductoAlternativo: alternatives,
    },
  })),
  on(
    productLinkedActions.FETCH_COMPLEMENTARIES_PRODUCTS_SUCCESS,
    (state, {complementaries}): ProductsDetails => ({
      ...state,
      productDetails: {
        ...state.productDetails,
        vProductoComplementario: complementaries,
      },
      linkedProducts: {
        ...state.linkedProducts,
        needsToReloadLinkeds: false,
      },
    }),
  ),
  on(productLinkedActions.SET_SELECTED_TAB_OPTION, (state, {tabOptionSelected}) => ({
    ...state,
    linkedProducts: {
      ...initialILinkedProducts(),
      tabSelected: tabOptionSelected,
    },
  })),
  on(productLinkedActions.SET_SEARCH_TERM, (state, {searchTerm}) => ({
    ...state,
    linkedProducts: {
      ...state.linkedProducts,
      searchTerm,
    },
  })),
  on(productLinkedActions.FETCH_OPTIONS_OF_PRODUCTS_LOAD, (state) => ({
    ...state,
    linkedProducts: {
      ...state.linkedProducts,
      optionsOfProductsStatus:
        state.linkedProducts.searchTerm.trim() !== ''
          ? API_REQUEST_STATUS_LOADING
          : state.linkedProducts.optionsOfProductsStatus,
    },
  })),
  on(productLinkedActions.FETCH_OPTIONS_OF_PRODUCTS_SUCCESS, (state, {products}) => ({
    ...state,
    linkedProducts: {
      ...state.linkedProducts,
      optionsOfProducts: products,
      optionsOfProductsStatus: API_REQUEST_STATUS_SUCCEEDED,
    },
  })),
  on(productLinkedActions.SET_SELECTED_SEARCH_OPTION, (state, {option}) => ({
    ...state,
    linkedProducts: {
      ...state.linkedProducts,
      optionOfProductSelected: option,
    },
  })),
  on(productLinkedActions.CLEAN_SEARCH_FILTER, (state) => ({
    ...state,
    linkedProducts: {
      ...state.linkedProducts,
      optionsOfProductsStatus: API_REQUEST_STATUS_DEFAULT,
      optionsOfProducts: [],
      searchTerm: '',
      optionOfProductSelected: null,
    },
  })),
  on(productLinkedActions.SET_SELECTED_SEARCH_TYPE, (state, {searchTypeSelected}) => ({
    ...state,
    linkedProducts: {
      ...state.linkedProducts,
      selectedTypeOfSearch: searchTypeSelected,
      optionsOfProductsStatus: API_REQUEST_STATUS_DEFAULT,
      optionsOfProducts: [],
      optionOfProductSelected: null,
    },
  })),
  on(
    productLinkedActions.FETCH_PRODUCTS_LOAD,
    (state, {isFirstPage}): ProductsDetails => ({
      ...state,
      linkedProducts: {
        ...state.linkedProducts,
        queryInfo: {
          ...state.linkedProducts.queryInfo,
          desiredPage: isFirstPage ? 1 : state.linkedProducts.queryInfo.desiredPage + 1,
        },
        productsListStatus: API_REQUEST_STATUS_LOADING,
      },
    }),
  ),
  on(
    productLinkedActions.FETCH_PRODUCTS_SUCCESS,
    (state, {list, totalResults}): ProductsDetails => {
      let results = list;
      if (state.linkedProducts.tabSelected.id === '1') {
        if (state.productDetails.vProductoAlternativo.length > 0) {
          const res = map(list, (o: Producto) => {
            if (
              find(
                state.productDetails.vProductoAlternativo,
                (p: IVProductoAlternativo): boolean => p.IdProducto === o.IdProducto,
              )
            ) {
              return {
                ...o,
                Activo: false,
              };
            }
            return o;
          });
          results = res;
        }
      } else {
        if (state.productDetails.vProductoComplementario.length > 0) {
          const res = map(list, (o: Producto) => {
            if (
              find(
                state.productDetails.vProductoComplementario,
                (p: IVProductoComplementario): boolean => p.IdProducto === o.IdProducto,
              )
            ) {
              return {
                ...o,
                Activo: false,
              };
            }
            return o;
          });
          results = res;
        }
      }
      return {
        ...state,
        linkedProducts: {
          ...state.linkedProducts,
          productsList:
            state.linkedProducts.queryInfo.desiredPage === 1
              ? [...results]
              : [...state.linkedProducts.productsList, ...results],
          totalProductResults: totalResults,
          productsListStatus: API_REQUEST_STATUS_SUCCEEDED,
        },
      };
    },
  ),
  on(productLinkedActions.SAVE_PRODUCT_ALTERNATIVE_SUCCESS, (state, {product, IdProducto}) => ({
    ...state,
    productDetails: {
      ...state.productDetails,
      vProductoAlternativo: [...state.productDetails.vProductoAlternativo, product],
    },
    linkedProducts: {
      ...state.linkedProducts,
      productsList: map(state.linkedProducts.productsList, (o) => {
        if (o.IdProducto === IdProducto) {
          return {
            ...o,
            Activo: false,
          };
        }
        return o;
      }),
    },
  })),
  on(productLinkedActions.SAVE_PRODUCT_COMPLEMENTARY_SUCCESS, (state, {product, IdProducto}) => ({
    ...state,
    productDetails: {
      ...state.productDetails,
      vProductoComplementario: [...state.productDetails.vProductoComplementario, product],
    },
    linkedProducts: {
      ...state.linkedProducts,
      productsList: map(state.linkedProducts.productsList, (o) => {
        if (o.IdProducto === IdProducto) {
          return {
            ...o,
            Activo: false,
          };
        }
        return o;
      }),
    },
  })),
  on(productLinkedActions.DISABLE_ALTERNATIVE_SUCCESS, (state, {response, IdProducto}) => ({
    ...state,
    productDetails: {
      ...state.productDetails,
      vProductoAlternativo: filter(
        state.productDetails.vProductoAlternativo,
        (o: IVProductoAlternativo) => o.IdProductoAlternativoRelacion !== response,
      ),
    },
    linkedProducts: {
      ...state.linkedProducts,
      productsList: map(state.linkedProducts.productsList, (o) => {
        if (o.IdProducto === IdProducto) {
          return {
            ...o,
            Activo: true,
          };
        }
        return o;
      }),
    },
  })),
  on(productLinkedActions.DISABLE_COMPLEMENTARY_SUCCESS, (state, {response, IdProducto}) => ({
    ...state,
    productDetails: {
      ...state.productDetails,
      vProductoComplementario: filter(
        state.productDetails.vProductoComplementario,
        (o: IVProductoComplementario) => o.IdProductoComplementarioRelacion !== response,
      ),
    },
    linkedProducts: {
      ...state.linkedProducts,
      productsList: map(state.linkedProducts.productsList, (o) => {
        if (o.IdProducto === IdProducto) {
          return {
            ...o,
            Activo: true,
          };
        }
        return o;
      }),
    },
  })),
);
