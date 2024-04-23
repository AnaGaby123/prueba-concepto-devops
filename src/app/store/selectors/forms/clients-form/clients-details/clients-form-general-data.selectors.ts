import {createSelector} from '@ngrx/store';
import {IClientsDetailsForm} from '@appModels/store/forms/clients-form/clients-details-form/clients-details-form.models';
import {
  ClientTerceroAutorizadoRelacion,
  IClientsTercerosAutorizados,
  IContactoDetalleObj,
  IGeneralDataClientsForm,
  IGeneralDataToSave,
} from '@appModels/store/forms/clients-form/clients-details-form/general-data/general-data-clients-form.models';
import {
  CatTipoNumeroTelefonico,
  ContactoDetalleObj,
  NumeroTelefonico,
  Usuario,
  UsuarioBase,
  UsuariosCartera,
  VCliente,
} from 'api-catalogos';
import {FiltersOnlyActive} from '@appModels/filters/Filters';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {filter, find, includes, isEmpty, isEqual, map as _map, orderBy} from 'lodash-es';
import {
  selecCatIndustriaForDropDown,
  selectCatRolClientsForDropDown,
  selectCatSectorForDropDown,
  selectImportancesclientsForDropDown,
  selectListCatDecisionLevelForDropDown,
  selectListCatDifficultyForDropDown,
  selectListCatJobLevelForDropDown,
  selectListCatMaintenanceForDropDown,
  selectListCommercialLeader,
  selectListCoordinatorESAC,
  selectListCustomer,
  selectTipoTelefono,
} from '@appSelectors/catalogs/catalogs.selectors';
import {DEFAULT_UUID, ENUM_USER_FUNCTIONS} from '@appUtil/common.protocols';
import {getArrayForDropDownList} from '@appUtil/util';
import {selectClientDetailsForm} from '@appSelectors/forms/clients-form/clients-details/clients-details-form.selectors';
import {selectUser, selectUserFunctions} from '@appSelectors/auth/auth.selectors';
import {UserInfo} from '@appModels/auth/user-info.model';

export const selectGeneralData = createSelector(
  selectClientDetailsForm,
  (state: IClientsDetailsForm) => state.generalData,
);
export const selectIsUserAnalistaDeCuentasPorCobrar = createSelector(
  selectUserFunctions,
  (selectUserFunctions) =>
    !!includes(selectUserFunctions, ENUM_USER_FUNCTIONS.functionAnalistaDeCuentasPorCobrar),
);
export const selectIsUserCoordinadorDeVentaInterna = createSelector(
  selectUserFunctions,
  (selectUserFunctions) =>
    !!includes(selectUserFunctions, ENUM_USER_FUNCTIONS.functionCoordinadorDeVentaInterna),
);
export const selectIsUserCoordinadorDeServicioAlCliente = createSelector(
  selectUserFunctions,
  (selectUserFunctions) =>
    !!includes(selectUserFunctions, ENUM_USER_FUNCTIONS.functionCoordinadorDeServicioAlCliente),
);
export const selectedClient = createSelector(
  selectGeneralData,
  (state: IGeneralDataClientsForm) => state.selectedClient,
);
export const selectClientIncomeLevel = createSelector(
  selectedClient,
  (state: VCliente): string => state?.NivelIngreso,
);
export const selectSortedClientContacts = createSelector(
  selectGeneralData,
  (state: IGeneralDataClientsForm) =>
    orderBy(state.contacts, ['Nombres', 'ApellidoPaterno', 'ApellidoMaterno']),
);
export const selectClientContacts = createSelector(
  selectGeneralData,
  (state: IGeneralDataClientsForm): Array<IContactoDetalleObj> => _map(state.contacts, (o) => o),
);
export const contactsFilter = createSelector(
  selectedClient,
  (state: VCliente): FiltersOnlyActive => {
    const body = new FiltersOnlyActive();
    body.Filters.push({
      NombreFiltro: 'IdCliente',
      ValorFiltro: state.IdCliente,
    });
    return body;
  },
);

