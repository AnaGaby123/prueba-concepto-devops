/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiFinanzasConfiguration as __Configuration } from '../api-finanzas-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { FccPagoFacturaAdelanto } from '../models/fcc-pago-factura-adelanto';
import { QueryResultFccPagoFacturaAdelanto } from '../models/query-result-fcc-pago-factura-adelanto';
import { QueryInfo } from '../models/query-info';
@Injectable({
  providedIn: 'root',
})
class CobranzaClientesAnticiposService extends __BaseService {
  static readonly fccPagoFacturaAdelantoObtenerPath = '/fccPagoFacturaAdelanto';
  static readonly fccPagoFacturaAdelantoGuardarOActualizarPath = '/fccPagoFacturaAdelanto';
  static readonly fccPagoFacturaAdelantoQueryResultPath = '/fccPagoFacturaAdelanto';
  static readonly fccPagoFacturaAdelantoDesactivarPath = '/fccPagoFacturaAdelanto';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Obtener fccPagoFacturaAdelanto por su idfccPagoFacturaAdelanto
   * @param idfccPagoFacturaAdelanto Identificador de fccPagoFacturaAdelanto
   * @return OK
   */
  fccPagoFacturaAdelantoObtenerResponse(idfccPagoFacturaAdelanto: string): __Observable<__StrictHttpResponse<FccPagoFacturaAdelanto>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idfccPagoFacturaAdelanto != null) __params = __params.set('idfccPagoFacturaAdelanto', idfccPagoFacturaAdelanto.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/fccPagoFacturaAdelanto`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<FccPagoFacturaAdelanto>;
      })
    );
  }
  /**
   * Obtener fccPagoFacturaAdelanto por su idfccPagoFacturaAdelanto
   * @param idfccPagoFacturaAdelanto Identificador de fccPagoFacturaAdelanto
   * @return OK
   */
  fccPagoFacturaAdelantoObtener(idfccPagoFacturaAdelanto: string): __Observable<FccPagoFacturaAdelanto> {
    return this.fccPagoFacturaAdelantoObtenerResponse(idfccPagoFacturaAdelanto).pipe(
      __map(_r => _r.body as FccPagoFacturaAdelanto)
    );
  }

  /**
   * Guardar o actualizar una dirección de empresa.
   * @param fccPagoFacturaAdelanto Dirección de empresa.
   * @return OK
   */
  fccPagoFacturaAdelantoGuardarOActualizarResponse(fccPagoFacturaAdelanto: FccPagoFacturaAdelanto): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = fccPagoFacturaAdelanto;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/fccPagoFacturaAdelanto`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'text'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<string>;
      })
    );
  }
  /**
   * Guardar o actualizar una dirección de empresa.
   * @param fccPagoFacturaAdelanto Dirección de empresa.
   * @return OK
   */
  fccPagoFacturaAdelantoGuardarOActualizar(fccPagoFacturaAdelanto: FccPagoFacturaAdelanto): __Observable<string> {
    return this.fccPagoFacturaAdelantoGuardarOActualizarResponse(fccPagoFacturaAdelanto).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Obtener lista de fccPagoFacturaAdelanto
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  fccPagoFacturaAdelantoQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultFccPagoFacturaAdelanto>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/fccPagoFacturaAdelanto`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultFccPagoFacturaAdelanto>;
      })
    );
  }
  /**
   * Obtener lista de fccPagoFacturaAdelanto
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  fccPagoFacturaAdelantoQueryResult(info: QueryInfo): __Observable<QueryResultFccPagoFacturaAdelanto> {
    return this.fccPagoFacturaAdelantoQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultFccPagoFacturaAdelanto)
    );
  }

  /**
   * Desactivar un fccPagoFacturaAdelanto.
   * @param idfccPagoFacturaAdelanto Identificador de elemento a desactivar.
   * @return OK
   */
  fccPagoFacturaAdelantoDesactivarResponse(idfccPagoFacturaAdelanto: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idfccPagoFacturaAdelanto != null) __params = __params.set('idfccPagoFacturaAdelanto', idfccPagoFacturaAdelanto.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/fccPagoFacturaAdelanto`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'text'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<string>;
      })
    );
  }
  /**
   * Desactivar un fccPagoFacturaAdelanto.
   * @param idfccPagoFacturaAdelanto Identificador de elemento a desactivar.
   * @return OK
   */
  fccPagoFacturaAdelantoDesactivar(idfccPagoFacturaAdelanto: string): __Observable<string> {
    return this.fccPagoFacturaAdelantoDesactivarResponse(idfccPagoFacturaAdelanto).pipe(
      __map(_r => _r.body as string)
    );
  }
}

module CobranzaClientesAnticiposService {
}

export { CobranzaClientesAnticiposService }
