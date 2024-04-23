import {Component, HostListener, Input, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import * as mailboxSelectors from '@appSelectors/mailbox/mailbox.selectors';
import * as mailboxActions from '@appActions/mailbox/mailbox.actions';
import {lastValueFrom, Observable} from 'rxjs';
import {deburr, filter, findIndex, forEach, isEmpty, map, toLower} from 'lodash-es';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {
  CorreoRecibidoClienteCustom,
  CorreoRecibidoCustom,
} from '@appModels/store/mailbox/mailbox.models';
import {take} from 'rxjs/operators';
import {selectUserFunctions} from '@appSelectors/auth/auth.selectors';
import {ENUM_USER_FUNCTIONS} from '@appUtil/common.protocols';
import blobToSHA256 from 'blob-to-sha256';
import {showDocument} from '@appUtil/files';
import {InputValidators, maxLengthInput} from '@appHelpers/shared/shared.helpers';
import {IPopUp} from '@appModels/shared-components/pqf-pop-up';
import {Cliente} from 'api-logistica';
import {toRound} from '@appUtil/util';

@Component({
  selector: 'app-omission-classification',
  templateUrl: './omission-classification.component.html',
  styleUrls: ['./omission-classification.component.scss'],
})
export class OmissionClassificationComponent implements OnInit {
  readonly inputValidators = InputValidators;
  @Input() classifications: CorreoRecibidoClienteCustom[];
  defaultClassifIsSelected: Observable<boolean> = this.store.select(
    mailboxSelectors.selectDefaultClassificationIsSelected,
  );
  blockClassificationsEdition$: Observable<boolean> = this.store.select(
    mailboxSelectors.selectBlockClassificationsEdition,
  );
  selectUsersWalletError$: Observable<DropListOption[]> = this.store.select(
    mailboxSelectors.selectUsersWalletErrorDropList,
  );
  alreadyExistReference$: Observable<boolean> = this.store.select(
    mailboxSelectors.alreadyExistReference,
  );
  selectValidationButtonFirstClassification$: Observable<string> = this.store.select(
    mailboxSelectors.selectValidationButtonFirstClassification,
  );
  selectValidationDisabledButtonFirstClassification$: Observable<boolean> = this.store.select(
    mailboxSelectors.selectValidationDisabledButtonFirstClassification,
  );
  selectValidationButtonSecondClassification$: Observable<string> = this.store.select(
    mailboxSelectors.selectValidationButtonSecondClassification,
  );
  selectValidationDisabledButtonSecondClassification$: Observable<boolean> = this.store.select(
    mailboxSelectors.selectValidationDisabledButtonSecondClassification,
  );
  selectValidationButtonThirdClassification$: Observable<string> = this.store.select(
    mailboxSelectors.selectValidationButtonThirdClassification,
  );
  selectValidationDisabledButtonThirdClassification$: Observable<boolean> = this.store.select(
    mailboxSelectors.selectValidationDisabledButtonThirdClassification,
  );
  selectValidationButtonFourthClassification$: Observable<string> = this.store.select(
    mailboxSelectors.selectValidationButtonFourthClassification,
  );
  selectValidationDisabledButtonFourthClassification$: Observable<boolean> = this.store.select(
    mailboxSelectors.selectValidationDisabledButtonFourthClassification,
  );
  selectValidationButtonFiveClassification$: Observable<string> = this.store.select(
    mailboxSelectors.selectValidationButtonFiveClassification,
  );
  selectValidationDisabledButtonFiveClassification$: Observable<boolean> = this.store.select(
    mailboxSelectors.selectValidationDisabledButtonFiveClassification,
  );
  selectValidationButtonSixClassification$: Observable<string> = this.store.select(
    mailboxSelectors.selectValidationButtonSixClassification,
  );
  selectValidationDisabledButtonSixClassification$: Observable<boolean> = this.store.select(
    mailboxSelectors.selectValidationDisabledButtonSixClassification,
  );
  currentClient$: Observable<Cliente> = this.store.select(mailboxSelectors.selectCurrentMailClient);
  showDeleteMailPop$: Observable<boolean> = this.store.select(mailboxSelectors.selectDeleteMailPop);
  isNewlient: Observable<boolean> = this.store.select(mailboxSelectors.isNewClient);
  readonly ID_CAT_OC_CLIENTE = '#oc cliente';
  readonly ID_CAT_SIN_OC = 'sin oc';
  viewType = 'iPad';
  inputWidth = '296px';
  inputDefaultWidth = '';
  functionEVI = false;
  functionAnalistaDeCuentasPorCobrar = false;
  functionESAC = false;
  functionCoordinadorDeServicioAlCliente = false;
  lodashDeburr = deburr;
  lodashToLower = toLower;
  maxLengthInput = maxLengthInput;
  spamCheckActive = false;

  @HostListener('window:resize')
  onResize(): void {
    if (window.innerWidth < 1700) {
      this.viewType = 'iPad';
      this.inputWidth = '276px';
      this.inputDefaultWidth = '415px';
    } else if (window.innerWidth < 2180) {
      this.viewType = 'iPad';
      this.inputWidth = '276px';
      this.inputDefaultWidth = '425px';
    } else {
      this.inputWidth = '500px';
      this.inputDefaultWidth = '643px';
      this.viewType = 'macBookAir';
    }
  }

  constructor(private store: Store<AppState>) {}

  async ngOnInit(): Promise<void> {
    const functions = await lastValueFrom(this.store.pipe(select(selectUserFunctions), take(1)));
    forEach(functions, (o) => {
      switch (o) {
        case ENUM_USER_FUNCTIONS.functionEvi:
          this.functionEVI = findIndex(functions, ENUM_USER_FUNCTIONS.functionEvi) !== 1;
          break;
        case ENUM_USER_FUNCTIONS.functionCoordinadorDeServicioAlCliente:
          this.functionCoordinadorDeServicioAlCliente =
            findIndex(functions, ENUM_USER_FUNCTIONS.functionCoordinadorDeServicioAlCliente) !== 1;
          break;
        case ENUM_USER_FUNCTIONS.functionEsac:
          this.functionESAC = findIndex(functions, ENUM_USER_FUNCTIONS.functionEsac) !== 1;
          break;
        case ENUM_USER_FUNCTIONS.functionAnalistaDeCuentasPorCobrar:
          this.functionAnalistaDeCuentasPorCobrar =
            findIndex(functions, ENUM_USER_FUNCTIONS.functionAnalistaDeCuentasPorCobrar) !== 1;
          break;
      }
    });

    this.onResize();
  }

  async selectFile(
    IdCatClasificacionCorreoRecibido: string,
    $event: any,
    isSpecial?: boolean,
  ): Promise<void> {
    if (!isEmpty($event.target.files)) {
      const file = $event.target.files[0];
      const hash = await blobToSHA256(file);
      this.store.dispatch(
        mailboxActions.SET_TEMP_FILE({
          IdCatClasificacionCorreoRecibido,
          hash,
          file,
        }),
      );
      if (isSpecial) {
        const correoRecibidoClienteCustoms: CorreoRecibidoClienteCustom[] = await lastValueFrom(
          this.store.pipe(
            select(mailboxSelectors.selectCurrentMailReferencesClasifications),
            take(1),
          ),
        );
        const classification: CorreoRecibidoClienteCustom[] = filter(
          correoRecibidoClienteCustoms,
          (o: CorreoRecibidoClienteCustom) =>
            o.IdCatClasificacionCorreoRecibido === IdCatClasificacionCorreoRecibido,
        );
        const reference: Array<DropListOption> = filter(
          classification[0].CatClasificacionCorreoRecibidoReferencia,
          (o) => toLower(deburr(o.label)) === toLower(deburr(this.ID_CAT_OC_CLIENTE)),
        );
        this.setCatClasificacionCorreoRecibidoReferenciaTemp(
          IdCatClasificacionCorreoRecibido,
          reference[0],
        );
      }
    }
  }

  async selectErrorCartera(
    IdCatClasificacionCorreoRecibido: string,
    value: boolean,
  ): Promise<void> {
    this.store.dispatch(
      mailboxActions.SET_MAILBOX_WALLET_ERROR({
        IdCatClasificacionCorreoRecibido,
        value,
      }),
    );
    const mail = await this.getSelectedMail();
    this.store.dispatch(mailboxActions.SET_VIEWED_MAIL_SUCCESS({mail}));
  }

  selectUserWalletError(
    IdCatClasificacionCorreoRecibido: string,
    dropListOptionSelected: DropListOption,
  ): void {
    this.store.dispatch(
      mailboxActions.SET_MAILBOX_USER_WALLET_ERROR({
        IdCatClasificacionCorreoRecibido,
        user: dropListOptionSelected,
      }),
    );
    this.store.dispatch(mailboxActions.SET_MAILBOX_BACKUP());
  }

  seeDocument(file: File) {
    showDocument(file);
  }

  async selectClasification(
    IdCatClasificacionCorreoRecibido: string,
    value: boolean,
    isDefault?: boolean,
  ): Promise<void> {
    if (!value) {
      // TODO: Si se va a desactivar
      const clientReceivedMails = await lastValueFrom(
        this.store.pipe(select(mailboxSelectors.selectCurrentMailClientReceivedMail), take(1)),
      );
      const index = findIndex(
        clientReceivedMails,
        (o) =>
          o.IdCatClasificacionCorreoRecibido === IdCatClasificacionCorreoRecibido &&
          o.IsSelectedPreviously,
      );
      if (index !== -1) {
        map(clientReceivedMails, (o, i) => {
          if (i === index) {
            this.store.dispatch(
              mailboxActions.SET_MAILBOX_TO_DELETE({
                CorreoRecibidoClienteCustom: o,
              }),
            );
          }
        });
      }
      // TODO: Si se va a desactivar y la clasificacion es default
      if (isDefault) {
        this.store.dispatch(
          mailboxActions.SET_MAILBOX_CLASSIFICATION_DEFAULT_IS_SELECTED({
            value: false,
          }),
        );
      }
    } else {
      // TODO: Si se va a activar
      const clientReceivedMailsToDelete = await lastValueFrom(
        this.store.pipe(
          select(mailboxSelectors.selectCurrentMailClientReceivedMailToDelete),
          take(1),
        ),
      );
      const index = findIndex(
        clientReceivedMailsToDelete,
        (o) =>
          o.IdCatClasificacionCorreoRecibido === IdCatClasificacionCorreoRecibido &&
          o.IsSelectedPreviously,
      );
      if (index !== -1) {
        map(clientReceivedMailsToDelete, (o, i) => {
          if (i === index) {
            this.store.dispatch(
              mailboxActions.QUIT_MAILBOX_TO_DELETE({
                CorreoRecibidoClienteCustom: o,
              }),
            );
          }
        });
      }
      if (isDefault) {
        // TODO: Si se va a activar y la clasificacion es default
        this.store.dispatch(mailboxActions.QUIT_ALL_MAILBOX_CLASSIFICATION());
        this.store.dispatch(
          mailboxActions.SET_MAILBOX_CLASSIFICATION_DEFAULT_IS_SELECTED({
            value: true,
          }),
        );
      }
    }
    this.store.dispatch(
      mailboxActions.SET_MAILBOX_CLASSIFICATION({
        IdCatClasificacionCorreoRecibido,
        value,
      }),
    );
    const mail = await this.getSelectedMail();
    this.store.dispatch(mailboxActions.SET_VIEWED_MAIL_SUCCESS({mail}));
  }

  setCatClasificacionCorreoRecibidoReferenciaTemp(
    IdCatClasificacionCorreoRecibido: string,
    dropListOptionSelected: DropListOption,
  ): void {
    this.store.dispatch(
      mailboxActions.SET_MAILBOX_CLASSIFICATION_TEMP_REFERENCE({
        IdCatClasificacionCorreoRecibido,
        CatClasificacionCorreoRecibidoReferencia: dropListOptionSelected,
      }),
    );
  }

  async saveClassificationReferenceSelec(
    IdCatClasificacionCorreoRecibidoReferencia: string,
    IdCatClasificacionCorreoRecibido: string,
    PrefijoComentario: string,
    Referencia: string,
    Comentario: string,
    Total?: number,
    Iva?: number,
    Subtotal?: number,
    IdArchivo?: string,
  ): Promise<void> {
    const referenciaSelect = {
      IdCatClasificacionCorreoRecibidoReferencia,
      IdCatClasificacionCorreoRecibido,
      PrefijoComentario,
      Referencia,
      Comentario,
      Total,
      Iva,
      Subtotal,
      IdArchivo,
    };
    this.store.dispatch(
      mailboxActions.SET_MAILBOX_CLASSIFICATION_REFERENCE_SELECT({
        referenciaSelect,
      }),
    );
    this.store.dispatch(mailboxActions.SET_OC_CLIENT_LINKED());
    this.store.dispatch(mailboxActions.SET_CARD_FILES_OC_INACTIVE());
    this.store.dispatch(mailboxActions.QUIT_URLS_OF_FILES_OCPENDING());
    this.store.dispatch(
      mailboxActions.SET_FILE_OC_MESSAGE({
        fileType: 'file',
        message: 'SELECCIONA UN ARCHIVO',
      }),
    );
    this.store.dispatch(
      mailboxActions.SET_FILE_OC_MESSAGE({
        fileType: 'oc',
        message: 'SELECCIONA UN ARCHIVO',
      }),
    );
    const mail = await this.getSelectedMail();
    this.store.dispatch(mailboxActions.SET_VIEWED_MAIL_SUCCESS({mail}));
  }

  async setClassificationReferenceComments(
    IdCatClasificacionCorreoRecibido: string,
    Comentario: string,
  ): Promise<void> {
    this.store.dispatch(
      mailboxActions.SET_MAILBOX_CLASSIFICATION_TEMP_REFERENCE_COMMENTS({
        IdCatClasificacionCorreoRecibido,
        Comentario,
      }),
    );
    const mail = await this.getSelectedMail();
    this.store.dispatch(mailboxActions.SET_VIEWED_MAIL_SUCCESS({mail}));
  }

  async saveClassificationComments(
    IdCatClasificacionCorreoRecibido: string,
    Comentario: string,
    IsUnique?: boolean,
  ) {
    this.store.dispatch(
      mailboxActions.SET_MAILBOX_CLASSIFICATION_COMMENTS({
        IdCatClasificacionCorreoRecibido,
        Comentario,
        IsUnique,
      }),
    );
    const mail = await this.getSelectedMail();
    this.store.dispatch(mailboxActions.SET_VIEWED_MAIL_SUCCESS({mail}));
  }

  async quitClassificationComments(
    IdCatClasificacionCorreoRecibido: string,
    Index: number,
  ): Promise<void> {
    if (IdCatClasificacionCorreoRecibido !== null && IdCatClasificacionCorreoRecibido !== '') {
      this.store.dispatch(
        mailboxActions.QUIT_MAILBOX_CLASSIFICATION_COMMENTS({
          IdCatClasificacionCorreoRecibido,
          Index,
        }),
      );
      const mail = await this.getSelectedMail();
      this.store.dispatch(mailboxActions.SET_VIEWED_MAIL_SUCCESS({mail}));
    }
  }

  async quitTempFile(IdCatClasificacionCorreoRecibido: string, input?: any): Promise<void> {
    this.store.dispatch(
      mailboxActions.QUIT_MAILBOX_TEMP_FILE({
        IdCatClasificacionCorreoRecibido,
      }),
    );
    input.value = '';
    const mail = await this.getSelectedMail();
    this.store.dispatch(mailboxActions.SET_VIEWED_MAIL_SUCCESS({mail}));
  }

  async quitClassificationReference(
    IdCatClasificacionCorreoRecibido: string,
    Index: number,
    IdArchivo?: string,
    comment?: any,
  ): Promise<void> {
    this.store.dispatch(
      mailboxActions.QUIT_MAILBOX_CLASSIFICATION_REFERENCE_SELECT({
        IdCatClasificacionCorreoRecibido,
        IdArchivo,
        IdPPPedidoOriginal: comment?.IdPPPedidoOriginal,
        Index,
      }),
    );
    const mail = await this.getSelectedMail();
    this.store.dispatch(mailboxActions.SET_VIEWED_MAIL_SUCCESS({mail}));
  }

  async getSelectedMail(): Promise<CorreoRecibidoCustom> {
    return await lastValueFrom(
      this.store.pipe(select(mailboxSelectors.selectCurrentMail), take(1)),
    );
  }

  async setClassificationTempComments(
    IdCatClasificacionCorreoRecibido: string,
    Comentario: string,
  ): Promise<void> {
    this.store.dispatch(
      mailboxActions.SET_MAILBOX_CLASSIFICATION_TEMP_COMMENTS({
        IdCatClasificacionCorreoRecibido,
        Comentario,
      }),
    );
    const mail = await this.getSelectedMail();
    this.store.dispatch(mailboxActions.SET_VIEWED_MAIL_SUCCESS({mail}));
  }

  async setClassificationTempTotal(
    IdCatClasificacionCorreoRecibido: string,
    total: string,
  ): Promise<void> {
    this.store.dispatch(
      mailboxActions.SET_MAILBOX_CLASSIFICATION_TOTAL({
        subtotal: toRound(Number(total), 2),
        IdCatClasificacionCorreoRecibido,
      }),
    );
    const mail = await this.getSelectedMail();
    this.store.dispatch(mailboxActions.SET_VIEWED_MAIL_SUCCESS({mail}));
  }

  handleDeleteMailPopEvent(value: IPopUp): void {
    if (value.value) {
      this.store.dispatch(mailboxActions.DELETE_MAIL_LOAD({spam: this.spamCheckActive}));
    }
    this.store.dispatch(mailboxActions.SHOW_DELETE_MAIL_POP({value: false}));
    this.spamCheckActive = false;
  }
}
