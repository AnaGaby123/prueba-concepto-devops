/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiLogisticaConfiguration as __Configuration } from '../api-logistica-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { ArchivoDetalle } from '../models/archivo-detalle';
@Injectable({
  providedIn: 'root',
})
class ProcesosL01CotizacionArchivoService extends __BaseService {
  static readonly cotCotizacionInvestigacionPDFCotCotizacionInvestigacionPDFPath = '/cotCotizacionInvestigacionPDF';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * cotCotizacionInvestigacionPDF cotCotizacionInvestigacionPDF
   * @param IdCotCotizacion undefined
   * @return OK
   */
  cotCotizacionInvestigacionPDFCotCotizacionInvestigacionPDFResponse(IdCotCotizacion: string): __Observable<__StrictHttpResponse<ArchivoDetalle>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (IdCotCotizacion != null) __params = __params.set('IdCotCotizacion', IdCotCotizacion.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/cotCotizacionInvestigacionPDF`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ArchivoDetalle>;
      })
    );
  }
  /**
   * cotCotizacionInvestigacionPDF cotCotizacionInvestigacionPDF
   * @param IdCotCotizacion undefined
   * @return OK
   */
  cotCotizacionInvestigacionPDFCotCotizacionInvestigacionPDF(IdCotCotizacion: string): __Observable<ArchivoDetalle> {
    return this.cotCotizacionInvestigacionPDFCotCotizacionInvestigacionPDFResponse(IdCotCotizacion).pipe(
      __map(_r => _r.body as ArchivoDetalle)
    );
  }
}

module ProcesosL01CotizacionArchivoService {
}

export { ProcesosL01CotizacionArchivoService }
