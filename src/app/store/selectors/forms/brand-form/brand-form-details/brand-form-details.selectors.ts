// Models
import {
  brandItem,
  IBrandItemConfig,
  IBrandsDetailsForm,
} from '@appModels/store/forms/brand-form/brand-form-details/brand-form-details.models';
import {IBrandFormState} from '@appModels/store/forms/brand-form/brand-form.models';
// Selectors
import {selectBrandForms} from '@appSelectors/forms/forms.selectors';
// Dev tools
import {createSelector} from '@ngrx/store';

import {
  CatControlObj,
  CatIndustriaObj,
  CatSectorObj,
  CatSubTipoObj,
  CatTipoObj,
  FiltrosMarcaFamiliaObj,
  VMarca,
  VSectorIndustriaFamilia,
} from 'api-catalogos';
import {filter, find, forEach, isEmpty, isEqual, uniqBy} from 'lodash-es';
import {selectCountryListForDropListPqf} from '@appSelectors/catalogs/catalogs.selectors';
import {
  DropListOptionPqf,
  DropListOptionsPqf,
} from '@appModels/drop-down-list-pqf/drop-down-list-pqf';
import {DEFAULT_UUID} from '@appUtil/common.protocols';
// Utils

export const selectBrandDetails = createSelector(
  selectBrandForms,
  (state: IBrandFormState) => state.brandFormDetails,
);
export const selectBrandInfo = createSelector(
  selectBrandDetails,
  (state: IBrandsDetailsForm) => state.brand,
);
export const selectBrandInfoBackup = createSelector(
  selectBrandDetails,
  (state) => state.brandBackup,
);
export const selectNeedsToReloadFiltersList = createSelector(
  selectBrandDetails,
  (state: IBrandsDetailsForm) => state.needsToReloadFiltersList,
);
export const selectFiltersList = createSelector(
  selectBrandDetails,
  (state: IBrandsDetailsForm) => state.filterList,
);
export const selectControlFilterList = createSelector(
  selectFiltersList,
  (state: FiltrosMarcaFamiliaObj): Array<CatControlObj> => state.listaControl,
);
export const selectIndustryFilterList = createSelector(
  selectFiltersList,
  (state: FiltrosMarcaFamiliaObj): Array<CatIndustriaObj> => state.listaIndustria,
);
export const selectSectorFilterList = createSelector(
  selectFiltersList,
  (state: FiltrosMarcaFamiliaObj): Array<CatSectorObj> => state.listaSector,
);
export const selectSubtypeFilterList = createSelector(
  selectFiltersList,
  (state: FiltrosMarcaFamiliaObj): Array<CatSubTipoObj> => state.listaSubtipo,
);
export const selectTypeFilterList = createSelector(
  selectFiltersList,
  (state: FiltrosMarcaFamiliaObj): Array<CatTipoObj> => state.listaTipo,
);
export const selectForceErrors = createSelector(
  selectBrandDetails,
  (state): boolean => state.forceErrors,
);
export const selectedCountry = createSelector(
  [selectCountryListForDropListPqf, selectBrandInfo],
  (countryList: DropListOptionsPqf, brand: VMarca) =>
    find(countryList, (o: DropListOptionPqf) => o.id === brand.IdCatPaisManufactura),
);
export const selectBrandItems = createSelector(selectBrandDetails, (state) => state.items);
export const selectFiltersActive = createSelector(
  [
    selectControlFilterList,
    selectIndustryFilterList,
    selectSectorFilterList,
    selectSubtypeFilterList,
    selectTypeFilterList,
  ],
  (
    controlList: Array<CatControlObj>,
    industryList: Array<CatIndustriaObj>,
    sectorList: Array<CatSectorObj>,
    subtypeList: Array<CatSubTipoObj>,
    typeList: Array<CatTipoObj>,
  ): FiltrosMarcaFamiliaObj => {
    return {
      listaControl: filter(controlList, (o: CatControlObj) => o.Aplica),
      listaIndustria: filter(industryList, (o: CatIndustriaObj) => o.Aplica),
      listaSector: filter(sectorList, (o: CatSectorObj) => o.Aplica),
      listaSubtipo: filter(subtypeList, (o: CatSubTipoObj) => o.Aplica),
      listaTipo: filter(typeList, (o: CatTipoObj) => o.Aplica),
    };
  },
);
export const selectCheckAll = createSelector(
  [
    selectControlFilterList,
    selectIndustryFilterList,
    selectSectorFilterList,
    selectSubtypeFilterList,
    selectTypeFilterList,
  ],
  (
    controlList: Array<CatControlObj>,
    industryList: Array<CatIndustriaObj>,
    sectorList: Array<CatSectorObj>,
    subtypeList: Array<CatSubTipoObj>,
    typeList: Array<CatTipoObj>,
  ): boolean => {
    const control = filter(controlList, (o: CatControlObj) => !o.Aplica).length > 0;
    const industry = filter(industryList, (o: CatIndustriaObj) => !o.Aplica).length > 0;
    const sector = filter(sectorList, (o: CatSectorObj) => !o.Aplica).length > 0;
    const subtype = filter(subtypeList, (o: CatSubTipoObj) => !o.Aplica).length > 0;
    const type = filter(typeList, (o: CatTipoObj) => !o.Aplica).length > 0;
    return !(control || industry || sector || subtype || type);
  },
);
export const selectSections = createSelector(
  selectBrandItems,
  selectFiltersActive,
  selectCheckAll,
  (
    brandItems: Array<IBrandItemConfig>,
    filtersActive: FiltrosMarcaFamiliaObj,
    checkAll: boolean,
  ): Array<brandItem> => {
    const items = brandItems;
    let itemsFiltered = [];
    let sectorItems: Array<VSectorIndustriaFamilia> = [];
    let industryItems: Array<VSectorIndustriaFamilia> = [];
    let controlItems: Array<VSectorIndustriaFamilia> = [];
    let subtypeItems: Array<VSectorIndustriaFamilia> = [];
    let typeItems: Array<VSectorIndustriaFamilia> = [];
    if (filtersActive.listaSector.length > 0) {
      forEach(filtersActive.listaSector, (f: CatSectorObj) => {
        const searchItems = filter(
          items,
          (i: VSectorIndustriaFamilia) => i.ClaveSector === f.ClaveSector,
        );
        sectorItems = sectorItems.concat(searchItems);
      });
      itemsFiltered = sectorItems;
    }
    if (filtersActive.listaIndustria.length > 0) {
      forEach(filtersActive.listaSector, (f: CatSectorObj) => {
        forEach(filtersActive.listaIndustria, (o: CatIndustriaObj) => {
          industryItems = [
            ...industryItems,
            ...filter(
              sectorItems,
              (i: VSectorIndustriaFamilia) =>
                i.ClaveSector === f.ClaveSector && i.ClaveIndustria === o.ClaveIndustria,
            ),
          ];
        });
      });
      // itemsFiltered = uniqBy(industryItems, (o: VSectorIndustriaFamilia) => o.ClaveIndustria);
      itemsFiltered = industryItems;
    }
    if (filtersActive.listaTipo.length > 0) {
      forEach(filtersActive.listaSector, (f: CatSectorObj) => {
        forEach(filtersActive.listaTipo, (o: CatTipoObj) => {
          typeItems = [
            ...typeItems,
            ...filter(
              industryItems,
              (i: VSectorIndustriaFamilia) =>
                i.ClaveSector === f.ClaveSector && i.ClaveTipo === o.ClaveTipo,
            ),
          ];
        });
      });
      // itemsFiltered = uniqBy(typeItems, (o: VSectorIndustriaFamilia) => o.ClaveTipo);
      itemsFiltered = typeItems;
    }
    if (filtersActive.listaSubtipo.length > 0) {
      forEach(filtersActive.listaSector, (f: CatSectorObj) => {
        forEach(filtersActive.listaSubtipo, (o: CatSubTipoObj) => {
          subtypeItems = [
            ...subtypeItems,
            ...filter(itemsFiltered, (i: VSectorIndustriaFamilia) =>
              i.ClaveTipo === 'estandares' || i.ClaveTipo === 'reactivos'
                ? i.ClaveSector === f.ClaveSector && i.ClaveSubtipo === o.ClaveSubtipo
                : i,
            ),
          ];
        });
      });
      // itemsFiltered = uniqBy(subtypeItems, (o: VSectorIndustriaFamilia) => o.ClaveSubtipo);
      itemsFiltered = subtypeItems;
    }
    if (filtersActive.listaControl.length > 0) {
      forEach(filtersActive.listaSector, (f: CatSectorObj) => {
        forEach(filtersActive.listaControl, (o: CatControlObj) => {
          controlItems = [
            ...controlItems,
            ...filter(itemsFiltered, (i: VSectorIndustriaFamilia) =>
              i.ClaveTipo === 'estandares' || i.ClaveTipo === 'reactivos'
                ? i.ClaveSector === f.ClaveSector && i.ClaveControl === o.ClaveControl
                : i,
            ),
          ];
        });
      });
      // itemsFiltered = uniqBy(controlItems, (o: VSectorIndustriaFamilia) => o.ClaveControl);
      itemsFiltered = controlItems;
    }
    itemsFiltered = checkAll ? items : itemsFiltered;
    return [
      {
        title: 'Sector Público',
        items: filter(itemsFiltered, (o: VSectorIndustriaFamilia) => o.ClaveSector === 'publico'),
      },
      {
        title: 'Sector Privado',
        items: filter(itemsFiltered, (o: VSectorIndustriaFamilia) => o.ClaveSector === 'privado'),
      },
    ];
  },
);
export const showMessage = createSelector(selectSections, (section): boolean => {
  return isEmpty(section[0].items) && isEmpty(section[1].items);
});
export const brandDataHasChanges = createSelector(
  [selectBrandInfo, selectBrandInfoBackup],
  (brandInfo, brandBackup): boolean => {
    return !isEqual(brandInfo, brandBackup);
  },
);
export const selectItemsHasChanges = createSelector(
  selectBrandItems,
  (brandItems): boolean => filter(brandItems, (o: IBrandItemConfig) => !o.original).length > 0,
);
export const requiredDataValidator = createSelector(
  [selectBrandInfo, selectBrandItems],
  (brandInfo: VMarca, brandItems: Array<IBrandItemConfig>): boolean => {
    return (
      brandInfo.Nombre !== null && filter(brandItems, (o: IBrandItemConfig) => o.Activo).length > 0
    );
  },
);
export const saveValidation = createSelector(
  [selectBrandInfo, brandDataHasChanges, selectItemsHasChanges, requiredDataValidator],
  (
    brandInfo: VMarca,
    brandDataHasChanges: boolean,
    itemsHasChanges: boolean,
    requireDataValidator: boolean,
  ): boolean => {
    if (brandInfo.IdMarca === DEFAULT_UUID) {
      return requireDataValidator;
    } else {
      return (brandDataHasChanges || itemsHasChanges) && requireDataValidator;
    }
  },
);
export const cancelValidation = createSelector(
  [brandDataHasChanges, selectItemsHasChanges],
  (brandHasChanges, itemsHasChanges) => !(brandHasChanges || itemsHasChanges),
);
export const selectItemsToSave = createSelector(selectBrandItems, (items) =>
  filter(items, (o: IBrandItemConfig) => !o.original),
);
