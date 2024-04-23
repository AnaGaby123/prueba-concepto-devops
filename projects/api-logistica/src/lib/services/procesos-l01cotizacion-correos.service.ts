/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiLogisticaConfiguration as __Configuration } from '../api-logistica-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { GMEnvioCorreoCotizacion } from '../models/gmenvio-correo-cotizacion';
import { CotCotizacionCorreoEnviado } from '../models/cot-cotizacion-correo-enviado';
import { QueryResultCotCotizacionCorreoEnviado } from '../models/query-result-cot-cotizacion-correo-enviado';
import { QueryInfo } from '../models/query-info';
@Injectable({
  providedIn: 'root',
})
class ProcesosL01CotizacionCorreosService extends __BaseService {
  static readonly cotCotizacionCorreoEnviadoEnvioCorreoCotizacionTransaccionPath = '/cotCotizacionCorreoEnviado/transaccion';
  static readonly cotCotizacionCorreoEnviadoObtenerPath = '/cotCotizacionCorreoEnviado';
  static readonly cotCotizacionCorreoEnviadoGuardarOActualizarPath = '/cotCotizacionCorreoEnviado';
  static readonly cotCotizacionCorreoEnviadoQueryResultPath = '/cotCotizacionCorreoEnviado';
  static readonly cotCotizacionCorreoEnviadoDesactivarPath = '/cotCotizacionCorreoEnviado';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * EnvioCorreoCotizacionTransaccion cotCotizacionCorreoEnviado
   * @param GMEnvioCorreoCotizacion undefined
   * @return OK
   */
  cotCotizacionCorreoEnviadoEnvioCorreoCotizacionTransaccionResponse(GMEnvioCorreoCotizacion: GMEnvioCorreoCotizacion): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = GMEnvioCorreoCotizacion;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/cotCotizacionCorreoEnviado/transaccion`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{}>;
      })
    );
  }
  /**
   * EnvioCorreoCotizacionTransaccion cotCotizacionCorreoEnviado
   * @param GMEnvioCorreoCotizacion undefined
   * @return OK
   */
  cotCotizacionCorreoEnviadoEnvioCorreoCotizacionTransaccion(GMEnvioCorreoCotizacion: GMEnvioCorreoCotizacion): __Observable<{}> {
    return this.cotCotizacionCorreoEnviadoEnvioCorreoCotizacionTransaccionResponse(GMEnvioCorreoCotizacion).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * Obtener un cotCotizacionCorreoEnviado por su idcotCotizacionCorreoEnviado
   * @param idcotCotizacionCorreoEnviado identificador del cotCotizacionCorreoEnviado
   * @return OK
   */
  cotCotizacionCorreoEnviadoObtenerResponse(idcotCotizacionCorreoEnviado: string): __Observable<__StrictHttpResponse<CotCotizacionCorreoEnviado>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcotCotizacionCorreoEnviado != null) __params = __params.set('idcotCotizacionCorreoEnviado', idcotCotizacionCorreoEnviado.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/cotCotizacionCorreoEnviado`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CotCotizacionCorreoEnviado>;
      })
    );
  }
  /**
   * Obtener un cotCotizacionCorreoEnviado por su idcotCotizacionCorreoEnviado
   * @param idcotCotizacionCorreoEnviado identificador del cotCotizacionCorreoEnviado
   * @return OK
   */
  cotCotizacionCorreoEnviadoObtener(idcotCotizacionCorreoEnviado: string): __Observable<CotCotizacionCorreoEnviado> {
    return this.cotCotizacionCorreoEnviadoObtenerResponse(idcotCotizacionCorreoEnviado).pipe(
      __map(_r => _r.body as CotCotizacionCorreoEnviado)
    );
  }

  /**
   * Guardar o actualizar un cotCotizacionCorreoEnviado
   * @param cotizacion cotCotizacionCorreoEnviado a actualizar o guardar
   * @return OK
   */
  cotCotizacionCorreoEnviadoGuardarOActualizarResponse(cotizacion: CotCotizacionCorreoEnviado): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = cotizacion;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/cotCotizacionCorreoEnviado`,
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
   * Guardar o actualizar un cotCotizacionCorreoEnviado
   * @param cotizacion cotCotizacionCorreoEnviado a actualizar o guardar
   * @return OK
   */
  cotCotizacionCorreoEnviadoGuardarOActualizar(cotizacion: CotCotizacionCorreoEnviado): __Observable<string> {
    return this.cotCotizacionCorreoEnviadoGuardarOActualizarResponse(cotizacion).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Obtener lista de cotCotizacionCorreoEnviado.
   * @param info Objeto de tipo QueryInfo para obtener la lista.
   * @return OK
   */
  cotCotizacionCorreoEnviadoQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultCotCotizacionCorreoEnviado>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/cotCotizacionCorreoEnviado`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultCotCotizacionCorreoEnviado>;
      })
    );
  }
  /**
   * Obtener lista de cotCotizacionCorreoEnviado.
   * @param info Objeto de tipo QueryInfo para obtener la lista.
   * @return OK
   */
  cotCotizacionCorreoEnviadoQueryResult(info: QueryInfo): __Observable<QueryResultCotCotizacionCorreoEnviado> {
    return this.cotCotizacionCorreoEnviadoQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultCotCotizacionCorreoEnviado)
    );
  }

  /**
   * Desactivar cotCotizacionCorreoEnviado
   * @param idCotCotizacionCorreoEnviado undefined
   * @return OK
   */
  cotCotizacionCorreoEnviadoDesactivarResponse(idCotCotizacionCorreoEnviado: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idCotCotizacionCorreoEnviado != null) __params = __params.set('idCotCotizacionCorreoEnviado', idCotCotizacionCorreoEnviado.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/cotCotizacionCorreoEnviado`,
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
   * Desactivar cotCotizacionCorreoEnviado
   * @param idCotCotizacionCorreoEnviado undefined
   * @return OK
   */
  cotCotizacionCorreoEnviadoDesactivar(idCotCotizacionCorreoEnviado: string): __Observable<string> {
    return this.cotCotizacionCorreoEnviadoDesactivarResponse(idCotCotizacionCorreoEnviado).pipe(
      __map(_r => _r.body as string)
    );
  }
}

module ProcesosL01CotizacionCorreosService {
}

export { ProcesosL01CotizacionCorreosService }
