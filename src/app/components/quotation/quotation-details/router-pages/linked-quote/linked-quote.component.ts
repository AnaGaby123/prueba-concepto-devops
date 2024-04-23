/* Core Imports */
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {flatMap, join} from 'lodash-es';

/* Modal Imports */
import {IRelate} from '@appModels/store/quotation/quotation-details/details/sections/list-quotes.models';
import {IDropListMulti} from '@appModels/drop-list/drop-list-option';
import {IDataMail} from '@appModels/correo/correo';

/* Actions Imports */
import {
  FETCH_FILE_PDF_LOAD,
  SET_MODAL_IS_OPEN_RESEND_QUOTATION,
} from '@appActions/quotation/quotation-details/details/list-quotes/list-quotes.actions';

/* Selectors Imports */
import {selectOptionsContactEmail} from '@appSelectors/quotation/quotation-details/quotation-details.selectors';
import {DEFAULT_DATE, DEFAULT_UUID} from '@appUtil/common.protocols';
import {CorreoEnviado} from 'api-catalogos';
import {listQuotesActions} from '@appActions/quotation';
import {quotationDetailsSelectors} from '@appSelectors/quotation';
import {appRoutes} from '@appHelpers/core/app-routes';

@Component({
  selector: 'app-linked-quote',
  templateUrl: './linked-quote.component.html',
  styleUrls: ['./linked-quote.component.scss'],
})
export class LinkedQuoteComponent implements OnInit {
  contacts$: Observable<Array<IDropListMulti>> = this.store.select(selectOptionsContactEmail);
  dataLinked$: Observable<IRelate> = this.store.select(quotationDetailsSelectors.selectLinkedQuote);
  file$: Observable<string> = this.store.select(quotationDetailsSelectors.selectBase64PDF);
  modalIsOpenResendQuotation$: Observable<boolean> = this.store.select(
    quotationDetailsSelectors.selectModalIsOpenResendQuotation,
  );
  title = 'COTIZACIÓN VINCULADA';

  constructor(private store: Store, private route: Router) {}

  ngOnInit(): void {
    this.store.dispatch(FETCH_FILE_PDF_LOAD());
  }

  redirectTo(): void {
    this.route.navigate([
      appRoutes.protected,
      appRoutes.pendings.pendings,
      appRoutes.quoter.quoter,
      appRoutes.quoter.details,
      appRoutes.quoter.quotationPreview,
    ]);
  }

  handleModalIsOpenResendQuotation(value: boolean): void {
    this.store.dispatch(SET_MODAL_IS_OPEN_RESEND_QUOTATION({value}));
  }

  handleResendQuotation(dataMail?: IDataMail): void {
    const contacts = flatMap(dataMail.to, (o: IDropListMulti) => o.labels[2].label);
    const term: CorreoEnviado = {
      IdCorreoEnviado: DEFAULT_UUID,
      ReceptoresCSV: join(contacts, ','),
      ConCopiaCSV: join(dataMail.carbonCopy, ','),
      Asunto: dataMail.subject,
      FechaRegistro: DEFAULT_DATE,
      FechaUltimaActualizacion: DEFAULT_UUID,
      Activo: true,
    };
    this.store.dispatch(
      listQuotesActions.SEND_QUOTATION_PART_1({
        activeChangeQuotationState: false,
        sendEmailData: term,
        comments: dataMail.additionalComments,
      }),
    );
  }
}