export const selectListSellersForDropDown = createSelector(
  [selectListCommercialLeader, selectedClient, selectUser],
  (
    listCommercialLeader: Array<UsuariosCartera>,
    selectedClient: VCliente,
    currentUser: UserInfo,
  ): DropListOption[] => {
    const isUserEvi = currentUser?.Funciones?.includes(ENUM_USER_FUNCTIONS.functionEvi);
    if (isUserEvi && (!selectedClient.IdCliente || selectedClient?.IdCliente === DEFAULT_UUID)) {
      const commercialLeader = listCommercialLeader.find((o: UsuariosCartera) =>
        o.ListaUsuarioRelacion.some((u) => u.IdUsuario === currentUser.IdUsuario),
      );
      if (!commercialLeader) {
        return [];
      }
      return getArrayForDropDownList(
        commercialLeader?.ListaUsuarioRelacion,
        'IdUsuario',
        'NombreCompleto',
      );
    }

    if (!selectedClient?.IdUsuarioCoordinadorDeVentaInterna) {
      return [];
    }
    const selectedCommercialLeader = listCommercialLeader.find(
      (o: UsuariosCartera) =>
        o.Usuario.IdUsuario === selectedClient?.IdUsuarioCoordinadorDeVentaInterna,
    );
    if (!selectedCommercialLeader) {
      return [];
    }
    return getArrayForDropDownList(
      selectedCommercialLeader?.ListaUsuarioRelacion,
      'IdUsuario',
      'NombreCompleto',
    );
  },
);

export const selectedClientRole = createSelector(
  [selectCatRolClientsForDropDown, selectedClient],
  (roles, client: VCliente) =>
    find(roles, (o: DropListOption) => o.value === client.IdCatRolCliente),
);
export const selectedSeller = createSelector(
  selectListSellersForDropDown,
  selectedClient,
  (listSellers: DropListOption[], client: VCliente) =>
    find(listSellers, (o: DropListOption) => o.value === client.IdUsuarioVendedor),
);
export const selectedImportance = createSelector(
  [selectImportancesclientsForDropDown, selectedClient],
  (importances: Array<DropListOption>, client: VCliente): DropListOption =>
    find(importances, (o: DropListOption) => o.value === client.IdCatImportanciaCliente),
);
export const selectedSector = createSelector(
  [selectCatSectorForDropDown, selectedClient],
  (sectors: Array<DropListOption>, client: VCliente): DropListOption =>
    find(sectors, (o: DropListOption) => o.value === client.IdCatSector),
);
export const selectedIndustry = createSelector(
  [selecCatIndustriaForDropDown, selectedClient],
  (industries: Array<DropListOption>, client: VCliente): DropListOption =>
    find(industries, (o: DropListOption) => o.value === client.IdCatIndustria),
);

// Selectores para el formulario de contacto
export const selectContactForm = createSelector(
  selectGeneralData,
  (state: IGeneralDataClientsForm) => state.contactForm,
);
export const selectContactFormPhones = createSelector(
  selectContactForm,
  (state: ContactoDetalleObj) => state?.NumeroTelefonico,
);
export const selectContactFormPhone1 = (phoneType) =>
  createSelector(
    [selectContactFormPhones, selectTipoTelefono],
    (state: Array<NumeroTelefonico>, phoneTypesList: Array<CatTipoNumeroTelefonico>) => {
      const phoneType1 = find(
        phoneTypesList,
        (o: CatTipoNumeroTelefonico) => o.TipoNumeroTelefonico === phoneType,
      );
      return find(
        state,
        (o: NumeroTelefonico) =>
          o.IdCatTipoNumeroTelefonico === phoneType1?.IdCatTipoNumeroTelefonico,
      );
    },
  );

export const selectedDifficulty = createSelector(
  [selectListCatDifficultyForDropDown, selectContactForm],
  (difficulty: Array<DropListOption>, contactForm: ContactoDetalleObj) =>
    find(difficulty, (o: DropListOption) => o.value === contactForm.IdCatDificultad),
);
export const selectedManintenance = createSelector(
  [selectListCatMaintenanceForDropDown, selectContactForm],
  (maintenance: Array<DropListOption>, contactForm: ContactoDetalleObj) =>
    find(maintenance, (o: DropListOption) => o.value === contactForm.IdCatMantenimiento),
);
export const selectedLevelDecision = createSelector(
  [selectListCatDecisionLevelForDropDown, selectContactForm],
  (decisionLevel: Array<DropListOption>, contactForm: ContactoDetalleObj) =>
    find(decisionLevel, (o: DropListOption) => o.value === contactForm.IdCatNivelDecision),
);
export const selectedJobLevel = createSelector(
  [selectListCatJobLevelForDropDown, selectContactForm],
  (jobLevel: Array<DropListOption>, contactForm: ContactoDetalleObj) =>
    find(jobLevel, (o: DropListOption) => o.value === contactForm.IdCatNivelPuesto),
);
export const getVerityEmail = createSelector(
  selectGeneralData,
  (state: IGeneralDataClientsForm) => state.existingEmail,
);
export const selectCatClientsTercerosAutorizados = createSelector(
  selectGeneralData,
  (state: IGeneralDataClientsForm) => state.tercerosAutorizados,
);
export const selectClientAuthorized = createSelector(
  selectCatClientsTercerosAutorizados,
  (state: IClientsTercerosAutorizados) => state.tercerosAutorizadosSelected,
);
export const selectClientAuthorizedToDelete = createSelector(
  selectCatClientsTercerosAutorizados,
  (state: IClientsTercerosAutorizados) => state.tercerosAutorizadosToDelete,
);
export const selectTercerosAutorizadosForDropDown = createSelector(
  selectCatClientsTercerosAutorizados,
  (state: IClientsTercerosAutorizados) => {
    return getArrayForDropDownList(state.listTercerosAutorizados, 'IdCliente', 'Nombre');
  },
);
export const selectContactsToDelete = createSelector(
  selectGeneralData,
  (state: IGeneralDataClientsForm) => state.contactsToDelete,
);

