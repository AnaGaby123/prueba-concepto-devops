/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiLogisticaConfiguration as __Configuration } from '../api-logistica-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { FMessage } from '../models/fmessage';
import { ParametroAutorizacion } from '../models/parametro-autorizacion';
import { AutorizacionDetalle } from '../models/autorizacion-detalle';
import { QueryResultAutorizacionCodigo } from '../models/query-result-autorizacion-codigo';
import { QueryInfo } from '../models/query-info';
import { GMTipoAutorizacionUsuarioDetalle } from '../models/gmtipo-autorizacion-usuario-detalle';
@Injectable({
  providedIn: 'root',
})
class ProcesosAutorizacionesService extends __BaseService {
  static readonly AutorizacionAutorizarSolicitudPath = '/SolicitudAutorizacion/Autorizar';
  static readonly AutorizacionCancelarPath = '/SolicitudAutorizacion/cancelar';
  static readonly AutorizacionGuardarOActualizarPath = '/SolicitudAutorizacion';
  static readonly AutorizacionListadoAutorizacionCodigoValidosPath = '/SolicitudAutorizacion/CodigoValidosVigentes';
  static readonly TipoAutorizacionUsuarioListaTipoAutorizacionUsuarioPath = '/TipoAutorizacionUsuario/TipoAutorizacionDetalle';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Marca un código de autorización con el estatus Autorizado = True.
   * @param parametroAutorizacion Objeto de tipo "ParametroAutorizacion".
   * @return OK
   */
  AutorizacionAutorizarSolicitudResponse(parametroAutorizacion: ParametroAutorizacion): __Observable<__StrictHttpResponse<FMessage>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = parametroAutorizacion;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/SolicitudAutorizacion/Autorizar`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<FMessage>;
      })
    );
  }
  /**
   * Marca un código de autorización con el estatus Autorizado = True.
   * @param parametroAutorizacion Objeto de tipo "ParametroAutorizacion".
   * @return OK
   */
  AutorizacionAutorizarSolicitud(parametroAutorizacion: ParametroAutorizacion): __Observable<FMessage> {
    return this.AutorizacionAutorizarSolicitudResponse(parametroAutorizacion).pipe(
      __map(_r => _r.body as FMessage)
    );
  }

  /**
   * Marca una solicitud de autorizacion con el estatus Cancelada = True.
   * @param IdAutorizacion Objeto de tipo "Guid" a ser cancelado.
   * @return OK
   */
  AutorizacionCancelarResponse(IdAutorizacion: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (IdAutorizacion != null) __params = __params.set('IdAutorizacion', IdAutorizacion.toString());
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/SolicitudAutorizacion/cancelar`,
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
   * Marca una solicitud de autorizacion con el estatus Cancelada = True.
   * @param IdAutorizacion Objeto de tipo "Guid" a ser cancelado.
   * @return OK
   */
  AutorizacionCancelar(IdAutorizacion: string): __Observable<string> {
    return this.AutorizacionCancelarResponse(IdAutorizacion).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Guarda o actualiza un SolicitudAutorizacion.
   * @param parametroAutorizacion Objeto de tipo "ParametroAutorizacion".
   * @return OK
   */
  AutorizacionGuardarOActualizarResponse(parametroAutorizacion: ParametroAutorizacion): __Observable<__StrictHttpResponse<AutorizacionDetalle>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = parametroAutorizacion;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/SolicitudAutorizacion`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<AutorizacionDetalle>;
      })
    );
  }
  /**
   * Guarda o actualiza un SolicitudAutorizacion.
   * @param parametroAutorizacion Objeto de tipo "ParametroAutorizacion".
   * @return OK
   */
  AutorizacionGuardarOActualizar(parametroAutorizacion: ParametroAutorizacion): __Observable<AutorizacionDetalle> {
    return this.AutorizacionGuardarOActualizarResponse(parametroAutorizacion).pipe(
      __map(_r => _r.body as AutorizacionDetalle)
    );
  }

  /**
   * Servicio para obtener listado de AutorizacionCodigo alido y vigentes
   * por medio de los campos IdUsuarioSolicita, IdCatTipoAutorizacion, IdOperacion
   * @param info Lista de filtros para Obtener AutorizacionCodigo
   *            a consultar
   * @return OK
   */
  AutorizacionListadoAutorizacionCodigoValidosResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultAutorizacionCodigo>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/SolicitudAutorizacion/CodigoValidosVigentes`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultAutorizacionCodigo>;
      })
    );
  }
  /**
   * Servicio para obtener listado de AutorizacionCodigo alido y vigentes
   * por medio de los campos IdUsuarioSolicita, IdCatTipoAutorizacion, IdOperacion
   * @param info Lista de filtros para Obtener AutorizacionCodigo
   *            a consultar
   * @return OK
   */
  AutorizacionListadoAutorizacionCodigoValidos(info: QueryInfo): __Observable<QueryResultAutorizacionCodigo> {
    return this.AutorizacionListadoAutorizacionCodigoValidosResponse(info).pipe(
      __map(_r => _r.body as QueryResultAutorizacionCodigo)
    );
  }

  /**
   * Servicio para obtener el objeto de catTipoAutorizacion
   * y un listado de usuarios asociados a este tipo de autorizacion.
   * @param info Lista de filtros para buscar catTipoAutorizacion
   *            a consultar
   * @return OK
   */
  TipoAutorizacionUsuarioListaTipoAutorizacionUsuarioResponse(info: QueryInfo): __Observable<__StrictHttpResponse<GMTipoAutorizacionUsuarioDetalle>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/TipoAutorizacionUsuario/TipoAutorizacionDetalle`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<GMTipoAutorizacionUsuarioDetalle>;
      })
    );
  }
  /**
   * Servicio para obtener el objeto de catTipoAutorizacion
   * y un listado de usuarios asociados a este tipo de autorizacion.
   * @param info Lista de filtros para buscar catTipoAutorizacion
   *            a consultar
   * @return OK
   */
  TipoAutorizacionUsuarioListaTipoAutorizacionUsuario(info: QueryInfo): __Observable<GMTipoAutorizacionUsuarioDetalle> {
    return this.TipoAutorizacionUsuarioListaTipoAutorizacionUsuarioResponse(info).pipe(
      __map(_r => _r.body as GMTipoAutorizacionUsuarioDetalle)
    );
  }
}

module ProcesosAutorizacionesService {
}

export { ProcesosAutorizacionesService }
