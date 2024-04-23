/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiCatalogosConfiguration as __Configuration } from '../api-catalogos-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { GMClienteCarteraCliente } from '../models/gmcliente-cartera-cliente';
import { GMCarteraClienteUsuario } from '../models/gmcartera-cliente-usuario';
import { GMUsuarioDetalle } from '../models/gmusuario-detalle';
import { GMUsuarioClienteCarteraDetalle } from '../models/gmusuario-cliente-cartera-detalle';
import { UsuariosCartera } from '../models/usuarios-cartera';
import { QueryInfo } from '../models/query-info';
import { Usuario } from '../models/usuario';
import { QueryResultUsuario } from '../models/query-result-usuario';
import { QueryResultVUsuario } from '../models/query-result-vusuario';
@Injectable({
  providedIn: 'root',
})
class SistemaUsuariosService extends __BaseService {
  static readonly UsuarioGuardaroActualizarCarterasPath = '/Usuario/ClienteCarteraCliente';
  static readonly UsuarioGuardarususarioDetallePath = '/Usuario/RegistroUsuario';
  static readonly UsuarioObtenerGMUsuarioClienteCarteraDetallePath = '/Usuario/GMUsuarioClienteCarteraDetalle';
  static readonly UsuarioObtenerListaUsuariosCarteraPath = '/Usuario/ListaUsuariosCartera';
  static readonly UsuarioObtenerPath = '/Usuario';
  static readonly UsuarioGuardarOActualizarPath = '/Usuario';
  static readonly UsuarioQueryResultPath = '/Usuario';
  static readonly UsuarioDesactivarPath = '/Usuario';
  static readonly vUsuarioQueryResultPath = '/vUsuario';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * GuardaroActualizarCarteras Usuario
   * @param GMCarteraClienteUsuario undefined
   * @return OK
   */
  UsuarioGuardaroActualizarCarterasResponse(GMCarteraClienteUsuario: GMCarteraClienteUsuario): __Observable<__StrictHttpResponse<GMClienteCarteraCliente>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = GMCarteraClienteUsuario;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/Usuario/ClienteCarteraCliente`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<GMClienteCarteraCliente>;
      })
    );
  }
  /**
   * GuardaroActualizarCarteras Usuario
   * @param GMCarteraClienteUsuario undefined
   * @return OK
   */
  UsuarioGuardaroActualizarCarteras(GMCarteraClienteUsuario: GMCarteraClienteUsuario): __Observable<GMClienteCarteraCliente> {
    return this.UsuarioGuardaroActualizarCarterasResponse(GMCarteraClienteUsuario).pipe(
      __map(_r => _r.body as GMClienteCarteraCliente)
    );
  }

  /**
   * Servicio para insertar o actualizar Usuario con DatosPersona y CorreoElectronico
   * @param GMUsuarioDetalle
   * @return OK
   */
  UsuarioGuardarususarioDetalleResponse(GMUsuarioDetalle: GMUsuarioDetalle): __Observable<__StrictHttpResponse<GMUsuarioDetalle>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = GMUsuarioDetalle;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/Usuario/RegistroUsuario`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<GMUsuarioDetalle>;
      })
    );
  }
  /**
   * Servicio para insertar o actualizar Usuario con DatosPersona y CorreoElectronico
   * @param GMUsuarioDetalle
   * @return OK
   */
  UsuarioGuardarususarioDetalle(GMUsuarioDetalle: GMUsuarioDetalle): __Observable<GMUsuarioDetalle> {
    return this.UsuarioGuardarususarioDetalleResponse(GMUsuarioDetalle).pipe(
      __map(_r => _r.body as GMUsuarioDetalle)
    );
  }

  /**
   * Servicio para Obtener GMUsuarioClienteCarteraDetalle
   * @param IdUsuario
   * @return OK
   */
  UsuarioObtenerGMUsuarioClienteCarteraDetalleResponse(IdUsuario: string): __Observable<__StrictHttpResponse<GMUsuarioClienteCarteraDetalle>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (IdUsuario != null) __params = __params.set('IdUsuario', IdUsuario.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/Usuario/GMUsuarioClienteCarteraDetalle`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<GMUsuarioClienteCarteraDetalle>;
      })
    );
  }
  /**
   * Servicio para Obtener GMUsuarioClienteCarteraDetalle
   * @param IdUsuario
   * @return OK
   */
  UsuarioObtenerGMUsuarioClienteCarteraDetalle(IdUsuario: string): __Observable<GMUsuarioClienteCarteraDetalle> {
    return this.UsuarioObtenerGMUsuarioClienteCarteraDetalleResponse(IdUsuario).pipe(
      __map(_r => _r.body as GMUsuarioClienteCarteraDetalle)
    );
  }

  /**
   * Servicio para Obtener usuarios y su subordinados en base a su funcion
   * @param info undefined
   * @return OK
   */
  UsuarioObtenerListaUsuariosCarteraResponse(info: QueryInfo): __Observable<__StrictHttpResponse<Array<UsuariosCartera>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/Usuario/ListaUsuariosCartera`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<UsuariosCartera>>;
      })
    );
  }
  /**
   * Servicio para Obtener usuarios y su subordinados en base a su funcion
   * @param info undefined
   * @return OK
   */
  UsuarioObtenerListaUsuariosCartera(info: QueryInfo): __Observable<Array<UsuariosCartera>> {
    return this.UsuarioObtenerListaUsuariosCarteraResponse(info).pipe(
      __map(_r => _r.body as Array<UsuariosCartera>)
    );
  }

  /**
   * Obtener un usuario por su idUsuario
   * @param idUsuario Identificador de usuario.
   * @return OK
   */
  UsuarioObtenerResponse(idUsuario: string): __Observable<__StrictHttpResponse<Usuario>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idUsuario != null) __params = __params.set('idUsuario', idUsuario.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/Usuario`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Usuario>;
      })
    );
  }
  /**
   * Obtener un usuario por su idUsuario
   * @param idUsuario Identificador de usuario.
   * @return OK
   */
  UsuarioObtener(idUsuario: string): __Observable<Usuario> {
    return this.UsuarioObtenerResponse(idUsuario).pipe(
      __map(_r => _r.body as Usuario)
    );
  }

  /**
   * Guardar o actualizar un usuario.
   * @param usuario usuario.
   * @return OK
   */
  UsuarioGuardarOActualizarResponse(usuario: Usuario): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = usuario;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/Usuario`,
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
   * Guardar o actualizar un usuario.
   * @param usuario usuario.
   * @return OK
   */
  UsuarioGuardarOActualizar(usuario: Usuario): __Observable<string> {
    return this.UsuarioGuardarOActualizarResponse(usuario).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Obtener lista de usuario.
   * @param info Objeto de tipo QueryInfo.
   * @return OK
   */
  UsuarioQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultUsuario>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/Usuario`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultUsuario>;
      })
    );
  }
  /**
   * Obtener lista de usuario.
   * @param info Objeto de tipo QueryInfo.
   * @return OK
   */
  UsuarioQueryResult(info: QueryInfo): __Observable<QueryResultUsuario> {
    return this.UsuarioQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultUsuario)
    );
  }

  /**
   * Desactivar Usuario
   * @param idUsuario undefined
   * @return OK
   */
  UsuarioDesactivarResponse(idUsuario: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idUsuario != null) __params = __params.set('idUsuario', idUsuario.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/Usuario`,
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
   * Desactivar Usuario
   * @param idUsuario undefined
   * @return OK
   */
  UsuarioDesactivar(idUsuario: string): __Observable<string> {
    return this.UsuarioDesactivarResponse(idUsuario).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * QueryResult vUsuario
   * @param info undefined
   * @return OK
   */
  vUsuarioQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultVUsuario>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/vUsuario`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultVUsuario>;
      })
    );
  }
  /**
   * QueryResult vUsuario
   * @param info undefined
   * @return OK
   */
  vUsuarioQueryResult(info: QueryInfo): __Observable<QueryResultVUsuario> {
    return this.vUsuarioQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultVUsuario)
    );
  }
}

module SistemaUsuariosService {
}

export { SistemaUsuariosService }
