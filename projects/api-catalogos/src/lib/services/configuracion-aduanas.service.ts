/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiCatalogosConfiguration as __Configuration } from '../api-catalogos-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { Aduana } from '../models/aduana';
import { QueryResultAduana } from '../models/query-result-aduana';
import { QueryInfo } from '../models/query-info';
import { AduanaDetalle } from '../models/aduana-detalle';
import { AgenteAduanal } from '../models/agente-aduanal';
import { QueryResultAgenteAduanal } from '../models/query-result-agente-aduanal';
import { ContactoDetalleAgenteAduanalObj } from '../models/contacto-detalle-agente-aduanal-obj';
import { ConceptoAgenteAduanal } from '../models/concepto-agente-aduanal';
import { QueryResultConceptoAgenteAduanal } from '../models/query-result-concepto-agente-aduanal';
import { ContactoAduana } from '../models/contacto-aduana';
import { QueryResultContactoAduana } from '../models/query-result-contacto-aduana';
import { QueryResultVAgenteAduanal } from '../models/query-result-vagente-aduanal';
@Injectable({
  providedIn: 'root',
})
class ConfiguracionAduanasService extends __BaseService {
  static readonly AduanaObtenerPath = '/Aduana';
  static readonly AduanaGuardarOActualizarPath = '/Aduana';
  static readonly AduanaQueryResultPath = '/Aduana';
  static readonly AduanaDesactivarPath = '/Aduana';
  static readonly AduanaDetalleQueryResultPath = '/AduanaDetalle';
  static readonly AgenteAduanalObtenerPath = '/AgenteAduanal';
  static readonly AgenteAduanalGuardarOActualizarPath = '/AgenteAduanal';
  static readonly AgenteAduanalQueryResultPath = '/AgenteAduanal';
  static readonly AgenteAduanalDesactivarPath = '/AgenteAduanal';
  static readonly AgenteAduanalExtensionsObtenerListaContactoDetallePath = '/ObtenerListaContactoDetalleAgenteAduanal';
  static readonly ConceptoAgenteAduanalObtenerPath = '/ConceptoAgenteAduanal';
  static readonly ConceptoAgenteAduanalGuardarOActualizarPath = '/ConceptoAgenteAduanal';
  static readonly ConceptoAgenteAduanalQueryResultPath = '/ConceptoAgenteAduanal';
  static readonly ConceptoAgenteAduanalDesactivarPath = '/ConceptoAgenteAduanal';
  static readonly ContactoAduanaObtenerPath = '/ContactoAduana';
  static readonly ContactoAduanaGuardarOActualizarPath = '/ContactoAduana';
  static readonly ContactoAduanaQueryResultPath = '/ContactoAduana';
  static readonly ContactoAduanaDesactivarPath = '/ContactoAduana';
  static readonly vAgenteAduanalQueryResultPath = '/vAgenteAduanal';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Consultar registro de Aduana
   * @param idAduana Identificador de Aduana
   * @return OK
   */
  AduanaObtenerResponse(idAduana: string): __Observable<__StrictHttpResponse<Aduana>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idAduana != null) __params = __params.set('idAduana', idAduana.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/Aduana`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Aduana>;
      })
    );
  }
  /**
   * Consultar registro de Aduana
   * @param idAduana Identificador de Aduana
   * @return OK
   */
  AduanaObtener(idAduana: string): __Observable<Aduana> {
    return this.AduanaObtenerResponse(idAduana).pipe(
      __map(_r => _r.body as Aduana)
    );
  }

  /**
   * Guardar o actualizar Aduana
   * @param Aduana Aduana
   * @return OK
   */
  AduanaGuardarOActualizarResponse(Aduana: Aduana): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = Aduana;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/Aduana`,
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
   * Guardar o actualizar Aduana
   * @param Aduana Aduana
   * @return OK
   */
  AduanaGuardarOActualizar(Aduana: Aduana): __Observable<string> {
    return this.AduanaGuardarOActualizarResponse(Aduana).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de Aduana
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  AduanaQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultAduana>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/Aduana`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultAduana>;
      })
    );
  }
  /**
   * Consultar lista paginada de Aduana
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  AduanaQueryResult(info: QueryInfo): __Observable<QueryResultAduana> {
    return this.AduanaQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultAduana)
    );
  }

  /**
   * Desactivar registro de Aduana
   * @param idAduana Identificador de registro de Aduana
   * @return OK
   */
  AduanaDesactivarResponse(idAduana: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idAduana != null) __params = __params.set('idAduana', idAduana.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/Aduana`,
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
   * Desactivar registro de Aduana
   * @param idAduana Identificador de registro de Aduana
   * @return OK
   */
  AduanaDesactivar(idAduana: string): __Observable<string> {
    return this.AduanaDesactivarResponse(idAduana).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * QueryResult AduanaDetalle
   * @param IdAduana undefined
   * @return OK
   */
  AduanaDetalleQueryResultResponse(IdAduana: string): __Observable<__StrictHttpResponse<AduanaDetalle>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (IdAduana != null) __params = __params.set('IdAduana', IdAduana.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/AduanaDetalle`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<AduanaDetalle>;
      })
    );
  }
  /**
   * QueryResult AduanaDetalle
   * @param IdAduana undefined
   * @return OK
   */
  AduanaDetalleQueryResult(IdAduana: string): __Observable<AduanaDetalle> {
    return this.AduanaDetalleQueryResultResponse(IdAduana).pipe(
      __map(_r => _r.body as AduanaDetalle)
    );
  }

  /**
   * Obtener un agente aduanal por su idAgenteAduanal.
   * @param idAgenteAduanal Identificador del agente aduanal
   * @return OK
   */
  AgenteAduanalObtenerResponse(idAgenteAduanal: string): __Observable<__StrictHttpResponse<AgenteAduanal>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idAgenteAduanal != null) __params = __params.set('idAgenteAduanal', idAgenteAduanal.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/AgenteAduanal`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<AgenteAduanal>;
      })
    );
  }
  /**
   * Obtener un agente aduanal por su idAgenteAduanal.
   * @param idAgenteAduanal Identificador del agente aduanal
   * @return OK
   */
  AgenteAduanalObtener(idAgenteAduanal: string): __Observable<AgenteAduanal> {
    return this.AgenteAduanalObtenerResponse(idAgenteAduanal).pipe(
      __map(_r => _r.body as AgenteAduanal)
    );
  }

  /**
   * Guardar o actualizar un agente aduanal
   * @param agenteAduanal Objeto de agente aduanal
   * @return OK
   */
  AgenteAduanalGuardarOActualizarResponse(agenteAduanal: AgenteAduanal): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = agenteAduanal;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/AgenteAduanal`,
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
   * Guardar o actualizar un agente aduanal
   * @param agenteAduanal Objeto de agente aduanal
   * @return OK
   */
  AgenteAduanalGuardarOActualizar(agenteAduanal: AgenteAduanal): __Observable<string> {
    return this.AgenteAduanalGuardarOActualizarResponse(agenteAduanal).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Obtener lista de agente aduanal.
   * @param info Objeto de tipo QueryInfo para filtrar agentes aduanales.
   * @return OK
   */
  AgenteAduanalQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultAgenteAduanal>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/AgenteAduanal`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultAgenteAduanal>;
      })
    );
  }
  /**
   * Obtener lista de agente aduanal.
   * @param info Objeto de tipo QueryInfo para filtrar agentes aduanales.
   * @return OK
   */
  AgenteAduanalQueryResult(info: QueryInfo): __Observable<QueryResultAgenteAduanal> {
    return this.AgenteAduanalQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultAgenteAduanal)
    );
  }

  /**
   * Desactivar un agente aduanal
   * @param idAgenteAduanal Identificador de agente aduanal a desactivar
   * @return OK
   */
  AgenteAduanalDesactivarResponse(idAgenteAduanal: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idAgenteAduanal != null) __params = __params.set('idAgenteAduanal', idAgenteAduanal.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/AgenteAduanal`,
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
   * Desactivar un agente aduanal
   * @param idAgenteAduanal Identificador de agente aduanal a desactivar
   * @return OK
   */
  AgenteAduanalDesactivar(idAgenteAduanal: string): __Observable<string> {
    return this.AgenteAduanalDesactivarResponse(idAgenteAduanal).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * ObtenerListaContactoDetalle AgenteAduanalExtensions
   * @param idAgenteAduanal undefined
   * @return OK
   */
  AgenteAduanalExtensionsObtenerListaContactoDetalleResponse(idAgenteAduanal: string): __Observable<__StrictHttpResponse<Array<ContactoDetalleAgenteAduanalObj>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idAgenteAduanal != null) __params = __params.set('idAgenteAduanal', idAgenteAduanal.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/ObtenerListaContactoDetalleAgenteAduanal`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<ContactoDetalleAgenteAduanalObj>>;
      })
    );
  }
  /**
   * ObtenerListaContactoDetalle AgenteAduanalExtensions
   * @param idAgenteAduanal undefined
   * @return OK
   */
  AgenteAduanalExtensionsObtenerListaContactoDetalle(idAgenteAduanal: string): __Observable<Array<ContactoDetalleAgenteAduanalObj>> {
    return this.AgenteAduanalExtensionsObtenerListaContactoDetalleResponse(idAgenteAduanal).pipe(
      __map(_r => _r.body as Array<ContactoDetalleAgenteAduanalObj>)
    );
  }

  /**
   * Consultar registro de ConceptoAgenteAduanal
   * @param idConceptoAgenteAduanal Identificador de ConceptoAgenteAduanal
   * @return OK
   */
  ConceptoAgenteAduanalObtenerResponse(idConceptoAgenteAduanal: string): __Observable<__StrictHttpResponse<ConceptoAgenteAduanal>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idConceptoAgenteAduanal != null) __params = __params.set('idConceptoAgenteAduanal', idConceptoAgenteAduanal.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/ConceptoAgenteAduanal`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ConceptoAgenteAduanal>;
      })
    );
  }
  /**
   * Consultar registro de ConceptoAgenteAduanal
   * @param idConceptoAgenteAduanal Identificador de ConceptoAgenteAduanal
   * @return OK
   */
  ConceptoAgenteAduanalObtener(idConceptoAgenteAduanal: string): __Observable<ConceptoAgenteAduanal> {
    return this.ConceptoAgenteAduanalObtenerResponse(idConceptoAgenteAduanal).pipe(
      __map(_r => _r.body as ConceptoAgenteAduanal)
    );
  }

  /**
   * Guardar o actualizar ConceptoAgenteAduanal
   * @param ConceptoAgenteAduanal ConceptoAgenteAduanal
   * @return OK
   */
  ConceptoAgenteAduanalGuardarOActualizarResponse(ConceptoAgenteAduanal: ConceptoAgenteAduanal): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = ConceptoAgenteAduanal;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/ConceptoAgenteAduanal`,
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
   * Guardar o actualizar ConceptoAgenteAduanal
   * @param ConceptoAgenteAduanal ConceptoAgenteAduanal
   * @return OK
   */
  ConceptoAgenteAduanalGuardarOActualizar(ConceptoAgenteAduanal: ConceptoAgenteAduanal): __Observable<string> {
    return this.ConceptoAgenteAduanalGuardarOActualizarResponse(ConceptoAgenteAduanal).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de ConceptoAgenteAduanal
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  ConceptoAgenteAduanalQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultConceptoAgenteAduanal>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/ConceptoAgenteAduanal`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultConceptoAgenteAduanal>;
      })
    );
  }
  /**
   * Consultar lista paginada de ConceptoAgenteAduanal
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  ConceptoAgenteAduanalQueryResult(info: QueryInfo): __Observable<QueryResultConceptoAgenteAduanal> {
    return this.ConceptoAgenteAduanalQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultConceptoAgenteAduanal)
    );
  }

  /**
   * Desactivar registro de ConceptoAgenteAduanal
   * @param idConceptoAgenteAduanal Identificador de registro de ConceptoAgenteAduanal
   * @return OK
   */
  ConceptoAgenteAduanalDesactivarResponse(idConceptoAgenteAduanal: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idConceptoAgenteAduanal != null) __params = __params.set('idConceptoAgenteAduanal', idConceptoAgenteAduanal.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/ConceptoAgenteAduanal`,
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
   * Desactivar registro de ConceptoAgenteAduanal
   * @param idConceptoAgenteAduanal Identificador de registro de ConceptoAgenteAduanal
   * @return OK
   */
  ConceptoAgenteAduanalDesactivar(idConceptoAgenteAduanal: string): __Observable<string> {
    return this.ConceptoAgenteAduanalDesactivarResponse(idConceptoAgenteAduanal).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar registro de ContactoAduana
   * @param idContactoAduana Identificador de ContactoAduana
   * @return OK
   */
  ContactoAduanaObtenerResponse(idContactoAduana: string): __Observable<__StrictHttpResponse<ContactoAduana>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idContactoAduana != null) __params = __params.set('idContactoAduana', idContactoAduana.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/ContactoAduana`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ContactoAduana>;
      })
    );
  }
  /**
   * Consultar registro de ContactoAduana
   * @param idContactoAduana Identificador de ContactoAduana
   * @return OK
   */
  ContactoAduanaObtener(idContactoAduana: string): __Observable<ContactoAduana> {
    return this.ContactoAduanaObtenerResponse(idContactoAduana).pipe(
      __map(_r => _r.body as ContactoAduana)
    );
  }

  /**
   * Guardar o actualizar ContactoAduana
   * @param ContactoAduana ContactoAduana
   * @return OK
   */
  ContactoAduanaGuardarOActualizarResponse(ContactoAduana: ContactoAduana): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = ContactoAduana;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/ContactoAduana`,
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
   * Guardar o actualizar ContactoAduana
   * @param ContactoAduana ContactoAduana
   * @return OK
   */
  ContactoAduanaGuardarOActualizar(ContactoAduana: ContactoAduana): __Observable<string> {
    return this.ContactoAduanaGuardarOActualizarResponse(ContactoAduana).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de ContactoAduana
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  ContactoAduanaQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultContactoAduana>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/ContactoAduana`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultContactoAduana>;
      })
    );
  }
  /**
   * Consultar lista paginada de ContactoAduana
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  ContactoAduanaQueryResult(info: QueryInfo): __Observable<QueryResultContactoAduana> {
    return this.ContactoAduanaQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultContactoAduana)
    );
  }

  /**
   * Desactivar registro de ContactoAduana
   * @param idContactoAduana Identificador de registro de ContactoAduana
   * @return OK
   */
  ContactoAduanaDesactivarResponse(idContactoAduana: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idContactoAduana != null) __params = __params.set('idContactoAduana', idContactoAduana.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/ContactoAduana`,
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
   * Desactivar registro de ContactoAduana
   * @param idContactoAduana Identificador de registro de ContactoAduana
   * @return OK
   */
  ContactoAduanaDesactivar(idContactoAduana: string): __Observable<string> {
    return this.ContactoAduanaDesactivarResponse(idContactoAduana).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de vAgenteAduanal
   * @param info Filtros y ordenamientos
   * @return OK
   */
  vAgenteAduanalQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultVAgenteAduanal>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/vAgenteAduanal`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultVAgenteAduanal>;
      })
    );
  }
  /**
   * Consultar lista paginada de vAgenteAduanal
   * @param info Filtros y ordenamientos
   * @return OK
   */
  vAgenteAduanalQueryResult(info: QueryInfo): __Observable<QueryResultVAgenteAduanal> {
    return this.vAgenteAduanalQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultVAgenteAduanal)
    );
  }
}

module ConfiguracionAduanasService {
}

export { ConfiguracionAduanasService }
