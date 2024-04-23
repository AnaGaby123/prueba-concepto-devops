import {createReducer, on} from '@ngrx/store';
import {
  initialIRegulatoryResearchDetails,
  IRegulatoryResearchDetailsState,
} from '@appModels/store/pendings/new-product-existing-supplier/regulatory-research/regulatory-research-details/regulatory-research-details.models';
import {
  regulatoryResearchDashboardActions,
  regulatoryResearchDetailsActions,
} from '@appActions/pendings/new-product-existing-supplier/regulatory-research';
import {getSetterProduct} from '@appHelpers/pending/new-product-existing-supplier/regulatory-research.helpers';
import {VProductoSuplementario} from 'api-catalogos';
import {DEFAULT_UUID} from '@appUtil/common.protocols';
import {IPqfTabOption} from '@appModels/shared-components/pqf-tab-options';
import {initialISupplements} from '@appModels/store/forms/product-form/products-details-form/product-details.model';

export const regulatoryResearchDetailsReducer = createReducer(
  initialIRegulatoryResearchDetails(),
  on(
    regulatoryResearchDetailsActions.SET_SEARCH_TERM,
    (state: IRegulatoryResearchDetailsState, {searchTerm}): IRegulatoryResearchDetailsState => ({
      ...state,
      searchTerm,
    }),
  ),
  on(
    regulatoryResearchDetailsActions.SET_FILTER_OPTIONS,
    (state: IRegulatoryResearchDetailsState, {filterOptions}): IRegulatoryResearchDetailsState => ({
      ...state,
      filterOptions,
    }),
  ),
  on(
    regulatoryResearchDetailsActions.SET_TAB_OPTIONS,
    (state: IRegulatoryResearchDetailsState, {tabOptions}): IRegulatoryResearchDetailsState => ({
      ...state,
      tabOptions,
    }),
  ),
  on(
    regulatoryResearchDetailsActions.RESET_DETAILS_STATE,
    (state: IRegulatoryResearchDetailsState): IRegulatoryResearchDetailsState => ({
      ...initialIRegulatoryResearchDetails(),
    }),
  ),
  on(
    regulatoryResearchDetailsActions.RESET_INFORMATION_PRODUCT,
    (
      state: IRegulatoryResearchDetailsState,
      {nodeRootBefore, nodeRootAfter, hasRestrictionsAndRegularizations},
    ): IRegulatoryResearchDetailsState => {
      const nodeBefore = state.selectedProduct.productDetails[nodeRootBefore];
      const nodeAfter = state.selectedProduct.productDetails[nodeRootAfter];
      const getValue = (key) => {
        if (nodeAfter && nodeAfter[key]) {
          return nodeAfter[key];
        }
        if (nodeBefore && nodeBefore[key]) {
          return nodeBefore[key];
        }
        return null;
      };
      return {
        ...state,
        tabOptions: state.tabOptions.map((it) => {
          const newTab: IPqfTabOption = {...it};
          if (newTab?.id === '2') {
            newTab.enable = hasRestrictionsAndRegularizations;
          }
          return newTab;
        }),
        selectedProduct: {
          ...state.selectedProduct,
          productDetails: {
            ...state.selectedProduct.productDetails,
            [nodeRootAfter]: {...getSetterProduct(nodeRootAfter, getValue)},
            IdCatDisponibilidad:
              nodeRootAfter === 'ProductoCapacitacion'
                ? null
                : state.selectedProduct.productDetails.IdCatDisponibilidad,
          },
        },
      };
    },
  ),
  on(
    regulatoryResearchDashboardActions.HANDLE_SET_SELECTED_PROVIDER,
    (state: IRegulatoryResearchDetailsState, {item}): IRegulatoryResearchDetailsState => ({
      ...state,
      selectedProvider: item,
    }),
  ),
  on(
    regulatoryResearchDetailsActions.FETCH_FAMILIES_LIST_SUCCESS,
    (state: IRegulatoryResearchDetailsState, {productList}): IRegulatoryResearchDetailsState => ({
      ...state,
      productList,
      selectedProduct: productList[0],
    }),
  ),
  on(
    regulatoryResearchDetailsActions.FETCH_SELECTED_PRODUCT_DETAILS_SUCCESS,
    (state: IRegulatoryResearchDetailsState, {productDetails}): IRegulatoryResearchDetailsState => {
      return {
        ...state,
        selectedProduct: {
          ...state.selectedProduct,
          productDetails: productDetails,
          productDetailsBackUp: productDetails,
          technicalSection: {
            ...state?.selectedProduct?.technicalSection,
            supplementaryProducts:
              productDetails.vProductoSuplementarios.length > 0
                ? productDetails.vProductoSuplementarios.map((it) => {
                    const vProductoSuplementario: VProductoSuplementario = {
                      ...it,
                    };
                    return vProductoSuplementario;
                  })
                : [],
          },
          brandImage: `assets/Images/logos/${
            productDetails.NombreImagenMarca || 'default'
          }_hover.svg`,
          imagePresentation: `assets/Images/products/${
            productDetails.TipoPresentacionClave || 'default'
          }.svg`,
        },
      };
    },
  ),
  on(
    regulatoryResearchDetailsActions.FETCH_PRODUCT_CLASSIFICATIONS_SUCCESS,
    (
      state: IRegulatoryResearchDetailsState,
      {classificationList},
    ): IRegulatoryResearchDetailsState => ({
      ...state,
      selectedProduct: {
        ...state.selectedProduct,
        technicalSection: {
          ...state?.selectedProduct?.technicalSection,
          classificationList,
          selectedClasificationInformativa: classificationList.find(
            (it) =>
              it.id ===
              state?.selectedProduct?.productDetails?.Producto
                ?.IdCatClasificacionInformativaProducto,
          ),
        },
      },
    }),
  ),
  on(
    regulatoryResearchDetailsActions.FETCH_PRODUCT_FAMILIES_SUCCESS,
    (
      state: IRegulatoryResearchDetailsState,
      {familiesList, hasRestrictionsAndRegularizations, familyBrandList},
    ): IRegulatoryResearchDetailsState => {
      return {
        ...state,
        tabOptions: state.tabOptions.map((it) => {
          const newTab: IPqfTabOption = {...it};
          if (newTab?.id === '2') {
            newTab.enable = hasRestrictionsAndRegularizations;
          }
          return newTab;
        }),
        selectedProduct: {
          ...state.selectedProduct,
          technicalSection: {
            ...state?.selectedProduct?.technicalSection,
            familiesList: familiesList,
            familyBrandList,
          },
        },
      };
    },
  ),
  on(
    regulatoryResearchDetailsActions.SET_CHANGE_SELECT_PROPERTY_PRODUCT,
    (
      state: IRegulatoryResearchDetailsState,
      {property, dropListOptionPqf},
    ): IRegulatoryResearchDetailsState => {
      const caseIdMarcaFamilia = () => {
        return {
          ...state,
          selectedProduct: {
            ...state.selectedProduct,
            technicalSection: {
              ...state?.selectedProduct?.technicalSection,
            },
            productDetails: {
              ...state.selectedProduct.productDetails,
              IdMarcaFamilia: dropListOptionPqf.id,
            },
          },
        };
      };
      const caseCatUnidad = () => {
        return {
          ...state,
          selectedProduct: {
            ...state.selectedProduct,
            productDetails: {
              ...state.selectedProduct.productDetails,
              IdCatUnidad: dropListOptionPqf.id,
            },
          },
        };
      };
      const caseCatClasificacionInformativaProducto = () => {
        return {
          ...state,
          selectedProduct: {
            ...state.selectedProduct,
            technicalSection: {
              ...state?.selectedProduct?.technicalSection,
              selectedClasificationInformativa: dropListOptionPqf,
            },
          },
        };
      };

      const caseAgrupadorCaracteristica = () => {
        return {
          ...state,
          selectedProduct: {
            ...state.selectedProduct,
            productDetails: {
              ...state.selectedProduct.productDetails,
              IdAgrupadorCaracteristica: dropListOptionPqf.id,
            },
          },
        };
      };
      const caseCatDisponibilidad = () => {
        return {
          ...state,
          selectedProduct: {
            ...state.selectedProduct,
            productDetails: {
              ...state.selectedProduct.productDetails,
              IdCatDisponibilidad: dropListOptionPqf.id,
            },
          },
        };
      };
      const caseCatRestriccionDeCompra = () => {
        return {
          ...state,
          selectedProduct: {
            ...state.selectedProduct,
            productDetails: {
              ...state.selectedProduct.productDetails,
              ProductoEstandar: {
                ...state.selectedProduct.productDetails.ProductoEstandar,
                IdCatRestriccionDeCompra: dropListOptionPqf.id,
              },
            },
          },
        };
      };
      switch (property) {
        case 'IdMarcaFamilia':
          return caseIdMarcaFamilia();
          break;
        case 'IdCatUnidad':
          return caseCatUnidad();
          break;
        case 'IdCatClasificacionInformativaProducto':
          return caseCatClasificacionInformativaProducto();
          break;
        case 'IdAgrupadorCaracteristica':
          return caseAgrupadorCaracteristica();
          break;
        case 'IdCatDisponibilidad':
          return caseCatDisponibilidad();
          break;
        case 'IdCatRestriccionDeCompra':
          return caseCatRestriccionDeCompra();
          break;
        default:
          return {...state};
          break;
      }
    },
  ),
  on(
    regulatoryResearchDetailsActions.SET_CHANGE_INPUT_PROPERTY_PRODUCT_DETAILS,
    (state: IRegulatoryResearchDetailsState, {key, value}): IRegulatoryResearchDetailsState => {
      return {
        ...state,
        selectedProduct: {
          ...state.selectedProduct,
          productDetails: {
            ...state.selectedProduct.productDetails,
            [key]: value,
          },
        },
      };
    },
  ),
  on(
    regulatoryResearchDetailsActions.CHANGE_NODE_DETAILS,
    (
      state: IRegulatoryResearchDetailsState,
      {key, value, node},
    ): IRegulatoryResearchDetailsState => {
      return {
        ...state,
        selectedProduct: {
          ...state.selectedProduct,
          productDetails: {
            ...state.selectedProduct.productDetails,
            [node]: {
              ...state.selectedProduct.productDetails[node],
              [key]: value,
            },
          },
        },
      };
    },
  ),
  on(regulatoryResearchDetailsActions.SET_VALIDATE_CAS_SUCCESS, (state, {value}) => ({
    ...state,
    selectedProduct: {
      ...state.selectedProduct,
      casValid: value,
    },
  })),
  on(
    regulatoryResearchDetailsActions.SET_CHANGE_SELECT_PROPERTY_PRODUCT_BRAND_FAMILY,
    (
      state: IRegulatoryResearchDetailsState,
      {property, dropListOptionPqf},
    ): IRegulatoryResearchDetailsState => {
      return {
        ...state,
        selectedProduct: {
          ...state.selectedProduct,
          productDetails: {
            ...state.selectedProduct.productDetails,
            IdMarcaFamilia: dropListOptionPqf.id,
            Producto: {
              ...state.selectedProduct.productDetails.Producto,
              IdMarcaFamilia: dropListOptionPqf.id,
            },
          },
          technicalSection: {
            ...state.selectedProduct.technicalSection,
            supplement: initialISupplements(),
          },
        },
      };
    },
  ),
  on(
    regulatoryResearchDetailsActions.FETCH_PRODUCT_GROUP_CHARACTERISTICS_SUCCESS,
    (state: IRegulatoryResearchDetailsState, {groupCharacteristic}) => {
      return {
        ...state,
        selectedProduct: {
          productDetails: {
            ...state.selectedProduct.productDetails,
            IdMarcaFamilia: state.selectedProduct.productDetails.IdMarcaFamilia,
          },
          ...state.selectedProduct,
          technicalSection: {
            ...state?.selectedProduct?.technicalSection,
            groupCharacteristic: groupCharacteristic,
          },
        },
      };
    },
  ),
  on(
    regulatoryResearchDetailsActions.SET_INITIAL_DATA_CONFIGURATION,
    (state: IRegulatoryResearchDetailsState, {nodeRoot, familySelected}) => {
      return {
        ...state,
        selectedProduct: {
          ...state.selectedProduct,
          productDetails: {
            ...state.selectedProduct.productDetails,
            ProductoEstandar: null,
            ProductoPublicacion: null,
            ProductoReactivo: null,
            ProductoLabware: null,
            Subtipo: familySelected.Subtipo,
            IdCatSubtipoProducto: familySelected.IdCatSubtipoProducto,
            Control: familySelected.Control,
            IdCatControl: familySelected.IdCatControl,
          },
          technicalSection: {
            ...state?.selectedProduct?.technicalSection,
            supplement: initialISupplements(),
          },
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
    },
  ),
  on(regulatoryResearchDetailsActions.SET_DATE_VALIDITY_CURATORSHIP, (state, {stringDate, key}) => {
    return {
      ...state,
      selectedProduct: {
        ...state.selectedProduct,
        productDetails: {
          ...state.selectedProduct.productDetails,
          Producto: {
            ...state.selectedProduct.productDetails.Producto,
            [key.trim()]: stringDate,
          },
        },
      },
    };
  }),
  on(regulatoryResearchDetailsActions.SET_DATE_BACK_ORDER, (state, {stringDate, key}) => {
    return {
      ...state,
      selectedProduct: {
        ...state.selectedProduct,
        productDetails: {
          ...state.selectedProduct.productDetails,
          Producto: {
            ...state.selectedProduct.productDetails.Producto,
            [key.trim()]: stringDate,
          },
        },
      },
    };
  }),
  on(regulatoryResearchDetailsActions.SET_NEW_PRODUCT_FILE, (state, {node, newFile}) => ({
    ...state,
    selectedProduct: {
      ...state.selectedProduct,
      technicalSection: {
        ...state?.selectedProduct?.technicalSection,
        [node]: newFile,
      },
    },
  })),
  on(regulatoryResearchDetailsActions.SET_NODE_SUPPLEMENTARY, (state, {key, value}) => ({
    ...state,
    selectedProduct: {
      ...state.selectedProduct,
      technicalSection: {
        ...state?.selectedProduct?.technicalSection,
        supplement: {
          ...state.selectedProduct.technicalSection.supplement,
          [key]: value,
        },
      },
    },
  })),
  on(
    regulatoryResearchDetailsActions.SET_SUPLEMENTARY_TO_LIST_PRODUCT,
    (state, {supplementary}) => {
      const vProductoSuplementario: VProductoSuplementario = {
        ...state.selectedProduct.productDetails.Producto,
        ...supplementary,
        IdProductoSuplementario: DEFAULT_UUID,
      };
      return {
        ...state,
        selectedProduct: {
          ...state.selectedProduct,
          technicalSection: {
            ...state?.selectedProduct?.technicalSection,
            supplementaryProducts: state.selectedProduct.technicalSection.supplementaryProducts
              ? [
                  ...state.selectedProduct.technicalSection.supplementaryProducts,
                  vProductoSuplementario,
                ]
              : [vProductoSuplementario],
            supplement: {
              ...state.selectedProduct.technicalSection.supplement,
              Descripcion: null,
              ISBN: null,
              Editorial: null,
              Edicion: null,
            },
          },
        },
      };
    },
  ),
  on(regulatoryResearchDetailsActions.REMOVE_SUPLEMENTARY, (state, {index}) => {
    // DOCS: Caso para eliminar un producto suplementario creado
    const supplementaryList: VProductoSuplementario[] =
      state.selectedProduct.technicalSection.supplementaryProducts;
    const arraySupplementary: VProductoSuplementario[] =
      supplementaryList.length > 0
        ? supplementaryList.filter((it, indx) => {
            return indx !== index;
          })
        : [];
    // DOCS: Caso para eliminar un producto suplementario que venga de la BD
    const supplementaryListDeleted: VProductoSuplementario[] = state.selectedProduct
      ?.technicalSection?.supplementaryProductsToDelete
      ? state.selectedProduct?.technicalSection?.supplementaryProductsToDelete
      : [];
    const supplementaryToDelete: VProductoSuplementario =
      supplementaryList[index] &&
      supplementaryList[index].IdProducto &&
      supplementaryList[index].IdProducto !== DEFAULT_UUID
        ? supplementaryList[index]
        : null;
    const arraySupplementaryToDelete: VProductoSuplementario[] = supplementaryToDelete
      ? [...supplementaryListDeleted, supplementaryToDelete]
      : [supplementaryToDelete];
    return {
      ...state,
      selectedProduct: {
        ...state.selectedProduct,
        technicalSection: {
          ...state?.selectedProduct?.technicalSection,
          supplementaryProducts: arraySupplementary,
          supplementaryProductsToDelete: arraySupplementaryToDelete,
        },
      },
    };
  }),
  on(
    regulatoryResearchDetailsActions.RESTORE_BACK_UP_PRODUCT,
    (state: IRegulatoryResearchDetailsState) => {
      return {
        ...state,
        selectedProduct: {
          ...state.selectedProduct,
          productDetails: {
            ...state.selectedProduct.productDetailsBackUp,
          },
        },
      };
    },
  ),
  on(regulatoryResearchDetailsActions.SET_DATE, (state, {date, dateFormat}) => ({
    ...state,
    selectedProduct: {
      ...state.selectedProduct,
      productDetails: {
        ...state.selectedProduct.productDetails,
        Producto: {
          ...state.selectedProduct.productDetails.Producto,
          FechaCaducidadRegistroSanitario: date,
        },
      },
    },
  })),
  on(
    regulatoryResearchDetailsActions.CHANGE_NODE_DETAILS_PRODUCT_DETAILS,
    (state, {node, newFile}) => ({
      ...state,
      selectedProduct: {
        ...state.selectedProduct,
        [node]: newFile,
      },
    }),
  ),
  on(regulatoryResearchDetailsActions.SAVE_AVAILABLE_LETTER_SUCCESS, (state, {file}) => ({
    ...state,
    selectedProduct: {
      ...state.selectedProduct,
      productDetails: {
        ...state.selectedProduct.productDetails,
        ArchivoCartaDeDisponibilidad: file,
        IdArchivoCartaDeDisponibilidad: file.IdArchivo,
      },
    },
  })),
  on(regulatoryResearchDetailsActions.SAVE_USE_LETTER_SUCCESS, (state, {file}) => ({
    ...state,
    selectedProduct: {
      ...state.selectedProduct,
      productDetails: {
        ...state.selectedProduct.productDetails,
        ArchivoCartaDeUso: file,
        IdArchivoCartaDeUso: file.IdArchivo,
      },
    },
  })),
  on(regulatoryResearchDetailsActions.SAVE_ACQUISITION_IN_PLACE_SUCCESS, (state, {file}) => ({
    ...state,
    selectedProduct: {
      ...state.selectedProduct,
      productDetails: {
        ...state.selectedProduct.productDetails,
        ArchivoPermisoDeAdquisicionEnPlaza: file,
        IdArchivoPermisoDeAdquisicionEnPlaza: file.IdArchivo,
      },
    },
  })),
  on(regulatoryResearchDetailsActions.SAVE_IMPORT_LICENSE_SUCCESS, (state, {file}) => ({
    ...state,
    selectedProduct: {
      ...state.selectedProduct,
      productDetails: {
        ...state.selectedProduct.productDetails,
        ArchivoPermisoDeImprotacion: file,
        IdArchivoPermisoDeImprotacion: file.IdArchivo,
      },
    },
  })),
  on(regulatoryResearchDetailsActions.SAVE_ESSENTIAL_CHEMICALS_SUCCESS, (state, {file}) => ({
    ...state,
    selectedProduct: {
      ...state.selectedProduct,
      productDetails: {
        ...state.selectedProduct.productDetails,
        ArchivoAvisoDeQuimicosEsenciales: file,
        IdArchivoAvisoDeQuimicosEsenciales: file.IdArchivo,
      },
    },
  })),
  on(regulatoryResearchDetailsActions.SAVE_ZOOSANITARIE_SUCCESS, (state, {file}) => ({
    ...state,
    selectedProduct: {
      ...state.selectedProduct,
      productDetails: {
        ...state.selectedProduct.productDetails,
        ArchivoZoosanitarios: file,
        IdArchivoZoosanitarios: file.IdArchivo,
      },
    },
  })),
  on(regulatoryResearchDetailsActions.SAVE_CICLOPAFEST_SUCCESS, (state, {file}) => ({
    ...state,
    selectedProduct: {
      ...state.selectedProduct,
      productDetails: {
        ...state.selectedProduct.productDetails,
        ArchivoCicoplafest: file,
        IdArchivoCicoplafest: file.IdArchivo,
      },
    },
  })),
  on(regulatoryResearchDetailsActions.SAVE_OTHER_PERMISION_SUCCESS, (state, {file}) => ({
    ...state,
    selectedProduct: {
      ...state.selectedProduct,
      productDetails: {
        ...state.selectedProduct.productDetails,
        ArchivoOtroPermiso: file,
        IdArchivoOtroPermiso: file.IdArchivo,
      },
    },
  })),
  on(
    regulatoryResearchDetailsActions.SET_NEW_PRODUCT_RATIFICATION,
    (state, {selectedProduct, index}) => ({
      ...state,
      selectedProduct: selectedProduct,
      productList: state.productList.map((it, indx) => {
        const newItem = {...it, isSelected: indx === index};
        return newItem;
      }),
    }),
  ),
  on(regulatoryResearchDetailsActions.SET_SUPPLEMENTARY_PRODUCT_SUCCESS, (state, {payload}) => {
    return {
      ...state,
      selectedProduct: {
        ...state.selectedProduct,
        technicalSection: {
          ...state?.selectedProduct?.technicalSection,
          supplementaryProducts: payload,
        },
      },
    };
  }),
);
