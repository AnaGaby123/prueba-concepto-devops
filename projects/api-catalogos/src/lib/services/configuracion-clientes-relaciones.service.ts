/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiCatalogosConfiguration as __Configuration } from '../api-catalogos-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { ArchivoCliente } from '../models/archivo-cliente';
import { QueryResultArchivoCliente } from '../models/query-result-archivo-cliente';
import { QueryInfo } from '../models/query-info';
import { ClienteComentario } from '../models/cliente-comentario';
import { QueryResultClienteComentario } from '../models/query-result-cliente-comentario';
import { ClienteFamilia } from '../models/cliente-familia';
import { QueryResultClienteFamilia } from '../models/query-result-cliente-familia';
import { ClienteTerceroAutorizadoRelacion } from '../models/cliente-tercero-autorizado-relacion';
import { QueryResultClienteTerceroAutorizadoRelacion } from '../models/query-result-cliente-tercero-autorizado-relacion';
import { ContactoCliente } from '../models/contacto-cliente';
import { QueryResultContactoCliente } from '../models/query-result-contacto-cliente';
import { QueryResultVClienteDatosBancarios } from '../models/query-result-vcliente-datos-bancarios';
import { QueryResultVClienteTerceroAutorizadoRelacion } from '../models/query-result-vcliente-tercero-autorizado-relacion';
@Injectable({
  providedIn: 'root',
})
class ConfiguracionClientesRelacionesService extends __BaseService {
  static readonly ArchivoClienteObtenerPath = '/ArchivoCliente';
  static readonly ArchivoClienteGuardarOActualizarPath = '/ArchivoCliente';
  static readonly ArchivoClienteQueryResultPath = '/ArchivoCliente';
  static readonly ArchivoClienteDesactivarPath = '/ArchivoCliente';
  static readonly ClienteComentarioObtenerPath = '/ClienteComentario';
  static readonly ClienteComentarioGuardarOActualizarPath = '/ClienteComentario';
  static readonly ClienteComentarioQueryResultPath = '/ClienteComentario';
  static readonly ClienteComentarioDesactivarPath = '/ClienteComentario';
  static readonly ClienteFamiliaObtenerPath = '/ClienteFamilia';
  static readonly ClienteFamiliaGuardarOActualizarPath = '/ClienteFamilia';
  static readonly ClienteFamiliaQueryResultPath = '/ClienteFamilia';
  static readonly ClienteFamiliaDesactivarPath = '/ClienteFamilia';
  static readonly ClienteTerceroAutorizadoRelacionObtenerPath = '/ClienteTerceroAutorizadoRelacion';
  static readonly ClienteTerceroAutorizadoRelacionGuardarOActualizarPath = '/ClienteTerceroAutorizadoRelacion';
  static readonly ClienteTerceroAutorizadoRelacionQueryResultPath = '/ClienteTerceroAutorizadoRelacion';
  static readonly ClienteTerceroAutorizadoRelacionDesactivarPath = '/ClienteTerceroAutorizadoRelacion';
  static readonly ContactoClienteObtenerPath = '/ContactoCliente';
  static readonly ContactoClienteGuardarOActualizarPath = '/ContactoCliente';
  static readonly ContactoClienteQueryResultPath = '/ContactoCliente';
  static readonly ContactoClienteDesactivarPath = '/ContactoCliente';
  static readonly vClienteDatosBancariosQueryResultPath = '/vClienteDatosBancarios';
  static readonly vClienteTerceroAutorizadoQueryResultPath = '/vClienteTerceroAutorizadoRelacion';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Obtener ArchivoCliente
   * @param idArchivoCliente undefined
   * @return OK
   */
  ArchivoClienteObtenerResponse(idArchivoCliente: string): __Observable<__StrictHttpResponse<ArchivoCliente>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idArchivoCliente != null) __params = __params.set('idArchivoCliente', idArchivoCliente.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/ArchivoCliente`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ArchivoCliente>;
      })
    );
  }
  /**
   * Obtener ArchivoCliente
   * @param idArchivoCliente undefined
   * @return OK
   */
  ArchivoClienteObtener(idArchivoCliente: string): __Observable<ArchivoCliente> {
    return this.ArchivoClienteObtenerResponse(idArchivoCliente).pipe(
      __map(_r => _r.body as ArchivoCliente)
    );
  }

  /**
   * GuardarOActualizar ArchivoCliente
   * @param ArchivoCliente undefined
   * @return OK
   */
  ArchivoClienteGuardarOActualizarResponse(ArchivoCliente: ArchivoCliente): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = ArchivoCliente;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/ArchivoCliente`,
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
   * GuardarOActualizar ArchivoCliente
   * @param ArchivoCliente undefined
   * @return OK
   */
  ArchivoClienteGuardarOActualizar(ArchivoCliente: ArchivoCliente): __Observable<string> {
    return this.ArchivoClienteGuardarOActualizarResponse(ArchivoCliente).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * QueryResult ArchivoCliente
   * @param info undefined
   * @return OK
   */
  ArchivoClienteQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultArchivoCliente>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/ArchivoCliente`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultArchivoCliente>;
      })
    );
  }
  /**
   * QueryResult ArchivoCliente
   * @param info undefined
   * @return OK
   */
  ArchivoClienteQueryResult(info: QueryInfo): __Observable<QueryResultArchivoCliente> {
    return this.ArchivoClienteQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultArchivoCliente)
    );
  }

  /**
   * Desactivar ArchivoCliente
   * @param idArchivoCliente undefined
   * @return OK
   */
  ArchivoClienteDesactivarResponse(idArchivoCliente: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idArchivoCliente != null) __params = __params.set('idArchivoCliente', idArchivoCliente.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/ArchivoCliente`,
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
   * Desactivar ArchivoCliente
   * @param idArchivoCliente undefined
   * @return OK
   */
  ArchivoClienteDesactivar(idArchivoCliente: string): __Observable<string> {
    return this.ArchivoClienteDesactivarResponse(idArchivoCliente).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Obtener ClienteComentario
   * @param idClienteComentario undefined
   * @return OK
   */
  ClienteComentarioObtenerResponse(idClienteComentario: string): __Observable<__StrictHttpResponse<ClienteComentario>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idClienteComentario != null) __params = __params.set('idClienteComentario', idClienteComentario.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/ClienteComentario`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ClienteComentario>;
      })
    );
  }
  /**
   * Obtener ClienteComentario
   * @param idClienteComentario undefined
   * @return OK
   */
  ClienteComentarioObtener(idClienteComentario: string): __Observable<ClienteComentario> {
    return this.ClienteComentarioObtenerResponse(idClienteComentario).pipe(
      __map(_r => _r.body as ClienteComentario)
    );
  }

  /**
   * GuardarOActualizar ClienteComentario
   * @param ClienteComentario undefined
   * @return OK
   */
  ClienteComentarioGuardarOActualizarResponse(ClienteComentario: ClienteComentario): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = ClienteComentario;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/ClienteComentario`,
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
   * GuardarOActualizar ClienteComentario
   * @param ClienteComentario undefined
   * @return OK
   */
  ClienteComentarioGuardarOActualizar(ClienteComentario: ClienteComentario): __Observable<string> {
    return this.ClienteComentarioGuardarOActualizarResponse(ClienteComentario).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * QueryResult ClienteComentario
   * @param info undefined
   * @return OK
   */
  ClienteComentarioQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultClienteComentario>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/ClienteComentario`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultClienteComentario>;
      })
    );
  }
  /**
   * QueryResult ClienteComentario
   * @param info undefined
   * @return OK
   */
  ClienteComentarioQueryResult(info: QueryInfo): __Observable<QueryResultClienteComentario> {
    return this.ClienteComentarioQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultClienteComentario)
    );
  }

  /**
   * Desactivar ClienteComentario
   * @param idClienteComentario undefined
   * @return OK
   */
  ClienteComentarioDesactivarResponse(idClienteComentario: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idClienteComentario != null) __params = __params.set('idClienteComentario', idClienteComentario.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/ClienteComentario`,
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
   * Desactivar ClienteComentario
   * @param idClienteComentario undefined
   * @return OK
   */
  ClienteComentarioDesactivar(idClienteComentario: string): __Observable<string> {
    return this.ClienteComentarioDesactivarResponse(idClienteComentario).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Obtener ClienteFamilia
   * @param idClienteFamilia undefined
   * @return OK
   */
  ClienteFamiliaObtenerResponse(idClienteFamilia: string): __Observable<__StrictHttpResponse<ClienteFamilia>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idClienteFamilia != null) __params = __params.set('idClienteFamilia', idClienteFamilia.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/ClienteFamilia`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ClienteFamilia>;
      })
    );
  }
  /**
   * Obtener ClienteFamilia
   * @param idClienteFamilia undefined
   * @return OK
   */
  ClienteFamiliaObtener(idClienteFamilia: string): __Observable<ClienteFamilia> {
    return this.ClienteFamiliaObtenerResponse(idClienteFamilia).pipe(
      __map(_r => _r.body as ClienteFamilia)
    );
  }

  /**
   * GuardarOActualizar ClienteFamilia
   * @param ClienteFamilia undefined
   * @return OK
   */
  ClienteFamiliaGuardarOActualizarResponse(ClienteFamilia: ClienteFamilia): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = ClienteFamilia;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/ClienteFamilia`,
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
   * GuardarOActualizar ClienteFamilia
   * @param ClienteFamilia undefined
   * @return OK
   */
  ClienteFamiliaGuardarOActualizar(ClienteFamilia: ClienteFamilia): __Observable<string> {
    return this.ClienteFamiliaGuardarOActualizarResponse(ClienteFamilia).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * QueryResult ClienteFamilia
   * @param info undefined
   * @return OK
   */
  ClienteFamiliaQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultClienteFamilia>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/ClienteFamilia`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultClienteFamilia>;
      })
    );
  }
  /**
   * QueryResult ClienteFamilia
   * @param info undefined
   * @return OK
   */
  ClienteFamiliaQueryResult(info: QueryInfo): __Observable<QueryResultClienteFamilia> {
    return this.ClienteFamiliaQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultClienteFamilia)
    );
  }

  /**
   * Desactivar ClienteFamilia
   * @param idClienteFamilia undefined
   * @return OK
   */
  ClienteFamiliaDesactivarResponse(idClienteFamilia: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idClienteFamilia != null) __params = __params.set('idClienteFamilia', idClienteFamilia.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/ClienteFamilia`,
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
   * Desactivar ClienteFamilia
   * @param idClienteFamilia undefined
   * @return OK
   */
  ClienteFamiliaDesactivar(idClienteFamilia: string): __Observable<string> {
    return this.ClienteFamiliaDesactivarResponse(idClienteFamilia).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Obtener ClienteTerceroAutorizadoRelacion
   * @param idClienteTerceroAutorizadoRelacion undefined
   * @return OK
   */
  ClienteTerceroAutorizadoRelacionObtenerResponse(idClienteTerceroAutorizadoRelacion: string): __Observable<__StrictHttpResponse<ClienteTerceroAutorizadoRelacion>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idClienteTerceroAutorizadoRelacion != null) __params = __params.set('idClienteTerceroAutorizadoRelacion', idClienteTerceroAutorizadoRelacion.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/ClienteTerceroAutorizadoRelacion`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ClienteTerceroAutorizadoRelacion>;
      })
    );
  }
  /**
   * Obtener ClienteTerceroAutorizadoRelacion
   * @param idClienteTerceroAutorizadoRelacion undefined
   * @return OK
   */
  ClienteTerceroAutorizadoRelacionObtener(idClienteTerceroAutorizadoRelacion: string): __Observable<ClienteTerceroAutorizadoRelacion> {
    return this.ClienteTerceroAutorizadoRelacionObtenerResponse(idClienteTerceroAutorizadoRelacion).pipe(
      __map(_r => _r.body as ClienteTerceroAutorizadoRelacion)
    );
  }

  /**
   * GuardarOActualizar ClienteTerceroAutorizadoRelacion
   * @param ClienteTerceroAutorizadoRelacion undefined
   * @return OK
   */
  ClienteTerceroAutorizadoRelacionGuardarOActualizarResponse(ClienteTerceroAutorizadoRelacion: ClienteTerceroAutorizadoRelacion): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = ClienteTerceroAutorizadoRelacion;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/ClienteTerceroAutorizadoRelacion`,
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
   * GuardarOActualizar ClienteTerceroAutorizadoRelacion
   * @param ClienteTerceroAutorizadoRelacion undefined
   * @return OK
   */
  ClienteTerceroAutorizadoRelacionGuardarOActualizar(ClienteTerceroAutorizadoRelacion: ClienteTerceroAutorizadoRelacion): __Observable<string> {
    return this.ClienteTerceroAutorizadoRelacionGuardarOActualizarResponse(ClienteTerceroAutorizadoRelacion).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * QueryResult ClienteTerceroAutorizadoRelacion
   * @param info undefined
   * @return OK
   */
  ClienteTerceroAutorizadoRelacionQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultClienteTerceroAutorizadoRelacion>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/ClienteTerceroAutorizadoRelacion`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultClienteTerceroAutorizadoRelacion>;
      })
    );
  }
  /**
   * QueryResult ClienteTerceroAutorizadoRelacion
   * @param info undefined
   * @return OK
   */
  ClienteTerceroAutorizadoRelacionQueryResult(info: QueryInfo): __Observable<QueryResultClienteTerceroAutorizadoRelacion> {
    return this.ClienteTerceroAutorizadoRelacionQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultClienteTerceroAutorizadoRelacion)
    );
  }

  /**
   * Desactivar ClienteTerceroAutorizadoRelacion
   * @param idClienteTerceroAutorizadoRelacion undefined
   * @return OK
   */
  ClienteTerceroAutorizadoRelacionDesactivarResponse(idClienteTerceroAutorizadoRelacion: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idClienteTerceroAutorizadoRelacion != null) __params = __params.set('idClienteTerceroAutorizadoRelacion', idClienteTerceroAutorizadoRelacion.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/ClienteTerceroAutorizadoRelacion`,
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
   * Desactivar ClienteTerceroAutorizadoRelacion
   * @param idClienteTerceroAutorizadoRelacion undefined
   * @return OK
   */
  ClienteTerceroAutorizadoRelacionDesactivar(idClienteTerceroAutorizadoRelacion: string): __Observable<string> {
    return this.ClienteTerceroAutorizadoRelacionDesactivarResponse(idClienteTerceroAutorizadoRelacion).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Obtener ContactoCliente
   * @param idContactoCliente undefined
   * @return OK
   */
  ContactoClienteObtenerResponse(idContactoCliente: string): __Observable<__StrictHttpResponse<ContactoCliente>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idContactoCliente != null) __params = __params.set('idContactoCliente', idContactoCliente.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/ContactoCliente`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ContactoCliente>;
      })
    );
  }
  /**
   * Obtener ContactoCliente
   * @param idContactoCliente undefined
   * @return OK
   */
  ContactoClienteObtener(idContactoCliente: string): __Observable<ContactoCliente> {
    return this.ContactoClienteObtenerResponse(idContactoCliente).pipe(
      __map(_r => _r.body as ContactoCliente)
    );
  }

  /**
   * GuardarOActualizar ContactoCliente
   * @param ContactoCliente undefined
   * @return OK
   */
  ContactoClienteGuardarOActualizarResponse(ContactoCliente: ContactoCliente): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = ContactoCliente;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/ContactoCliente`,
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
   * GuardarOActualizar ContactoCliente
   * @param ContactoCliente undefined
   * @return OK
   */
  ContactoClienteGuardarOActualizar(ContactoCliente: ContactoCliente): __Observable<string> {
    return this.ContactoClienteGuardarOActualizarResponse(ContactoCliente).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * QueryResult ContactoCliente
   * @param info undefined
   * @return OK
   */
  ContactoClienteQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultContactoCliente>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/ContactoCliente`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultContactoCliente>;
      })
    );
  }
  /**
   * QueryResult ContactoCliente
   * @param info undefined
   * @return OK
   */
  ContactoClienteQueryResult(info: QueryInfo): __Observable<QueryResultContactoCliente> {
    return this.ContactoClienteQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultContactoCliente)
    );
  }

  /**
   * Desactivar ContactoCliente
   * @param idContactoCliente undefined
   * @return OK
   */
  ContactoClienteDesactivarResponse(idContactoCliente: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idContactoCliente != null) __params = __params.set('idContactoCliente', idContactoCliente.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/ContactoCliente`,
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
   * Desactivar ContactoCliente
   * @param idContactoCliente undefined
   * @return OK
   */
  ContactoClienteDesactivar(idContactoCliente: string): __Observable<string> {
    return this.ContactoClienteDesactivarResponse(idContactoCliente).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * QueryResult vClienteDatosBancarios
   * @param info undefined
   * @return OK
   */
  vClienteDatosBancariosQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultVClienteDatosBancarios>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/vClienteDatosBancarios`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultVClienteDatosBancarios>;
      })
    );
  }
  /**
   * QueryResult vClienteDatosBancarios
   * @param info undefined
   * @return OK
   */
  vClienteDatosBancariosQueryResult(info: QueryInfo): __Observable<QueryResultVClienteDatosBancarios> {
    return this.vClienteDatosBancariosQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultVClienteDatosBancarios)
    );
  }

  /**
   * Consultar lista paginada de vClienteTerceroAutorizado
   * @param info Filtros y ordenamientos
   * @return OK
   */
  vClienteTerceroAutorizadoQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultVClienteTerceroAutorizadoRelacion>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/vClienteTerceroAutorizadoRelacion`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultVClienteTerceroAutorizadoRelacion>;
      })
    );
  }
  /**
   * Consultar lista paginada de vClienteTerceroAutorizado
   * @param info Filtros y ordenamientos
   * @return OK
   */
  vClienteTerceroAutorizadoQueryResult(info: QueryInfo): __Observable<QueryResultVClienteTerceroAutorizadoRelacion> {
    return this.vClienteTerceroAutorizadoQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultVClienteTerceroAutorizadoRelacion)
    );
  }
}

module ConfiguracionClientesRelacionesService {
}

export { ConfiguracionClientesRelacionesService }
