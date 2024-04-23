import {Component} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {Observable} from 'rxjs';
import * as selectUtils from '@appSelectors/utils/utils.selectors';

import {securityGuardDetailsSelectors} from '@appSelectors/pendings/security-guard';
import {
  IImpOrdenDespacho,
  IOcEnvio,
} from '@appModels/store/pendings/security-guard/security-guard-details/security-guard-details.models';
import {securityGuardActionsDetails} from '@appActions/pendings/security-guard';
import {ImpOrdenDespacho} from 'api-logistica';
import {IFile} from '@appModels/files/files.models';

@Component({
  selector: 'app-security-guard-waybills',
  templateUrl: './security-guard-waybills.component.html',
  styleUrls: ['./security-guard-waybills.component.scss'],
})
export class SecurityGuardWaybillsComponent {
  constructor(private store: Store<AppState>) {}

  viewType$: Observable<string> = this.store.select(selectUtils.selectViewType);
  selectGuidesInternational$: Observable<Array<IImpOrdenDespacho>> = this.store.select(
    securityGuardDetailsSelectors.selectGuidesInternational,
  );
  selectGuidesNational$: Observable<Array<IOcEnvio>> = this.store.select(
    securityGuardDetailsSelectors.selectGuidesNational,
  );
  imagesLoaded$: Observable<Array<IFile>> = this.store.select(
    securityGuardDetailsSelectors.selectImagesFiles,
  );
  setGuide(guide: ImpOrdenDespacho | IOcEnvio): void {
    this.store.dispatch(securityGuardActionsDetails.SET_GUIDE_VISIT({guide}));
  }

  saveArrayImages(images: Array<IFile>): void {
    this.store.dispatch(securityGuardActionsDetails.SET_ARRAY_IMAGES({images}));
  }
}
