import {Component} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {Observable} from 'rxjs';
import {IProductInvestigation} from '@appModels/store/pendings/attend-investigation/attend-investigation-details/attend-investigation-details.model';
import {attendInvestigationDetailsSelectors} from '@appSelectors/pendings/attend-investigation';
import {AppViewTypes} from '@appModels/store/utils/utils.model';
import * as selectUtils from '@appSelectors/utils/utils.selectors';
import {EmailDialogService} from '@appServices/email-dialog/email-dialog.service';
import {TranslateService} from '@ngx-translate/core';
import {IMailDialogDataChildren} from '@appModels/correo/correo';

@Component({
  selector: 'app-email-content',
  templateUrl: './email-content.component.html',
  styleUrls: ['./email-content.component.scss'],
})
export class EmailContentComponent {
  productsChecked$: Observable<Array<IProductInvestigation>> = this.store.select(
    attendInvestigationDetailsSelectors.selectProductsChecked,
  );
  viewType$: Observable<string> = this.store.select(selectUtils.selectViewType);

  data: IMailDialogDataChildren;

  readonly viewTypes = AppViewTypes;

  constructor(
    private store: Store<AppState>,
    private emailDialogService: EmailDialogService,
    private translateService: TranslateService,
  ) {
    this.translateService.use('es');
    // DOCS: ESCUCHA LOS CAMBIOS EMITIDOS POR EL COMPONENTE PADRE
    this.emailDialogService
      .getData$()
      .subscribe((data: IMailDialogDataChildren) => {
        this.data = data;
      })
      .unsubscribe();
  }

  setNotes(notes: string): void {
    this.emailDialogService.setData({notes});
  }
}
