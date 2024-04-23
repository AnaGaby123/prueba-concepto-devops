/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiCatalogosConfiguration as __Configuration } from '../api-catalogos-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { ArchivoCorreoEnviado } from '../models/archivo-correo-enviado';
import { QueryResultArchivoCorreoEnviado } from '../models/query-result-archivo-correo-enviado';
import { QueryInfo } from '../models/query-info';
import { ArchivoCorreoRecibido } from '../models/archivo-correo-recibido';
import { QueryResultArchivoCorreoRecibido } from '../models/query-result-archivo-correo-recibido';
import { CorreoEnviado } from '../models/correo-enviado';
import { QueryResultCorreoEnviado } from '../models/query-result-correo-enviado';
import { GMCorreoRecibidoSpam } from '../models/gmcorreo-recibido-spam';
import { CorreoRecibido } from '../models/correo-recibido';
import { QueryResultCorreoRecibido } from '../models/query-result-correo-recibido';
import { CorreoRecibidoComentario } from '../models/correo-recibido-comentario';
import { QueryResultCorreoRecibidoComentario } from '../models/query-result-correo-recibido-comentario';
import { CorreoRecibidoContenido } from '../models/correo-recibido-contenido';
import { QueryResultCorreoRecibidoContenido } from '../models/query-result-correo-recibido-contenido';
import { CorreoRecibidoEstatus } from '../models/correo-recibido-estatus';
import { QueryResultCorreoRecibidoEstatus } from '../models/query-result-correo-recibido-estatus';
import { CorreoRecibidoReceptor } from '../models/correo-recibido-receptor';
import { QueryResultCorreoRecibidoReceptor } from '../models/query-result-correo-recibido-receptor';
import { VCorreoCliente } from '../models/vcorreo-cliente';
import { QueryResultVCorreoCliente } from '../models/query-result-vcorreo-cliente';
import { ParametroBuzonCorreo } from '../models/parametro-buzon-correo';
import { QueryResultVCorreoRecibidoObj } from '../models/query-result-vcorreo-recibido-obj';
@Injectable({
  providedIn: 'root',
})
class SistemaCorreosService extends __BaseService {
  static readonly ArchivoCorreoEnviadoObtenerPath = '/ArchivoCorreoEnviado';
  static readonly ArchivoCorreoEnviadoGuardarOActualizarPath = '/ArchivoCorreoEnviado';
  static readonly ArchivoCorreoEnviadoQueryResultPath = '/ArchivoCorreoEnviado';
  static readonly ArchivoCorreoEnviadoDesactivarPath = '/ArchivoCorreoEnviado';
  static readonly ArchivoCorreoRecibidoObtenerPath = '/ArchivoCorreoRecibido';
  static readonly ArchivoCorreoRecibidoGuardarOActualizarPath = '/ArchivoCorreoRecibido';
  static readonly ArchivoCorreoRecibidoQueryResultPath = '/ArchivoCorreoRecibido';
  static readonly ArchivoCorreoRecibidoDesactivarPath = '/ArchivoCorreoRecibido';
  static readonly CorreoEnviadoObtenerPath = '/CorreoEnviado';
  static readonly CorreoEnviadoGuardarOActualizarPath = '/CorreoEnviado';
  static readonly CorreoEnviadoQueryResultPath = '/CorreoEnviado';
  static readonly CorreoEnviadoDesactivarPath = '/CorreoEnviado';
  static readonly CorreoRecibidoDesactivaYSpamCorreoRecibidoPath = '/CorreoRecibido/Spam';
  static readonly CorreoRecibidoObtenerPath = '/CorreoRecibido';
  static readonly CorreoRecibidoGuardarOActualizarPath = '/CorreoRecibido';
  static readonly CorreoRecibidoQueryResultPath = '/CorreoRecibido';
  static readonly CorreoRecibidoDesactivarPath = '/CorreoRecibido';
  static readonly CorreoRecibidoComentarioObtenerPath = '/CorreoRecibidoComentario';
  static readonly CorreoRecibidoComentarioGuardarOActualizarPath = '/CorreoRecibidoComentario';
  static readonly CorreoRecibidoComentarioQueryResultPath = '/CorreoRecibidoComentario';
  static readonly CorreoRecibidoComentarioDesactivarPath = '/CorreoRecibidoComentario';
  static readonly CorreoRecibidoContenidoObtenerPath = '/CorreoRecibidoContenido';
  static readonly CorreoRecibidoContenidoGuardarOActualizarPath = '/CorreoRecibidoContenido';
  static readonly CorreoRecibidoContenidoQueryResultPath = '/CorreoRecibidoContenido';
  static readonly CorreoRecibidoContenidoDesactivarPath = '/CorreoRecibidoContenido';
  static readonly CorreoRecibidoEstatusEstatusObtenerPath = '/CorreoRecibidoEstatus';
  static readonly CorreoRecibidoEstatusEstatusGuardarOActualizarPath = '/CorreoRecibidoEstatus';
  static readonly CorreoRecibidoEstatusEstatusQueryResultPath = '/CorreoRecibidoEstatus';
  static readonly CorreoRecibidoEstatusEstatusDesactivarPath = '/CorreoRecibidoEstatus';
  static readonly CorreoRecibidoReceptorObtenerPath = '/CorreoRecibidoReceptor';
  static readonly CorreoRecibidoReceptorGuardarOActualizarPath = '/CorreoRecibidoReceptor';
  static readonly CorreoRecibidoReceptorQueryResultPath = '/CorreoRecibidoReceptor';
  static readonly CorreoRecibidoReceptorDesactivarPath = '/CorreoRecibidoReceptor';
  static readonly vCorreoClienteObtenerPath = '/vCorreoCliente';
  static readonly vCorreoClienteQueryResultPath = '/vCorreoCliente';
  static readonly vCorreoRecibidoObjQueryResultPath = '/vCorreoRecibidoObj';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Obtener un ArchivoCorreoEnviado por su idArchivoCorreoEnviado
   * @param idArchivoCorreoEnviado Identificador de ArchivoCorreoEnviado.
   * @return OK
   */
  ArchivoCorreoEnviadoObtenerResponse(idArchivoCorreoEnviado: string): __Observable<__StrictHttpResponse<ArchivoCorreoEnviado>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idArchivoCorreoEnviado != null) __params = __params.set('idArchivoCorreoEnviado', idArchivoCorreoEnviado.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/ArchivoCorreoEnviado`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ArchivoCorreoEnviado>;
      })
    );
  }
  /**
   * Obtener un ArchivoCorreoEnviado por su idArchivoCorreoEnviado
   * @param idArchivoCorreoEnviado Identificador de ArchivoCorreoEnviado.
   * @return OK
   */
  ArchivoCorreoEnviadoObtener(idArchivoCorreoEnviado: string): __Observable<ArchivoCorreoEnviado> {
    return this.ArchivoCorreoEnviadoObtenerResponse(idArchivoCorreoEnviado).pipe(
      __map(_r => _r.body as ArchivoCorreoEnviado)
    );
  }

  /**
   * Guarda o actualiza un ArchivoCorreoEnviado.
   * @param ArchivoCorreoEnviado Objeto de tipo "ArchivoCorreoEnviado" a ser guardado.
   * @return OK
   */
  ArchivoCorreoEnviadoGuardarOActualizarResponse(ArchivoCorreoEnviado: ArchivoCorreoEnviado): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = ArchivoCorreoEnviado;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/ArchivoCorreoEnviado`,
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
   * Guarda o actualiza un ArchivoCorreoEnviado.
   * @param ArchivoCorreoEnviado Objeto de tipo "ArchivoCorreoEnviado" a ser guardado.
   * @return OK
   */
  ArchivoCorreoEnviadoGuardarOActualizar(ArchivoCorreoEnviado: ArchivoCorreoEnviado): __Observable<string> {
    return this.ArchivoCorreoEnviadoGuardarOActualizarResponse(ArchivoCorreoEnviado).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * QueryResult ArchivoCorreoEnviado
   * @param info undefined
   * @return OK
   */
  ArchivoCorreoEnviadoQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultArchivoCorreoEnviado>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/ArchivoCorreoEnviado`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultArchivoCorreoEnviado>;
      })
    );
  }
  /**
   * QueryResult ArchivoCorreoEnviado
   * @param info undefined
   * @return OK
   */
  ArchivoCorreoEnviadoQueryResult(info: QueryInfo): __Observable<QueryResultArchivoCorreoEnviado> {
    return this.ArchivoCorreoEnviadoQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultArchivoCorreoEnviado)
    );
  }

  /**
   * Desactivar ArchivoCorreoEnviado
   * @param idArchivoCorreoEnviado undefined
   * @return OK
   */
  ArchivoCorreoEnviadoDesactivarResponse(idArchivoCorreoEnviado: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idArchivoCorreoEnviado != null) __params = __params.set('idArchivoCorreoEnviado', idArchivoCorreoEnviado.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/ArchivoCorreoEnviado`,
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
   * Desactivar ArchivoCorreoEnviado
   * @param idArchivoCorreoEnviado undefined
   * @return OK
   */
  ArchivoCorreoEnviadoDesactivar(idArchivoCorreoEnviado: string): __Observable<string> {
    return this.ArchivoCorreoEnviadoDesactivarResponse(idArchivoCorreoEnviado).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar registro de ArchivoCorreoRecibido
   * @param idArchivoCorreoRecibido Identificador de ArchivoCorreoRecibido
   * @return OK
   */
  ArchivoCorreoRecibidoObtenerResponse(idArchivoCorreoRecibido: string): __Observable<__StrictHttpResponse<ArchivoCorreoRecibido>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idArchivoCorreoRecibido != null) __params = __params.set('idArchivoCorreoRecibido', idArchivoCorreoRecibido.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/ArchivoCorreoRecibido`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ArchivoCorreoRecibido>;
      })
    );
  }
  /**
   * Consultar registro de ArchivoCorreoRecibido
   * @param idArchivoCorreoRecibido Identificador de ArchivoCorreoRecibido
   * @return OK
   */
  ArchivoCorreoRecibidoObtener(idArchivoCorreoRecibido: string): __Observable<ArchivoCorreoRecibido> {
    return this.ArchivoCorreoRecibidoObtenerResponse(idArchivoCorreoRecibido).pipe(
      __map(_r => _r.body as ArchivoCorreoRecibido)
    );
  }

  /**
   * Guardar o actualizar ArchivoCorreoRecibido
   * @param ArchivoCorreoRecibido ArchivoCorreoRecibido
   * @return OK
   */
  ArchivoCorreoRecibidoGuardarOActualizarResponse(ArchivoCorreoRecibido: ArchivoCorreoRecibido): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = ArchivoCorreoRecibido;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/ArchivoCorreoRecibido`,
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
   * Guardar o actualizar ArchivoCorreoRecibido
   * @param ArchivoCorreoRecibido ArchivoCorreoRecibido
   * @return OK
   */
  ArchivoCorreoRecibidoGuardarOActualizar(ArchivoCorreoRecibido: ArchivoCorreoRecibido): __Observable<string> {
    return this.ArchivoCorreoRecibidoGuardarOActualizarResponse(ArchivoCorreoRecibido).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de ArchivoCorreoRecibido
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  ArchivoCorreoRecibidoQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultArchivoCorreoRecibido>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/ArchivoCorreoRecibido`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultArchivoCorreoRecibido>;
      })
    );
  }
  /**
   * Consultar lista paginada de ArchivoCorreoRecibido
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  ArchivoCorreoRecibidoQueryResult(info: QueryInfo): __Observable<QueryResultArchivoCorreoRecibido> {
    return this.ArchivoCorreoRecibidoQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultArchivoCorreoRecibido)
    );
  }

  /**
   * Desactivar registro de ArchivoCorreoRecibido
   * @param idArchivoCorreoRecibido Identificador de registro de ArchivoCorreoRecibido
   * @return OK
   */
  ArchivoCorreoRecibidoDesactivarResponse(idArchivoCorreoRecibido: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idArchivoCorreoRecibido != null) __params = __params.set('idArchivoCorreoRecibido', idArchivoCorreoRecibido.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/ArchivoCorreoRecibido`,
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
   * Desactivar registro de ArchivoCorreoRecibido
   * @param idArchivoCorreoRecibido Identificador de registro de ArchivoCorreoRecibido
   * @return OK
   */
  ArchivoCorreoRecibidoDesactivar(idArchivoCorreoRecibido: string): __Observable<string> {
    return this.ArchivoCorreoRecibidoDesactivarResponse(idArchivoCorreoRecibido).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Obtener un CorreoEnviado por su idCorreoEnviado
   * @param idCorreoEnviado Identificador de CorreoEnviado.
   * @return OK
   */
  CorreoEnviadoObtenerResponse(idCorreoEnviado: string): __Observable<__StrictHttpResponse<CorreoEnviado>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idCorreoEnviado != null) __params = __params.set('idCorreoEnviado', idCorreoEnviado.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/CorreoEnviado`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CorreoEnviado>;
      })
    );
  }
  /**
   * Obtener un CorreoEnviado por su idCorreoEnviado
   * @param idCorreoEnviado Identificador de CorreoEnviado.
   * @return OK
   */
  CorreoEnviadoObtener(idCorreoEnviado: string): __Observable<CorreoEnviado> {
    return this.CorreoEnviadoObtenerResponse(idCorreoEnviado).pipe(
      __map(_r => _r.body as CorreoEnviado)
    );
  }

  /**
   * Guarda o actualiza un CorreoEnviado.
   * @param CorreoEnviado Objeto de tipo "CorreoEnviado" a ser guardado.
   * @return OK
   */
  CorreoEnviadoGuardarOActualizarResponse(CorreoEnviado: CorreoEnviado): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = CorreoEnviado;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/CorreoEnviado`,
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
   * Guarda o actualiza un CorreoEnviado.
   * @param CorreoEnviado Objeto de tipo "CorreoEnviado" a ser guardado.
   * @return OK
   */
  CorreoEnviadoGuardarOActualizar(CorreoEnviado: CorreoEnviado): __Observable<string> {
    return this.CorreoEnviadoGuardarOActualizarResponse(CorreoEnviado).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * QueryResult CorreoEnviado
   * @param info undefined
   * @return OK
   */
  CorreoEnviadoQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultCorreoEnviado>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/CorreoEnviado`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultCorreoEnviado>;
      })
    );
  }
  /**
   * QueryResult CorreoEnviado
   * @param info undefined
   * @return OK
   */
  CorreoEnviadoQueryResult(info: QueryInfo): __Observable<QueryResultCorreoEnviado> {
    return this.CorreoEnviadoQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultCorreoEnviado)
    );
  }

  /**
   * Desactivar CorreoEnviado
   * @param idCorreoEnviado undefined
   * @return OK
   */
  CorreoEnviadoDesactivarResponse(idCorreoEnviado: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idCorreoEnviado != null) __params = __params.set('idCorreoEnviado', idCorreoEnviado.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/CorreoEnviado`,
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
   * Desactivar CorreoEnviado
   * @param idCorreoEnviado undefined
   * @return OK
   */
  CorreoEnviadoDesactivar(idCorreoEnviado: string): __Observable<string> {
    return this.CorreoEnviadoDesactivarResponse(idCorreoEnviado).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Desactivar registro de CorreoRecibido y se puede mandar a spam el correo emisor
   * @param GMCorreoRecibidoSpam Parametros de entrada IdCorreoRecibido y EsSpam
   * @return OK
   */
  CorreoRecibidoDesactivaYSpamCorreoRecibidoResponse(GMCorreoRecibidoSpam: GMCorreoRecibidoSpam): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = GMCorreoRecibidoSpam;
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/CorreoRecibido/Spam`,
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
   * Desactivar registro de CorreoRecibido y se puede mandar a spam el correo emisor
   * @param GMCorreoRecibidoSpam Parametros de entrada IdCorreoRecibido y EsSpam
   * @return OK
   */
  CorreoRecibidoDesactivaYSpamCorreoRecibido(GMCorreoRecibidoSpam: GMCorreoRecibidoSpam): __Observable<string> {
    return this.CorreoRecibidoDesactivaYSpamCorreoRecibidoResponse(GMCorreoRecibidoSpam).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar registro de CorreoRecibido
   * @param idCorreoRecibido Identificador de CorreoRecibido
   * @return OK
   */
  CorreoRecibidoObtenerResponse(idCorreoRecibido: string): __Observable<__StrictHttpResponse<CorreoRecibido>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idCorreoRecibido != null) __params = __params.set('idCorreoRecibido', idCorreoRecibido.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/CorreoRecibido`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CorreoRecibido>;
      })
    );
  }
  /**
   * Consultar registro de CorreoRecibido
   * @param idCorreoRecibido Identificador de CorreoRecibido
   * @return OK
   */
  CorreoRecibidoObtener(idCorreoRecibido: string): __Observable<CorreoRecibido> {
    return this.CorreoRecibidoObtenerResponse(idCorreoRecibido).pipe(
      __map(_r => _r.body as CorreoRecibido)
    );
  }

  /**
   * Guardar o actualizar CorreoRecibido
   * @param CorreoRecibido CorreoRecibido
   * @return OK
   */
  CorreoRecibidoGuardarOActualizarResponse(CorreoRecibido: CorreoRecibido): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = CorreoRecibido;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/CorreoRecibido`,
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
   * Guardar o actualizar CorreoRecibido
   * @param CorreoRecibido CorreoRecibido
   * @return OK
   */
  CorreoRecibidoGuardarOActualizar(CorreoRecibido: CorreoRecibido): __Observable<string> {
    return this.CorreoRecibidoGuardarOActualizarResponse(CorreoRecibido).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de CorreoRecibido
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  CorreoRecibidoQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultCorreoRecibido>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/CorreoRecibido`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultCorreoRecibido>;
      })
    );
  }
  /**
   * Consultar lista paginada de CorreoRecibido
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  CorreoRecibidoQueryResult(info: QueryInfo): __Observable<QueryResultCorreoRecibido> {
    return this.CorreoRecibidoQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultCorreoRecibido)
    );
  }

  /**
   * Desactivar registro de CorreoRecibido
   * @param idCorreoRecibido Identificador de registro de CorreoRecibido
   * @return OK
   */
  CorreoRecibidoDesactivarResponse(idCorreoRecibido: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idCorreoRecibido != null) __params = __params.set('idCorreoRecibido', idCorreoRecibido.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/CorreoRecibido`,
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
   * Desactivar registro de CorreoRecibido
   * @param idCorreoRecibido Identificador de registro de CorreoRecibido
   * @return OK
   */
  CorreoRecibidoDesactivar(idCorreoRecibido: string): __Observable<string> {
    return this.CorreoRecibidoDesactivarResponse(idCorreoRecibido).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar registro de CorreoRecibidoComentario
   * @param idCorreoRecibidoComentario Identificador de CorreoRecibidoComentario
   * @return OK
   */
  CorreoRecibidoComentarioObtenerResponse(idCorreoRecibidoComentario: string): __Observable<__StrictHttpResponse<CorreoRecibidoComentario>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idCorreoRecibidoComentario != null) __params = __params.set('idCorreoRecibidoComentario', idCorreoRecibidoComentario.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/CorreoRecibidoComentario`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CorreoRecibidoComentario>;
      })
    );
  }
  /**
   * Consultar registro de CorreoRecibidoComentario
   * @param idCorreoRecibidoComentario Identificador de CorreoRecibidoComentario
   * @return OK
   */
  CorreoRecibidoComentarioObtener(idCorreoRecibidoComentario: string): __Observable<CorreoRecibidoComentario> {
    return this.CorreoRecibidoComentarioObtenerResponse(idCorreoRecibidoComentario).pipe(
      __map(_r => _r.body as CorreoRecibidoComentario)
    );
  }

  /**
   * Guardar o actualizar CorreoRecibidoComentario
   * @param CorreoRecibidoComentario CorreoRecibidoComentario
   * @return OK
   */
  CorreoRecibidoComentarioGuardarOActualizarResponse(CorreoRecibidoComentario: CorreoRecibidoComentario): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = CorreoRecibidoComentario;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/CorreoRecibidoComentario`,
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
   * Guardar o actualizar CorreoRecibidoComentario
   * @param CorreoRecibidoComentario CorreoRecibidoComentario
   * @return OK
   */
  CorreoRecibidoComentarioGuardarOActualizar(CorreoRecibidoComentario: CorreoRecibidoComentario): __Observable<string> {
    return this.CorreoRecibidoComentarioGuardarOActualizarResponse(CorreoRecibidoComentario).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de CorreoRecibidoComentario
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  CorreoRecibidoComentarioQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultCorreoRecibidoComentario>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/CorreoRecibidoComentario`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultCorreoRecibidoComentario>;
      })
    );
  }
  /**
   * Consultar lista paginada de CorreoRecibidoComentario
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  CorreoRecibidoComentarioQueryResult(info: QueryInfo): __Observable<QueryResultCorreoRecibidoComentario> {
    return this.CorreoRecibidoComentarioQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultCorreoRecibidoComentario)
    );
  }

  /**
   * Desactivar registro de CorreoRecibidoComentario
   * @param idCorreoRecibidoComentario Identificador de registro de CorreoRecibidoComentario
   * @return OK
   */
  CorreoRecibidoComentarioDesactivarResponse(idCorreoRecibidoComentario: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idCorreoRecibidoComentario != null) __params = __params.set('idCorreoRecibidoComentario', idCorreoRecibidoComentario.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/CorreoRecibidoComentario`,
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
   * Desactivar registro de CorreoRecibidoComentario
   * @param idCorreoRecibidoComentario Identificador de registro de CorreoRecibidoComentario
   * @return OK
   */
  CorreoRecibidoComentarioDesactivar(idCorreoRecibidoComentario: string): __Observable<string> {
    return this.CorreoRecibidoComentarioDesactivarResponse(idCorreoRecibidoComentario).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar registro de CorreoRecibidoContenido
   * @param idCorreoRecibidoContenido Identificador de CorreoRecibidoContenido
   * @return OK
   */
  CorreoRecibidoContenidoObtenerResponse(idCorreoRecibidoContenido: string): __Observable<__StrictHttpResponse<CorreoRecibidoContenido>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idCorreoRecibidoContenido != null) __params = __params.set('idCorreoRecibidoContenido', idCorreoRecibidoContenido.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/CorreoRecibidoContenido`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CorreoRecibidoContenido>;
      })
    );
  }
  /**
   * Consultar registro de CorreoRecibidoContenido
   * @param idCorreoRecibidoContenido Identificador de CorreoRecibidoContenido
   * @return OK
   */
  CorreoRecibidoContenidoObtener(idCorreoRecibidoContenido: string): __Observable<CorreoRecibidoContenido> {
    return this.CorreoRecibidoContenidoObtenerResponse(idCorreoRecibidoContenido).pipe(
      __map(_r => _r.body as CorreoRecibidoContenido)
    );
  }

  /**
   * Guardar o actualizar CorreoRecibidoContenido
   * @param CorreoRecibidoContenido CorreoRecibidoContenido
   * @return OK
   */
  CorreoRecibidoContenidoGuardarOActualizarResponse(CorreoRecibidoContenido: CorreoRecibidoContenido): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = CorreoRecibidoContenido;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/CorreoRecibidoContenido`,
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
   * Guardar o actualizar CorreoRecibidoContenido
   * @param CorreoRecibidoContenido CorreoRecibidoContenido
   * @return OK
   */
  CorreoRecibidoContenidoGuardarOActualizar(CorreoRecibidoContenido: CorreoRecibidoContenido): __Observable<string> {
    return this.CorreoRecibidoContenidoGuardarOActualizarResponse(CorreoRecibidoContenido).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de CorreoRecibidoContenido
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  CorreoRecibidoContenidoQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultCorreoRecibidoContenido>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/CorreoRecibidoContenido`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultCorreoRecibidoContenido>;
      })
    );
  }
  /**
   * Consultar lista paginada de CorreoRecibidoContenido
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  CorreoRecibidoContenidoQueryResult(info: QueryInfo): __Observable<QueryResultCorreoRecibidoContenido> {
    return this.CorreoRecibidoContenidoQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultCorreoRecibidoContenido)
    );
  }

  /**
   * Desactivar registro de CorreoRecibidoContenido
   * @param idCorreoRecibidoContenido Identificador de registro de CorreoRecibidoContenido
   * @return OK
   */
  CorreoRecibidoContenidoDesactivarResponse(idCorreoRecibidoContenido: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idCorreoRecibidoContenido != null) __params = __params.set('idCorreoRecibidoContenido', idCorreoRecibidoContenido.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/CorreoRecibidoContenido`,
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
   * Desactivar registro de CorreoRecibidoContenido
   * @param idCorreoRecibidoContenido Identificador de registro de CorreoRecibidoContenido
   * @return OK
   */
  CorreoRecibidoContenidoDesactivar(idCorreoRecibidoContenido: string): __Observable<string> {
    return this.CorreoRecibidoContenidoDesactivarResponse(idCorreoRecibidoContenido).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar registro de CorreoRecibidoEstatus
   * @param idCorreoRecibidoEstatus Identificador de CorreoRecibidoEstatus
   * @return OK
   */
  CorreoRecibidoEstatusEstatusObtenerResponse(idCorreoRecibidoEstatus: string): __Observable<__StrictHttpResponse<CorreoRecibidoEstatus>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idCorreoRecibidoEstatus != null) __params = __params.set('idCorreoRecibidoEstatus', idCorreoRecibidoEstatus.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/CorreoRecibidoEstatus`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CorreoRecibidoEstatus>;
      })
    );
  }
  /**
   * Consultar registro de CorreoRecibidoEstatus
   * @param idCorreoRecibidoEstatus Identificador de CorreoRecibidoEstatus
   * @return OK
   */
  CorreoRecibidoEstatusEstatusObtener(idCorreoRecibidoEstatus: string): __Observable<CorreoRecibidoEstatus> {
    return this.CorreoRecibidoEstatusEstatusObtenerResponse(idCorreoRecibidoEstatus).pipe(
      __map(_r => _r.body as CorreoRecibidoEstatus)
    );
  }

  /**
   * Guardar o actualizar CorreoRecibidoEstatus
   * @param CorreoRecibidoEstatus CorreoRecibidoEstatus
   * @return OK
   */
  CorreoRecibidoEstatusEstatusGuardarOActualizarResponse(CorreoRecibidoEstatus: CorreoRecibidoEstatus): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = CorreoRecibidoEstatus;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/CorreoRecibidoEstatus`,
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
   * Guardar o actualizar CorreoRecibidoEstatus
   * @param CorreoRecibidoEstatus CorreoRecibidoEstatus
   * @return OK
   */
  CorreoRecibidoEstatusEstatusGuardarOActualizar(CorreoRecibidoEstatus: CorreoRecibidoEstatus): __Observable<string> {
    return this.CorreoRecibidoEstatusEstatusGuardarOActualizarResponse(CorreoRecibidoEstatus).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de CorreoRecibidoEstatus
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  CorreoRecibidoEstatusEstatusQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultCorreoRecibidoEstatus>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/CorreoRecibidoEstatus`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultCorreoRecibidoEstatus>;
      })
    );
  }
  /**
   * Consultar lista paginada de CorreoRecibidoEstatus
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  CorreoRecibidoEstatusEstatusQueryResult(info: QueryInfo): __Observable<QueryResultCorreoRecibidoEstatus> {
    return this.CorreoRecibidoEstatusEstatusQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultCorreoRecibidoEstatus)
    );
  }

  /**
   * Desactivar registro de CorreoRecibidoEstatus
   * @param idCorreoRecibidoEstatus Identificador de registro de CorreoRecibidoEstatus
   * @return OK
   */
  CorreoRecibidoEstatusEstatusDesactivarResponse(idCorreoRecibidoEstatus: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idCorreoRecibidoEstatus != null) __params = __params.set('idCorreoRecibidoEstatus', idCorreoRecibidoEstatus.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/CorreoRecibidoEstatus`,
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
   * Desactivar registro de CorreoRecibidoEstatus
   * @param idCorreoRecibidoEstatus Identificador de registro de CorreoRecibidoEstatus
   * @return OK
   */
  CorreoRecibidoEstatusEstatusDesactivar(idCorreoRecibidoEstatus: string): __Observable<string> {
    return this.CorreoRecibidoEstatusEstatusDesactivarResponse(idCorreoRecibidoEstatus).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar registro de CorreoRecibidoReceptor
   * @param idCorreoRecibidoReceptor Identificador de CorreoRecibidoReceptor
   * @return OK
   */
  CorreoRecibidoReceptorObtenerResponse(idCorreoRecibidoReceptor: string): __Observable<__StrictHttpResponse<CorreoRecibidoReceptor>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idCorreoRecibidoReceptor != null) __params = __params.set('idCorreoRecibidoReceptor', idCorreoRecibidoReceptor.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/CorreoRecibidoReceptor`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CorreoRecibidoReceptor>;
      })
    );
  }
  /**
   * Consultar registro de CorreoRecibidoReceptor
   * @param idCorreoRecibidoReceptor Identificador de CorreoRecibidoReceptor
   * @return OK
   */
  CorreoRecibidoReceptorObtener(idCorreoRecibidoReceptor: string): __Observable<CorreoRecibidoReceptor> {
    return this.CorreoRecibidoReceptorObtenerResponse(idCorreoRecibidoReceptor).pipe(
      __map(_r => _r.body as CorreoRecibidoReceptor)
    );
  }

  /**
   * Guardar o actualizar CorreoRecibidoReceptor
   * @param CorreoRecibidoReceptor CorreoRecibidoReceptor
   * @return OK
   */
  CorreoRecibidoReceptorGuardarOActualizarResponse(CorreoRecibidoReceptor: CorreoRecibidoReceptor): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = CorreoRecibidoReceptor;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/CorreoRecibidoReceptor`,
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
   * Guardar o actualizar CorreoRecibidoReceptor
   * @param CorreoRecibidoReceptor CorreoRecibidoReceptor
   * @return OK
   */
  CorreoRecibidoReceptorGuardarOActualizar(CorreoRecibidoReceptor: CorreoRecibidoReceptor): __Observable<string> {
    return this.CorreoRecibidoReceptorGuardarOActualizarResponse(CorreoRecibidoReceptor).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de CorreoRecibidoReceptor
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  CorreoRecibidoReceptorQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultCorreoRecibidoReceptor>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/CorreoRecibidoReceptor`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultCorreoRecibidoReceptor>;
      })
    );
  }
  /**
   * Consultar lista paginada de CorreoRecibidoReceptor
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  CorreoRecibidoReceptorQueryResult(info: QueryInfo): __Observable<QueryResultCorreoRecibidoReceptor> {
    return this.CorreoRecibidoReceptorQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultCorreoRecibidoReceptor)
    );
  }

  /**
   * Desactivar registro de CorreoRecibidoReceptor
   * @param idCorreoRecibidoReceptor Identificador de registro de CorreoRecibidoReceptor
   * @return OK
   */
  CorreoRecibidoReceptorDesactivarResponse(idCorreoRecibidoReceptor: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idCorreoRecibidoReceptor != null) __params = __params.set('idCorreoRecibidoReceptor', idCorreoRecibidoReceptor.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/CorreoRecibidoReceptor`,
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
   * Desactivar registro de CorreoRecibidoReceptor
   * @param idCorreoRecibidoReceptor Identificador de registro de CorreoRecibidoReceptor
   * @return OK
   */
  CorreoRecibidoReceptorDesactivar(idCorreoRecibidoReceptor: string): __Observable<string> {
    return this.CorreoRecibidoReceptorDesactivarResponse(idCorreoRecibidoReceptor).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Obtener vCorreoCliente
   * @param idvCorreoCliente undefined
   * @return OK
   */
  vCorreoClienteObtenerResponse(idvCorreoCliente: string): __Observable<__StrictHttpResponse<VCorreoCliente>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idvCorreoCliente != null) __params = __params.set('idvCorreoCliente', idvCorreoCliente.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/vCorreoCliente`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<VCorreoCliente>;
      })
    );
  }
  /**
   * Obtener vCorreoCliente
   * @param idvCorreoCliente undefined
   * @return OK
   */
  vCorreoClienteObtener(idvCorreoCliente: string): __Observable<VCorreoCliente> {
    return this.vCorreoClienteObtenerResponse(idvCorreoCliente).pipe(
      __map(_r => _r.body as VCorreoCliente)
    );
  }

  /**
   * Consultar lista paginada de vCorreoCliente
   * @param info Filtros y ordenamientos
   * @return OK
   */
  vCorreoClienteQueryResultResponse(info: ParametroBuzonCorreo): __Observable<__StrictHttpResponse<QueryResultVCorreoCliente>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/vCorreoCliente`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultVCorreoCliente>;
      })
    );
  }
  /**
   * Consultar lista paginada de vCorreoCliente
   * @param info Filtros y ordenamientos
   * @return OK
   */
  vCorreoClienteQueryResult(info: ParametroBuzonCorreo): __Observable<QueryResultVCorreoCliente> {
    return this.vCorreoClienteQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultVCorreoCliente)
    );
  }

  /**
   * QueryResult vCorreoRecibidoObj
   * @param info undefined
   * @return OK
   */
  vCorreoRecibidoObjQueryResultResponse(info: ParametroBuzonCorreo): __Observable<__StrictHttpResponse<QueryResultVCorreoRecibidoObj>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/vCorreoRecibidoObj`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultVCorreoRecibidoObj>;
      })
    );
  }
  /**
   * QueryResult vCorreoRecibidoObj
   * @param info undefined
   * @return OK
   */
  vCorreoRecibidoObjQueryResult(info: ParametroBuzonCorreo): __Observable<QueryResultVCorreoRecibidoObj> {
    return this.vCorreoRecibidoObjQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultVCorreoRecibidoObj)
    );
  }
}

module SistemaCorreosService {
}

export { SistemaCorreosService }
