/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiCatalogosConfiguration as __Configuration } from '../api-catalogos-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { ContratoClienteMarcaConfiguracion } from '../models/contrato-cliente-marca-configuracion';
import { QueryResultContratoClienteMarcaConfiguracion } from '../models/query-result-contrato-cliente-marca-configuracion';
import { QueryInfo } from '../models/query-info';
@Injectable({
  providedIn: 'root',
})
class ConfiguracionClientesContratoMarcasConfiguracionesParametrizacionService extends __BaseService {
  static readonly ContratoClienteMarcaConfiguracionObtenerPath = '/ContratoClienteMarcaConfiguracion';
  static readonly ContratoClienteMarcaConfiguracionGuardarOActualizarPath = '/ContratoClienteMarcaConfiguracion';
  static readonly ContratoClienteMarcaConfiguracionQueryResultPath = '/ContratoClienteMarcaConfiguracion';
  static readonly ContratoClienteMarcaConfiguracionDesactivarPath = '/ContratoClienteMarcaConfiguracion';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Consultar registro de ContratoClienteMarcaConfiguracion
   * @param idContratoClienteMarcaConfiguracion Identificador de ContratoClienteMarcaConfiguracion
   * @return OK
   */
  ContratoClienteMarcaConfiguracionObtenerResponse(idContratoClienteMarcaConfiguracion: string): __Observable<__StrictHttpResponse<ContratoClienteMarcaConfiguracion>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idContratoClienteMarcaConfiguracion != null) __params = __params.set('idContratoClienteMarcaConfiguracion', idContratoClienteMarcaConfiguracion.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/ContratoClienteMarcaConfiguracion`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ContratoClienteMarcaConfiguracion>;
      })
    );
  }
  /**
   * Consultar registro de ContratoClienteMarcaConfiguracion
   * @param idContratoClienteMarcaConfiguracion Identificador de ContratoClienteMarcaConfiguracion
   * @return OK
   */
  ContratoClienteMarcaConfiguracionObtener(idContratoClienteMarcaConfiguracion: string): __Observable<ContratoClienteMarcaConfiguracion> {
    return this.ContratoClienteMarcaConfiguracionObtenerResponse(idContratoClienteMarcaConfiguracion).pipe(
      __map(_r => _r.body as ContratoClienteMarcaConfiguracion)
    );
  }

  /**
   * Guardar o actualizar ContratoClienteMarcaConfiguracion
   * @param ContratoClienteMarcaConfiguracion ContratoClienteMarcaConfiguracion
   * @return OK
   */
  ContratoClienteMarcaConfiguracionGuardarOActualizarResponse(ContratoClienteMarcaConfiguracion: ContratoClienteMarcaConfiguracion): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = ContratoClienteMarcaConfiguracion;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/ContratoClienteMarcaConfiguracion`,
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
   * Guardar o actualizar ContratoClienteMarcaConfiguracion
   * @param ContratoClienteMarcaConfiguracion ContratoClienteMarcaConfiguracion
   * @return OK
   */
  ContratoClienteMarcaConfiguracionGuardarOActualizar(ContratoClienteMarcaConfiguracion: ContratoClienteMarcaConfiguracion): __Observable<string> {
    return this.ContratoClienteMarcaConfiguracionGuardarOActualizarResponse(ContratoClienteMarcaConfiguracion).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de ContratoClienteMarcaConfiguracion
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  ContratoClienteMarcaConfiguracionQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultContratoClienteMarcaConfiguracion>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/ContratoClienteMarcaConfiguracion`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultContratoClienteMarcaConfiguracion>;
      })
    );
  }
  /**
   * Consultar lista paginada de ContratoClienteMarcaConfiguracion
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  ContratoClienteMarcaConfiguracionQueryResult(info: QueryInfo): __Observable<QueryResultContratoClienteMarcaConfiguracion> {
    return this.ContratoClienteMarcaConfiguracionQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultContratoClienteMarcaConfiguracion)
    );
  }

  /**
   * Desactivar registro de ContratoClienteMarcaConfiguracion
   * @param idContratoClienteMarcaConfiguracion Identificador de registro de ContratoClienteMarcaConfiguracion
   * @return OK
   */
  ContratoClienteMarcaConfiguracionDesactivarResponse(idContratoClienteMarcaConfiguracion: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idContratoClienteMarcaConfiguracion != null) __params = __params.set('idContratoClienteMarcaConfiguracion', idContratoClienteMarcaConfiguracion.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/ContratoClienteMarcaConfiguracion`,
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
   * Desactivar registro de ContratoClienteMarcaConfiguracion
   * @param idContratoClienteMarcaConfiguracion Identificador de registro de ContratoClienteMarcaConfiguracion
   * @return OK
   */
  ContratoClienteMarcaConfiguracionDesactivar(idContratoClienteMarcaConfiguracion: string): __Observable<string> {
    return this.ContratoClienteMarcaConfiguracionDesactivarResponse(idContratoClienteMarcaConfiguracion).pipe(
      __map(_r => _r.body as string)
    );
  }
}

module ConfiguracionClientesContratoMarcasConfiguracionesParametrizacionService {
}

export { ConfiguracionClientesContratoMarcasConfiguracionesParametrizacionService }
