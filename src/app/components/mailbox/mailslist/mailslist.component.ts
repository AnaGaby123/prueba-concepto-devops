import {Component, OnInit} from '@angular/core';
import {lastValueFrom, Observable} from 'rxjs';
import {take} from 'rxjs/operators';
import {select, Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {
  ArchivoCustom,
  CorreoRecibidoClienteCustom,
  CorreoRecibidoCustom,
  OCPendientesAjusteCustom,
  VCorreoClienteCustom,
} from '@appModels/store/mailbox/mailbox.models';
import * as mailboxSelectors from '@appSelectors/mailbox/mailbox.selectors';
import * as mailboxActions from '@appActions/mailbox/mailbox.actions';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {debounce, filter, findIndex, forEach, isEmpty} from 'lodash-es';
import {IPageInfo} from '@iharbeck/ngx-virtual-scroller';
import {Archivo, CorreosClientesTotales} from 'api-catalogos';
import {DEFAULT_TIME_DEBOUNCE_SEARCH, ENUM_USER_FUNCTIONS} from '@appUtil/common.protocols';
import {selectUserFunctions} from '@appSelectors/auth/auth.selectors';
import {mailboxNotification} from '@appUtil/animations';
import {Router} from '@angular/router';
import {IFetchMoreItemsInfo} from '@appModels/store/utils/utils.model';
import {getOnlyFileName} from '@appUtil/files';
import {appRoutes} from '@appHelpers/core/app-routes';

@Component({
  selector: 'app-mailslist',
  templateUrl: './mailslist.component.html',
  styleUrls: ['./mailslist.component.scss'],
  animations: mailboxNotification,
})
export class MailslistComponent implements OnInit {
  mails$: Observable<VCorreoClienteCustom[]> = this.store.select(
    mailboxSelectors.selectReceivedMailsArray,
  );
  selectedMail$: Observable<CorreoRecibidoCustom> = this.store.select(
    mailboxSelectors.selectCurrentMail,
  );
  clientReceivedMails$: Observable<CorreoRecibidoClienteCustom[]> = this.store.select(
    mailboxSelectors.selectCurrentMailReferencesClasifications,
  );
  mailIsSelected$: Observable<boolean> = this.store.select(mailboxSelectors.selectMailIsSelected);
  scrolledMails: VCorreoClienteCustom[];
  orderValueId$: Observable<DropListOption> = this.store.select(
    mailboxSelectors.selectOrderValueId,
  );
  searchTerm$: Observable<string> = this.store.select(mailboxSelectors.selectSearchTerm);
  defaultClassifIsSelected$: Observable<boolean> = this.store.select(
    mailboxSelectors.selectDefaultClassificationIsSelected,
  );
  oCPending$: Observable<OCPendientesAjusteCustom> = this.store.select(
    mailboxSelectors.selectOCPending,
  );
  countOCPendingNotLinked$: Observable<any> = this.store.select(
    mailboxSelectors.selectCountOcPendingNotLinked,
  );
  isLoading$: Observable<number> = this.store.select(mailboxSelectors.selectIsLoading);
  isMessageLoading$: Observable<boolean> = this.store.select(
    mailboxSelectors.selectIsMessageLoading,
  );
  blockClassificationsEdition$: Observable<boolean> = this.store.select(
    mailboxSelectors.selectBlockClassificationsEdition,
  );
  validation$: Observable<boolean> = this.store.select(
    mailboxSelectors.selectButtonValidationByRol,
  );
  clientsWithSameMail$: Observable<Array<DropListOption>> = this.store.select(
    mailboxSelectors.selectClientsWithSameMail,
  );
  selectedDropClient$: Observable<DropListOption> = this.store.select(
    mailboxSelectors.selectedClientToDrop,
  );
  totalsFooter$: Observable<CorreosClientesTotales> = this.store.select(
    mailboxSelectors.selectTotalFooter,
  );
  filterOptions: DropListOption[] = [
    {
      value: 'desc',
      label: 'Más Nuevos',
    },
    {
      value: 'asc',
      label: 'Más Antiguos',
    },
  ];
  handleSearch = debounce(
    (searchTerm) => this.searchMails(searchTerm),
    DEFAULT_TIME_DEBOUNCE_SEARCH,
  );
  userIsEVI = false;
  userIsAnalistaDeCuentasPorCobrar = false;
  userIsESAC = false;
  userIsCoordinadorDeServicioAlCliente = false;
  userIsSuper = false;
  title: string;
  lodashIsEmpty = isEmpty;

  constructor(private store: Store<AppState>, private router: Router) {}

  async ngOnInit(): Promise<void> {
    this.store.dispatch(
      mailboxActions.GET_MAILBOX_LIST_LOAD({
        isFirstPage: true,
      }),
    );
    const userFunctions = await lastValueFrom(
      this.store.pipe(select(selectUserFunctions), take(1)),
    );
    forEach(userFunctions, (o) => {
      switch (o) {
        case ENUM_USER_FUNCTIONS.functionEvi:
          this.userIsEVI = findIndex(userFunctions, ENUM_USER_FUNCTIONS.functionEvi) !== 1;
          this.title = 'BUSCAR REQUISICIONES DE COTIZACIÓN';
          break;
        case ENUM_USER_FUNCTIONS.functionCoordinadorDeServicioAlCliente:
          this.userIsCoordinadorDeServicioAlCliente =
            findIndex(userFunctions, ENUM_USER_FUNCTIONS.functionCoordinadorDeServicioAlCliente) !==
            1;
          this.title = 'BUSCAR REQUISICIONES DE COTIZACIÓN';
          break;
        case ENUM_USER_FUNCTIONS.functionEsac:
          this.userIsESAC = findIndex(userFunctions, ENUM_USER_FUNCTIONS.functionEsac) !== 1;
          this.title = 'BUSCAR REQUERIMIENTOS';
          break;
        case ENUM_USER_FUNCTIONS.functionAnalistaDeCuentasPorCobrar:
          this.userIsAnalistaDeCuentasPorCobrar =
            findIndex(userFunctions, ENUM_USER_FUNCTIONS.functionAnalistaDeCuentasPorCobrar) !== 1;
          this.title = 'BUSCAR REQUERIMIENTOS';
          break;
        case ENUM_USER_FUNCTIONS.functionSuper:
          this.userIsSuper = findIndex(userFunctions, ENUM_USER_FUNCTIONS.functionSuper) !== 1;
          break;
        default:
          this.title = 'BUZÓN';
      }
    });
    this.store.dispatch(mailboxActions.SET_MAILBOX_TITLE({title: this.title}));
  }

  async fetchMore(event: IPageInfo): Promise<void> {
    const {
      itemList,
      itemsTotalLength,
      listRequestStatus,
      desiredPage,
      totalPages,
    }: IFetchMoreItemsInfo = await lastValueFrom(
      this.store.pipe(select(mailboxSelectors.selectFetchMoreProvidersInfo), take(1)),
    );

    // DOCS Validar antes de pedir la siguiente página
    if (
      event.endIndex !== itemList.length - 1 || // DOCS El index del último item no coincida con el final de la página
      event.endIndex === itemsTotalLength - 1 || // DOCS Ya se cargaron todos los resultados
      itemsTotalLength === 0 || // DOCS No hay resultados
      desiredPage > totalPages || // DOCS Se intenta cargar una página que no existe
      itemList.length > itemsTotalLength || // DOCS La lista actual supera el total de resultados
      listRequestStatus === 1 // DOCS Se está obteniendo una página
    ) {
      return;
    }
    this.store.dispatch(
      mailboxActions.GET_MAILBOX_LIST_LOAD({
        isFirstPage: false,
      }),
    );
  }

  sendMail(): void {
    this.store.dispatch(mailboxActions.SEND_MAIL_LOAD());
  }

  deleteMail(): void {
    this.store.dispatch(mailboxActions.SHOW_DELETE_MAIL_POP({value: true}));
  }

  orderMails(orderValue: DropListOption): void {
    this.store.dispatch(mailboxActions.SET_ORDER_VALUE({orderValue}));
  }

  searchMails(searchTerm: string): void {
    this.store.dispatch(mailboxActions.SET_MAILBOX_SEARCH_TERM({searchTerm}));
  }

  async selectEmail(mail: VCorreoClienteCustom): Promise<void> {
    let findedInViewed = false;
    const viewedMails: CorreoRecibidoCustom[] = await this.getViewedMails();
    this.store.dispatch(mailboxActions.SET_EMAIL_SELECTED({idEmail: mail.IdCorreoRecibido}));
    forEach(viewedMails, (o) => {
      if (o.CorreoRecibido.IdCorreoRecibido === mail.IdCorreoRecibido) {
        this.store.dispatch(mailboxActions.GET_SELECTED_FULL_MAIL_SUCCESS({mail: o}));
        findedInViewed = true;
        return;
      }
    });
    if (!findedInViewed) {
      const functions = await this.getFunctions();
      this.store.dispatch(
        mailboxActions.SET_MAIL_READ_BY_ROL({
          IdCorreoRecibido: mail.IdCorreoRecibido,
          Functions: functions,
        }),
      );
    }
  }

  async unlink(IdArchivo: string): Promise<void> {
    const classifications = await this.getReceivedMails();

    const reference = filter(
      classifications[1].CorreoRecibidoClienteReferencia,
      (o) => o.IdArchivo === IdArchivo,
    );
    this.store.dispatch(
      mailboxActions.QUIT_MAILBOX_CLASSIFICATION_REFERENCE_SELECT({
        IdCatClasificacionCorreoRecibido: classifications[1].IdCatClasificacionCorreoRecibido,
        IdArchivo,
        IdPPPedidoOriginal: reference[0].IdPPPedidoOriginal,
      }),
    );
  }

  downloadFile(file: Archivo): void {
    this.store.dispatch(mailboxActions.GET_URL_TO_DOWNLOAD_FILE_LOAD({IdArchivo: file.IdArchivo}));
    const subs = this.store.select(mailboxSelectors.selectTempUrl).subscribe((data) => {
      if (data) {
        const a = document.createElement('a');
        const fileName = getOnlyFileName(file.FileKey);
        a.setAttribute('href', data);
        a.setAttribute('download', fileName);
        a.setAttribute('target', '_blank');
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        this.store.dispatch(
          mailboxActions.GET_URL_TO_DOWNLOAD_FILE_SUCCESS({
            IdArchivo: file.IdArchivo,
            Url: '',
          }),
        );
        subs.unsubscribe();
      }
    });
  }

  async redirectTolinkMail(): Promise<void> {
    this.store.dispatch(mailboxActions.SET_LINK_MAIL_ACTIVATE({linkMailActive: true}));
    const mail = await lastValueFrom(
      this.store.pipe(select(mailboxSelectors.selectCurrentMail), take(1)),
    );

    this.store.dispatch(
      mailboxActions.SET_MAILBOX_NAME({
        name: mail.Cliente ? mail.Cliente.Alias : '',
      }),
    );
    await this.router.navigate([
      appRoutes.protected,
      appRoutes.pendings.pendings,
      appRoutes.mails.mailbox,
      appRoutes.mails.linkMail,
    ]);
  }

  async getViewedMails(): Promise<CorreoRecibidoCustom[]> {
    return await lastValueFrom(
      this.store.pipe(select(mailboxSelectors.selectViewedMailsArray), take(1)),
    );
  }

  async getReceivedMails(): Promise<any> {
    return await lastValueFrom(
      this.store.pipe(select(mailboxSelectors.selectCurrentMailReferencesClasifications), take(1)),
    );
  }

  async getFunctions(): Promise<string[]> {
    return await lastValueFrom(this.store.pipe(select(selectUserFunctions), take(1)));
  }

  handleTrackByItem(index: number, item: VCorreoClienteCustom): string {
    return item.IdCorreoRecibido;
  }
  handleSelectedDropClient(selectedClientToDrop: DropListOption) {
    this.store.dispatch(mailboxActions.HANDLE_SELECTED_DROP_CLIENT({selectedClientToDrop}));
  }
  handleShowFile(file: ArchivoCustom) {
    const lastIndex = file.FileKey.lastIndexOf('.');
    const ext = file.FileKey.slice(lastIndex + 1);
    this.store.dispatch(mailboxActions.VIEW_FILE_LOAD({IdArchivo: file.IdArchivo, ext}));
  }
}