export const selectAuthorizedThirdSelected = createSelector(
  selectGeneralData,
  (state: IGeneralDataClientsForm) => state.authorizedThirdSelected,
);
export const selectModalIsOpen = createSelector(
  selectGeneralData,
  (state: IGeneralDataClientsForm) => state.modalIsOpen,
);
export const selectBackUp = createSelector(
  selectGeneralData,
  (state: IGeneralDataClientsForm) => state.backup,
);
export const selectGeneralDataToSave = createSelector(
  [selectedClient, selectClientAuthorized, selectClientAuthorizedToDelete],
  (
    client: VCliente,
    selectedClientsAuthorized: Array<ClientTerceroAutorizadoRelacion>,
    selectedClientsAuthorizedToDelete: Array<ClientTerceroAutorizadoRelacion>,
  ): IGeneralDataToSave => ({
    client,
    selectedClientsAuthorized: filter(
      selectedClientsAuthorized,
      (o: ClientTerceroAutorizadoRelacion) => o.IdClienteTerceroAutorizadoRelacion === DEFAULT_UUID,
    ),
    selectedClientsAuthorizedToDelete,
  }),
);
export const contactFormButtonValidation = createSelector(
  [selectContactForm, getVerityEmail],
  (state: ContactoDetalleObj, existingMail): boolean =>
    state.Nombres &&
    state.ApellidoPaterno &&
    state.Titulo &&
    state.Puesto &&
    state.Departamento &&
    state.NumeroTelefono1 &&
    state.CorreoElectronico[0].Correo &&
    !existingMail,
);
export const selectGeneralDataHasChanges = createSelector(
  selectGeneralData,
  (state: IGeneralDataClientsForm): boolean => {
    return (
      !isEqual(JSON.stringify(state.selectedClient), JSON.stringify(state.backup.selectedClient)) ||
      !isEqual(JSON.stringify(state.contacts), JSON.stringify(state.backup.contacts)) ||
      !isEqual(
        JSON.stringify(state.contactsToDelete),
        JSON.stringify(state.backup.contactsToDelete),
      ) ||
      !isEqual(
        JSON.stringify(state.tercerosAutorizados.tercerosAutorizadosSelected),
        JSON.stringify(state.backup.tercerosAutorizados),
      )
    );
  },
);

export const validationGeneralData = createSelector(
  selectGeneralData,
  selectGeneralDataHasChanges,
  selectUserFunctions,
  (state: IGeneralDataClientsForm, hasChanges: boolean, functions): boolean => {
    const commercialLeader = includes(
      functions,
      ENUM_USER_FUNCTIONS.functionCoordinadorDeVentaInterna,
    );
    const coordinatorESAC = includes(
      functions,
      ENUM_USER_FUNCTIONS.functionCoordinadorDeServicioAlCliente,
    );

    const eviValidator =
      includes(functions, ENUM_USER_FUNCTIONS.functionEvi) || commercialLeader
        ? state?.selectedClient?.UsuarioVendedor
        : true;
    const esacValidator =
      includes(functions, ENUM_USER_FUNCTIONS.functionEsac) || coordinatorESAC
        ? state?.selectedClient?.ESAC
        : true;

    const coordinatorESACAndCommercialLeaderValidator =
      commercialLeader || coordinatorESAC
        ? state?.selectedClient?.IdUsuarioCoordinadorDeServicioAlCliente &&
          state?.selectedClient?.IdUsuarioCoordinadorDeVentaInterna
        : true;

    return !!(
      state?.selectedClient?.Alias?.trim() &&
      state?.selectedClient?.Nombre?.trim() &&
      state?.selectedClient?.NombreCatRolCliente &&
      state?.selectedClient?.Sector &&
      state?.selectedClient?.Industria &&
      state?.selectedClient?.ObjetivoCrecimientoFundamental > 0 &&
      state?.selectedClient?.ObjetivoCrecimientoDeseado > 0 &&
      eviValidator &&
      esacValidator &&
      coordinatorESACAndCommercialLeaderValidator &&
      ((state?.selectedClient?.EsTerceroAutorizado &&
        !isEmpty(state.tercerosAutorizados.tercerosAutorizadosSelected)) ||
        !state.selectedClient.EsTerceroAutorizado) &&
      !isEmpty(state.contacts) &&
      (state.selectedClient.IdCliente === DEFAULT_UUID ||
        (state.selectedClient.IdCliente !== DEFAULT_UUID && hasChanges))
    );
  },
);

