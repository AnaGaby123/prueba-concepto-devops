/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiCatalogosConfiguration as __Configuration } from '../api-catalogos-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { CorreoRecibidoCliente } from '../models/correo-recibido-cliente';
import { QueryResultCorreoRecibidoCliente } from '../models/query-result-correo-recibido-cliente';
import { QueryInfo } from '../models/query-info';
import { ParametroGeneradorProcesoMailBot } from '../models/parametro-generador-proceso-mail-bot';
import { CorreoRecibidoClienteReferencia } from '../models/correo-recibido-cliente-referencia';
import { QueryResultCorreoRecibidoClienteReferencia } from '../models/query-result-correo-recibido-cliente-referencia';
import { CorreosClientesTotales } from '../models/correos-clientes-totales';
import { ParametroCorreosClientesTotales } from '../models/parametro-correos-clientes-totales';
@Injectable({
  providedIn: 'root',
})
class SistemaCorreosMailBotsClientesService extends __BaseService {
  static readonly CorreoRecibidoClienteObtenerPath = '/CorreoRecibidoCliente';
  static readonly CorreoRecibidoClienteGuardarOActualizarPath = '/CorreoRecibidoCliente';
  static readonly CorreoRecibidoClienteQueryResultPath = '/CorreoRecibidoCliente';
  static readonly CorreoRecibidoClienteDesactivarPath = '/CorreoRecibidoCliente';
  static readonly CorreoRecibidoClienteExtensionsMarcarLeidoMailPath = '/MarcarLeidoMailBot';
  static readonly CorreoRecibidoClienteExtensionsProcesarTransaccionPath = '/GeneradorProcesoMailBot/transaccion';
  static readonly CorreoRecibidoClienteReferenciaObtenerPath = '/CorreoRecibidoClienteReferencia';
  static readonly CorreoRecibidoClienteReferenciaGuardarOActualizarPath = '/CorreoRecibidoClienteReferencia';
  static readonly CorreoRecibidoClienteReferenciaQueryResultPath = '/CorreoRecibidoClienteReferencia';
  static readonly CorreoRecibidoClienteReferenciaDesactivarPath = '/CorreoRecibidoClienteReferencia';
  static readonly CorreosClientesTotalesProcessPath = '/CorreosClientesTotales';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Consultar registro de CorreoRecibidoCliente
   * @param idCorreoRecibidoCliente Identificador de CorreoRecibidoCliente
   * @return OK
   */
  CorreoRecibidoClienteObtenerResponse(idCorreoRecibidoCliente: string): __Observable<__StrictHttpResponse<CorreoRecibidoCliente>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idCorreoRecibidoCliente != null) __params = __params.set('idCorreoRecibidoCliente', idCorreoRecibidoCliente.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/CorreoRecibidoCliente`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CorreoRecibidoCliente>;
      })
    );
  }
  /**
   * Consultar registro de CorreoRecibidoCliente
   * @param idCorreoRecibidoCliente Identificador de CorreoRecibidoCliente
   * @return OK
   */
  CorreoRecibidoClienteObtener(idCorreoRecibidoCliente: string): __Observable<CorreoRecibidoCliente> {
    return this.CorreoRecibidoClienteObtenerResponse(idCorreoRecibidoCliente).pipe(
      __map(_r => _r.body as CorreoRecibidoCliente)
    );
  }

  /**
   * Guardar o actualizar CorreoRecibidoCliente
   * @param correoRecibidoCliente CorreoRecibidoCliente
   * @return OK
   */
  CorreoRecibidoClienteGuardarOActualizarResponse(correoRecibidoCliente: CorreoRecibidoCliente): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = correoRecibidoCliente;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/CorreoRecibidoCliente`,
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
   * Guardar o actualizar CorreoRecibidoCliente
   * @param correoRecibidoCliente CorreoRecibidoCliente
   * @return OK
   */
  CorreoRecibidoClienteGuardarOActualizar(correoRecibidoCliente: CorreoRecibidoCliente): __Observable<string> {
    return this.CorreoRecibidoClienteGuardarOActualizarResponse(correoRecibidoCliente).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de CorreoRecibidoCliente
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  CorreoRecibidoClienteQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultCorreoRecibidoCliente>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/CorreoRecibidoCliente`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultCorreoRecibidoCliente>;
      })
    );
  }
  /**
   * Consultar lista paginada de CorreoRecibidoCliente
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  CorreoRecibidoClienteQueryResult(info: QueryInfo): __Observable<QueryResultCorreoRecibidoCliente> {
    return this.CorreoRecibidoClienteQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultCorreoRecibidoCliente)
    );
  }

  /**
   * Desactivar registro de CorreoRecibidoCliente
   * @param idCorreoRecibidoCliente Identificador de registro de CorreoRecibidoCliente
   * @return OK
   */
  CorreoRecibidoClienteDesactivarResponse(idCorreoRecibidoCliente: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idCorreoRecibidoCliente != null) __params = __params.set('idCorreoRecibidoCliente', idCorreoRecibidoCliente.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/CorreoRecibidoCliente`,
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
   * Desactivar registro de CorreoRecibidoCliente
   * @param idCorreoRecibidoCliente Identificador de registro de CorreoRecibidoCliente
   * @return OK
   */
  CorreoRecibidoClienteDesactivar(idCorreoRecibidoCliente: string): __Observable<string> {
    return this.CorreoRecibidoClienteDesactivarResponse(idCorreoRecibidoCliente).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * MarcarLeidoMail CorreoRecibidoClienteExtensions
   * @param param undefined
   */
  CorreoRecibidoClienteExtensionsMarcarLeidoMailResponse(param: ParametroGeneradorProcesoMailBot): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = param;
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/MarcarLeidoMailBot`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * MarcarLeidoMail CorreoRecibidoClienteExtensions
   * @param param undefined
   */
  CorreoRecibidoClienteExtensionsMarcarLeidoMail(param: ParametroGeneradorProcesoMailBot): __Observable<null> {
    return this.CorreoRecibidoClienteExtensionsMarcarLeidoMailResponse(param).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Procesa con transacción el correo recibido del cliente generando
   * los procesos de acuerdo con la clasificación del usuario
   * @param param
   * @return OK
   */
  CorreoRecibidoClienteExtensionsProcesarTransaccionResponse(param: ParametroGeneradorProcesoMailBot): __Observable<__StrictHttpResponse<ParametroGeneradorProcesoMailBot>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = param;
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/GeneradorProcesoMailBot/transaccion`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ParametroGeneradorProcesoMailBot>;
      })
    );
  }
  /**
   * Procesa con transacción el correo recibido del cliente generando
   * los procesos de acuerdo con la clasificación del usuario
   * @param param
   * @return OK
   */
  CorreoRecibidoClienteExtensionsProcesarTransaccion(param: ParametroGeneradorProcesoMailBot): __Observable<ParametroGeneradorProcesoMailBot> {
    return this.CorreoRecibidoClienteExtensionsProcesarTransaccionResponse(param).pipe(
      __map(_r => _r.body as ParametroGeneradorProcesoMailBot)
    );
  }

  /**
   * Consultar registro de CorreoRecibidoClienteReferencia
   * @param idCorreoRecibidoClienteReferencia Identificador de CorreoRecibidoClienteReferencia
   * @return OK
   */
  CorreoRecibidoClienteReferenciaObtenerResponse(idCorreoRecibidoClienteReferencia: string): __Observable<__StrictHttpResponse<CorreoRecibidoClienteReferencia>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idCorreoRecibidoClienteReferencia != null) __params = __params.set('idCorreoRecibidoClienteReferencia', idCorreoRecibidoClienteReferencia.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/CorreoRecibidoClienteReferencia`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CorreoRecibidoClienteReferencia>;
      })
    );
  }
  /**
   * Consultar registro de CorreoRecibidoClienteReferencia
   * @param idCorreoRecibidoClienteReferencia Identificador de CorreoRecibidoClienteReferencia
   * @return OK
   */
  CorreoRecibidoClienteReferenciaObtener(idCorreoRecibidoClienteReferencia: string): __Observable<CorreoRecibidoClienteReferencia> {
    return this.CorreoRecibidoClienteReferenciaObtenerResponse(idCorreoRecibidoClienteReferencia).pipe(
      __map(_r => _r.body as CorreoRecibidoClienteReferencia)
    );
  }

  /**
   * Guardar o actualizar CorreoRecibidoClienteReferencia
   * @param correoRecibidoClienteReferencia CorreoRecibidoClienteReferencia
   * @return OK
   */
  CorreoRecibidoClienteReferenciaGuardarOActualizarResponse(correoRecibidoClienteReferencia: CorreoRecibidoClienteReferencia): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = correoRecibidoClienteReferencia;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/CorreoRecibidoClienteReferencia`,
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
   * Guardar o actualizar CorreoRecibidoClienteReferencia
   * @param correoRecibidoClienteReferencia CorreoRecibidoClienteReferencia
   * @return OK
   */
  CorreoRecibidoClienteReferenciaGuardarOActualizar(correoRecibidoClienteReferencia: CorreoRecibidoClienteReferencia): __Observable<string> {
    return this.CorreoRecibidoClienteReferenciaGuardarOActualizarResponse(correoRecibidoClienteReferencia).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de CorreoRecibidoClienteReferencia
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  CorreoRecibidoClienteReferenciaQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultCorreoRecibidoClienteReferencia>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/CorreoRecibidoClienteReferencia`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultCorreoRecibidoClienteReferencia>;
      })
    );
  }
  /**
   * Consultar lista paginada de CorreoRecibidoClienteReferencia
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  CorreoRecibidoClienteReferenciaQueryResult(info: QueryInfo): __Observable<QueryResultCorreoRecibidoClienteReferencia> {
    return this.CorreoRecibidoClienteReferenciaQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultCorreoRecibidoClienteReferencia)
    );
  }

  /**
   * Desactivar registro de CorreoRecibidoClienteReferencia
   * @param idCorreoRecibidoClienteReferencia Identificador de registro de CorreoRecibidoClienteReferencia
   * @return OK
   */
  CorreoRecibidoClienteReferenciaDesactivarResponse(idCorreoRecibidoClienteReferencia: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idCorreoRecibidoClienteReferencia != null) __params = __params.set('idCorreoRecibidoClienteReferencia', idCorreoRecibidoClienteReferencia.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/CorreoRecibidoClienteReferencia`,
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
   * Desactivar registro de CorreoRecibidoClienteReferencia
   * @param idCorreoRecibidoClienteReferencia Identificador de registro de CorreoRecibidoClienteReferencia
   * @return OK
   */
  CorreoRecibidoClienteReferenciaDesactivar(idCorreoRecibidoClienteReferencia: string): __Observable<string> {
    return this.CorreoRecibidoClienteReferenciaDesactivarResponse(idCorreoRecibidoClienteReferencia).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Process CorreosClientesTotales
   * @param param undefined
   * @return OK
   */
  CorreosClientesTotalesProcessResponse(param: ParametroCorreosClientesTotales): __Observable<__StrictHttpResponse<CorreosClientesTotales>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = param;
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/CorreosClientesTotales`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CorreosClientesTotales>;
      })
    );
  }
  /**
   * Process CorreosClientesTotales
   * @param param undefined
   * @return OK
   */
  CorreosClientesTotalesProcess(param: ParametroCorreosClientesTotales): __Observable<CorreosClientesTotales> {
    return this.CorreosClientesTotalesProcessResponse(param).pipe(
      __map(_r => _r.body as CorreosClientesTotales)
    );
  }
}

module SistemaCorreosMailBotsClientesService {
}

export { SistemaCorreosMailBotsClientesService }
