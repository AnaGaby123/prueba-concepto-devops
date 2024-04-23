import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import * as mailboxActions from '@appActions/mailbox/mailbox.actions';
import {select, Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {lastValueFrom, Observable} from 'rxjs';
import * as mailboxSelectors from '@appSelectors/mailbox/mailbox.selectors';
import {ICard} from '@appModels/card/card';
import {take} from 'rxjs/operators';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {filter} from 'lodash-es';
import {CorreoRecibidoCustom} from '@appModels/store/mailbox/mailbox.models';
import {getOnlyFileExtension, getOnlyFileName} from '@appUtil/files';
import {appRoutes} from '@appHelpers/core/app-routes';

@Component({
  selector: 'app-linkmail',
  templateUrl: './linkmail.component.html',
  styleUrls: ['./linkmail.component.scss'],
})
export class LinkmailComponent implements OnInit, OnDestroy {
  currentMail$: Observable<CorreoRecibidoCustom> = this.store.select(
    mailboxSelectors.selectCurrentMail,
  );
  countOCPendingNotLinked$: Observable<number> = this.store.select(
    mailboxSelectors.selectCountOcPendingNotLinked,
  );
  countFilesNotLinked$: Observable<number> = this.store.select(
    mailboxSelectors.selectCountFilesNotLinked,
  );
  filesCardOptions$: Observable<Array<ICard>> = this.store.select(
    mailboxSelectors.mailFilesToCardOptions,
  );
  ocPendingCardOptions$: Observable<Array<ICard>> = this.store.select(
    mailboxSelectors.ocPendingToCardOptions,
  );
  mailUrlFileActive$: Observable<string> = this.store.select(mailboxSelectors.mailUrlFileActive);
  mailUrlOCPendingActive$: Observable<string> = this.store.select(
    mailboxSelectors.mailUrlOCPendingActive,
  );

  constructor(private store: Store<AppState>, private router: Router) {}

  title: string;

  async ngOnInit(): Promise<void> {
    this.title = 'BUZÓN PEDIDOS';
    this.store.dispatch(mailboxActions.SET_MAILBOX_TITLE({title: this.title}));
    this.store.dispatch(mailboxActions.BLOCK_CLASSIFICATIONS_EDITION({value: false}));
    const client = await lastValueFrom(
      this.store.pipe(select(mailboxSelectors.selectCurrentMailClient), take(1)),
    );
    if (client) {
      this.store.dispatch(mailboxActions.GET_LIST_CLIENT_OC_PENDING_LOAD());
    }
  }

  ngOnDestroy(): void {
    this.store.dispatch(mailboxActions.SET_LINK_MAIL_ACTIVATE({linkMailActive: false}));
    this.store.dispatch(mailboxActions.SET_MAILBOX_NAME({name: ''}));
  }

  async selectFile(selectedCard: ICard): Promise<void> {
    this.store.dispatch(
      mailboxActions.SET_FILE_OC_IS_PREVIEW({
        fileType: 'file',
        value: false,
      }),
    );
    this.store.dispatch(
      mailboxActions.SET_FILE_OC_IS_ACTIVE({
        fileType: 'file',
        value: false,
      }),
    );
    const files = await lastValueFrom(
      this.store.pipe(select(mailboxSelectors.selectFiles), take(1)),
    );
    const selectedFile = filter(files, (o) => o.IdArchivo === selectedCard.value);
    if (!selectedFile[0].IdArchivo) {
      this.store.dispatch(
        mailboxActions.SET_FILE_OC_MESSAGE({
          fileType: 'file',
          message: 'ARCHIVO NO ENCONTRADO',
        }),
      );
    } else {
      this.store.dispatch(mailboxActions.SET_CARD_FILE_ACTIVE({IdArchivo: selectedCard.value}));
      const extension = getOnlyFileExtension(selectedFile[0].FileKey);
      if (extension !== 'pdf') {
        this.store.dispatch(
          mailboxActions.SET_FILE_OC_MESSAGE({
            fileType: 'file',
            message: 'EL ARCHIVO SELECCIONADO NO SE PUEDE VISUALIZAR',
          }),
        );
        this.store.dispatch(
          mailboxActions.SET_FILE_OC_IS_ACTIVE({
            fileType: 'file',
            value: true,
          }),
        );
      } else {
        if (!selectedFile[0].Url || selectedFile[0].Url === '') {
          this.store.dispatch(mailboxActions.SET_FILE_OC_LOADING({fileType: 'file', value: true}));
          this.store.dispatch(
            mailboxActions.GET_URL_FILE_LOAD({
              IdArchivo: selectedCard.value,
              fileType: 'file',
            }),
          );
        } else {
          this.store.dispatch(
            mailboxActions.GET_URL_FILE_SUCCESS({
              IdArchivo: selectedCard.value,
              Url: selectedFile[0].Url,
            }),
          );
          this.store.dispatch(
            mailboxActions.SET_FILE_OC_IS_PREVIEW({
              fileType: 'file',
              value: true,
            }),
          );
          this.store.dispatch(
            mailboxActions.SET_FILE_OC_IS_ACTIVE({
              fileType: 'file',
              value: true,
            }),
          );
          this.store.dispatch(
            mailboxActions.SET_FILE_OC_LOADING({
              fileType: 'file',
              value: false,
            }),
          );
        }
      }
    }
  }

  async selectOCFile(selectedCard: ICard): Promise<void> {
    this.store.dispatch(
      mailboxActions.SET_FILE_OC_IS_PREVIEW({
        fileType: 'oc',
        value: false,
      }),
    );
    this.store.dispatch(
      mailboxActions.SET_FILE_OC_IS_ACTIVE({
        fileType: 'oc',
        value: false,
      }),
    );
    const ocs = await lastValueFrom(
      this.store.pipe(select(mailboxSelectors.selectOCPendingList), take(1)),
    );
    const selectedOC = filter(ocs, (o) => o.IdPPPedido === selectedCard.value);
    if (!selectedOC[0].IdArchivo) {
      this.store.dispatch(
        mailboxActions.SET_FILE_OC_MESSAGE({
          fileType: 'oc',
          message: 'ARCHIVO NO ENCONTRADO',
        }),
      );
    } else {
      this.store.dispatch(
        mailboxActions.SET_CARD_OC_PENDING_ACTIVE({
          IdPPPedido: selectedCard.value,
        }),
      );
      if (!selectedOC[0].Url || selectedOC[0].Url === '') {
        this.store.dispatch(
          mailboxActions.SET_CARD_OC_PENDING_ACTIVE({
            IdPPPedido: selectedCard.value,
          }),
        );
        this.store.dispatch(mailboxActions.SET_FILE_OC_LOADING({fileType: 'oc', value: true}));
        this.store.dispatch(
          mailboxActions.GET_URL_FILE_LOAD({
            IdArchivo: selectedOC[0].IdArchivo,
            fileType: 'oc',
          }),
        );
      } else {
        const extension = getOnlyFileExtension(selectedOC[0].FileKey);
        this.store.dispatch(
          mailboxActions.SET_FILE_OC_IS_ACTIVE({
            fileType: 'oc',
            value: true,
          }),
        );
        if (extension !== 'pdf') {
          this.store.dispatch(
            mailboxActions.SET_FILE_OC_MESSAGE({
              fileType: 'oc',
              message: 'EL ARCHIVO SELECCIONADO NO SE PUEDE VISUALIZAR',
            }),
          );
        } else {
          this.store.dispatch(
            mailboxActions.SET_CARD_OC_PENDING_ACTIVE({
              IdPPPedido: selectedCard.value,
            }),
          );
          this.store.dispatch(
            mailboxActions.GET_URL_OC_PENDING_SUCCESS({
              IdArchivo: selectedOC[0].IdArchivo,
              Url: selectedOC[0].Url,
            }),
          );
          this.store.dispatch(
            mailboxActions.SET_FILE_OC_IS_PREVIEW({
              fileType: 'oc',
              value: true,
            }),
          );
          this.store.dispatch(
            mailboxActions.SET_FILE_OC_LOADING({
              fileType: 'oc',
              value: false,
            }),
          );
        }
      }
    }
  }

  async linkFiles(): Promise<void> {
    const classifications = await lastValueFrom(
      this.store.pipe(select(mailboxSelectors.selectCurrentMailReferencesClasifications), take(1)),
    );
    const files = await lastValueFrom(
      this.store.pipe(select(mailboxSelectors.mailFileActive), take(1)),
    );
    const ocPending = await this.getOcPendingActive();
    const reference: Array<DropListOption> = filter(
      classifications[1].CatClasificacionCorreoRecibidoReferencia,
      (o) => o.labelKey === 'occliente',
    );
    this.store.dispatch(
      mailboxActions.SET_MAILBOX_CLASSIFICATION({
        IdCatClasificacionCorreoRecibido: classifications[1].IdCatClasificacionCorreoRecibido,
        value: true,
      }),
    );
    this.store.dispatch(
      mailboxActions.SET_TEMP_FILE_NAME({
        IdCatClasificacionCorreoRecibido: classifications[1].IdCatClasificacionCorreoRecibido,
        IdArchivo: files[0].IdArchivo,
        IdArchivoCorreoRecibido: files[0].IdArchivoCorreoRecibido,
        filename: getOnlyFileName(files[0].FileKey),
      }),
    );
    this.store.dispatch(
      mailboxActions.SET_MAILBOX_CLASSIFICATION_TEMP_REFERENCE({
        IdCatClasificacionCorreoRecibido: classifications[1].IdCatClasificacionCorreoRecibido,
        CatClasificacionCorreoRecibidoReferencia: reference[0],
      }),
    );
    this.store.dispatch(
      mailboxActions.SET_MAILBOX_CLASSIFICATION_TEMP_REFERENCE_COMMENTS({
        IdCatClasificacionCorreoRecibido: classifications[1].IdCatClasificacionCorreoRecibido,
        Comentario: ocPending[0].OrdenDeCompra,
      }),
    );
    this.store.dispatch(
      mailboxActions.SET_MAILBOX_CLASSIFICATION_TEMP_REFERENCE_ID_PPPEDIDO({
        IdCatClasificacionCorreoRecibido: classifications[1].IdCatClasificacionCorreoRecibido,
        IdPPPedido: ocPending[0].IdPPPedido,
      }),
    );
    const mail = await lastValueFrom(
      this.store.pipe(select(mailboxSelectors.selectCurrentMail), take(1)),
    );
    this.store.dispatch(mailboxActions.SET_VIEWED_MAIL_SUCCESS({mail}));
    await this.router.navigate([
      appRoutes.protected,
      appRoutes.pendings.pendings,
      appRoutes.mails.mailbox,
      appRoutes.mails.mailsList,
    ]);
  }

  async getOcPendingActive(): Promise<any> {
    return await lastValueFrom(
      this.store.pipe(select(mailboxSelectors.mailOCPendingActive), take(1)),
    );
  }
}