//DOCS: Selector para el listado de líderes comerciales
export const selectUsersCommercialLeader = createSelector(
  selectListCommercialLeader,
  (listCommercialLeader: UsuariosCartera[]): DropListOption[] => {
    const commercialLeader: UsuarioBase[] = listCommercialLeader.map((o) => o.Usuario);
    return getArrayForDropDownList(commercialLeader, 'IdUsuario', 'NombreCompleto');
  },
);

export const selectUsersCoordinatorESAC = createSelector(
  selectListCoordinatorESAC,
  (listCoordinatorESAC: UsuariosCartera[]): DropListOption[] => {
    const coordinatorESAC: Usuario[] = listCoordinatorESAC.map((o) => o.Usuario);
    return getArrayForDropDownList(coordinatorESAC, 'IdUsuario', 'NombreCompleto');
  },
);

export const selectUsersEsac = createSelector(
  [selectListCoordinatorESAC, selectedClient, selectUser],
  (
    listCoordinatorESAC: UsuariosCartera[],
    selectedClient: VCliente,
    currentUser: UserInfo,
  ): DropListOption[] => {
    const isUserEsac = currentUser?.Funciones?.includes(ENUM_USER_FUNCTIONS.functionEsac);

    if (isUserEsac && (!selectedClient.IdCliente || selectedClient?.IdCliente === DEFAULT_UUID)) {
      const coordinatorESAC = listCoordinatorESAC.find((o: UsuariosCartera) =>
        o.ListaUsuarioRelacion.some((u) => u.IdUsuario === currentUser.IdUsuario),
      );
      if (!coordinatorESAC) {
        return [];
      }
      return getArrayForDropDownList(
        coordinatorESAC?.ListaUsuarioRelacion,
        'IdUsuario',
        'NombreCompleto',
      );
    }

    if (!selectedClient?.IdUsuarioCoordinadorDeServicioAlCliente) {
      return [];
    }
    const selectedCoordinatorESAC = listCoordinatorESAC?.find(
      (o: UsuariosCartera) =>
        o.Usuario.IdUsuario === selectedClient?.IdUsuarioCoordinadorDeServicioAlCliente,
    );
    if (!selectedCoordinatorESAC) {
      return [];
    }
    return getArrayForDropDownList(
      selectedCoordinatorESAC?.ListaUsuarioRelacion,
      'IdUsuario',
      'NombreCompleto',
    );
  },
);
export const selectUsersCollectors = createSelector(
  selectListCustomer,
  (state: Array<Usuario>): Array<DropListOption> => {
    const esacList: Array<Usuario> = filter(
      state,
      (o: Usuario) => o.AnalistaDeCuentasPorCobrar && o.ESAC,
    );
    return getArrayForDropDownList(esacList, 'IdUsuario', 'NombreCompleto');
  },
);
export const selectedEsac = createSelector(
  [selectUsersEsac, selectedClient],
  (esacList: Array<DropListOption>, client: VCliente): DropListOption => {
    return find(esacList, (o: DropListOption): boolean => o.value === client.IdUsuarioESAC);
  },
);
export const selectedCollector = createSelector(
  [selectUsersEsac, selectedClient],
  (esacList: Array<DropListOption>, client: VCliente): DropListOption =>
    find(esacList, (o: DropListOption): boolean => o.value === client.IdUsuarioCobrador),
);

export const selectedCommercialLeader = createSelector(
  [selectUsersCommercialLeader, selectedClient],
  (commercialLeaders: DropListOption[], client: VCliente): DropListOption =>
    find(
      commercialLeaders,
      (o: DropListOption) => o.value === client.IdUsuarioCoordinadorDeVentaInterna,
    ),
);

export const selectedCoordinatorESAC = createSelector(
  [selectUsersCoordinatorESAC, selectedClient],
  (coordinatorESAC: DropListOption[], client: VCliente): DropListOption =>
    find(
      coordinatorESAC,
      (o: DropListOption) => o.value === client.IdUsuarioCoordinadorDeServicioAlCliente,
    ),
);

export const selectIsUserCommercialLeaderOrCoordinatorESAC = createSelector(
  [selectIsUserCoordinadorDeVentaInterna, selectIsUserCoordinadorDeServicioAlCliente],
  (idUserCoordinatorInternSales: boolean, isUserCoordinatorServiceClient: boolean): boolean =>
    idUserCoordinatorInternSales || isUserCoordinatorServiceClient ? true : false,
);
