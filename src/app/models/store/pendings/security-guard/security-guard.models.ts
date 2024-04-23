import {
  initialSecurityGuardDetailsState,
  ISecurityGuardDetails,
} from '@appModels/store/pendings/security-guard/security-guard-details/security-guard-details.models';

export const TITLE_SECURITY_GUARD = 'GUARDIA DE SEGURIDAD';

export interface ISecurityGuard {
  title: string;
  editMode: boolean;
  addNewVisitant: boolean;
  securityGuardDetails: ISecurityGuardDetails;
}

export const initialSecurityGuard = (): ISecurityGuard => ({
  title: TITLE_SECURITY_GUARD,
  editMode: false,
  addNewVisitant: false,
  securityGuardDetails: initialSecurityGuardDetailsState(),
});
