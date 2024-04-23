/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiLogisticaConfiguration as __Configuration } from '../api-logistica-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { GMAutorizacionAjusteOferta } from '../models/gmautorizacion-ajuste-oferta';
import { GMAutorizarAjusteOferta } from '../models/gmautorizar-ajuste-oferta';
@Injectable({
  providedIn: 'root',
})
class ProcesosL02AjustarOfertaAutorizarAjusteOfertaService extends __BaseService {
  static readonly AutorizarAjusteOfertaProcessTransaccionPath = '/AjustarOferta/AutorizarAjusteOfertaTransaccion';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Servicio con funcionalida de transaccion para aplicar ajustes de oferta
   * @param GMAutorizarAjusteOferta
   * @return OK
   */
  AutorizarAjusteOfertaProcessTransaccionResponse(GMAutorizarAjusteOferta: GMAutorizarAjusteOferta): __Observable<__StrictHttpResponse<GMAutorizacionAjusteOferta>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = GMAutorizarAjusteOferta;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/AjustarOferta/AutorizarAjusteOfertaTransaccion`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<GMAutorizacionAjusteOferta>;
      })
    );
  }
  /**
   * Servicio con funcionalida de transaccion para aplicar ajustes de oferta
   * @param GMAutorizarAjusteOferta
   * @return OK
   */
  AutorizarAjusteOfertaProcessTransaccion(GMAutorizarAjusteOferta: GMAutorizarAjusteOferta): __Observable<GMAutorizacionAjusteOferta> {
    return this.AutorizarAjusteOfertaProcessTransaccionResponse(GMAutorizarAjusteOferta).pipe(
      __map(_r => _r.body as GMAutorizacionAjusteOferta)
    );
  }
}

module ProcesosL02AjustarOfertaAutorizarAjusteOfertaService {
}

export { ProcesosL02AjustarOfertaAutorizarAjusteOfertaService }
