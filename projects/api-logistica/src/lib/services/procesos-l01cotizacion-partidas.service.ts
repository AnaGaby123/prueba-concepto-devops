/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiLogisticaConfiguration as __Configuration } from '../api-logistica-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { CotPartidaCotizacion } from '../models/cot-partida-cotizacion';
import { QueryResultCotPartidaCotizacion } from '../models/query-result-cot-partida-cotizacion';
import { QueryInfo } from '../models/query-info';
import { CotPartidaCotizacionCapacitacionFecha } from '../models/cot-partida-cotizacion-capacitacion-fecha';
import { CotPartidaCotizacionDetalle } from '../models/cot-partida-cotizacion-detalle';
import { VPartidaCotizacion } from '../models/vpartida-cotizacion';
import { CotPartidaCotizacionFactoryInput } from '../models/cot-partida-cotizacion-factory-input';
import { GMPartidaInvestigacionCotizador } from '../models/gmpartida-investigacion-cotizador';
import { ReatenderPartidaInvestigacion } from '../models/reatender-partida-investigacion';
import { CotPartidaInvetigacionAtencionComentariosObj } from '../models/cot-partida-invetigacion-atencion-comentarios-obj';
import { CotPartidaCotizacionInvestigacion } from '../models/cot-partida-cotizacion-investigacion';
import { QueryResultCotPartidaCotizacionInvestigacion } from '../models/query-result-cot-partida-cotizacion-investigacion';
import { CotPartidaCotizacionSeguimiento } from '../models/cot-partida-cotizacion-seguimiento';
import { QueryResultCotPartidaCotizacionSeguimiento } from '../models/query-result-cot-partida-cotizacion-seguimiento';
import { QueryResultPartidaCotizacionControlarPromesaDeCompraObj } from '../models/query-result-partida-cotizacion-controlar-promesa-de-compra-obj';
import { GroupQueryResultPartidaCotizacionCerrarOfertaObj } from '../models/group-query-result-partida-cotizacion-cerrar-oferta-obj';
import { GroupQueryInfo } from '../models/group-query-info';
import { QueryResultPartidaCotizacionCerrarOfertaObj } from '../models/query-result-partida-cotizacion-cerrar-oferta-obj';
import { QueryResultVPartidaCotizacion } from '../models/query-result-vpartida-cotizacion';
@Injectable({
  providedIn: 'root',
})
class ProcesosL01CotizacionPartidasService extends __BaseService {
  static readonly cotPartidaCotizacionObtenerPath = '/cotPartidaCotizacion';
  static readonly cotPartidaCotizacionGuardarOActualizarPath = '/cotPartidaCotizacion';
  static readonly cotPartidaCotizacionQueryResultPath = '/cotPartidaCotizacion';
  static readonly cotPartidaCotizacionDesactivarPath = '/cotPartidaCotizacion';
  static readonly cotPartidaCotizacionCapacitacionFechaObtenerPath = '/cotPartidaCotizacionCapacitacionFecha';
  static readonly cotPartidaCotizacionDetalleObtenerPartidasConDetallePath = '/cotPartidaCotizacionDetalle';
  static readonly cotPartidaCotizacionExtensionsFabricarCotPartidaCotizacionPath = '/FabricarCotPartidaCotizacion';
  static readonly cotPartidaCotizacionInvestigacionGuardarOActualizarPartidaInvestigacionCotizadorPath = '/cotPartidaCotizacionInvestigacion/GuardarPartidaInvestigacionCotizador';
  static readonly cotPartidaCotizacionInvestigacionGuardarReatenderPartidaInvestigacionCotizadorPath = '/cotPartidaCotizacionInvestigacion/ReatenderPartidaInvestigacionCotizador';
  static readonly cotPartidaCotizacionInvestigacionPartidaInvetigacionAtencionComentariosDetallePath = '/cotPartidaCotizacionInvestigacion/PartidaInvestigacionAtencionDetalle';
  static readonly cotPartidaCotizacionInvestigacionObtenerPath = '/cotPartidaCotizacionInvestigacion';
  static readonly cotPartidaCotizacionInvestigacionGuardarOActualizarPath = '/cotPartidaCotizacionInvestigacion';
  static readonly cotPartidaCotizacionInvestigacionQueryResultPath = '/cotPartidaCotizacionInvestigacion';
  static readonly cotPartidaCotizacionInvestigacionDesactivarPath = '/cotPartidaCotizacionInvestigacion';
  static readonly cotPartidaCotizacionSeguimientoObtenerPath = '/cotPartidaCotizacionSeguimiento';
  static readonly cotPartidaCotizacionSeguimientoGuardarOActualizarPath = '/cotPartidaCotizacionSeguimiento';
  static readonly cotPartidaCotizacionSeguimientoQueryResultPath = '/cotPartidaCotizacionSeguimiento';
  static readonly cotPartidaCotizacionSeguimientoDesactivarPath = '/cotPartidaCotizacionSeguimiento';
  static readonly PartidaCotizacionObjControlarPromesaDeCompraPath = '/PartidaCotizacionObj/ControlarPromesaDeCompra';
  static readonly PartidaCotizacionObjGroupQueryResultPath = '/GrupoListaPartidaCotizacionObj';
  static readonly PartidaCotizacionObjQueryResultPath = '/PartidaCotizacionObj';
  static readonly vPartidaCotizacionObtenerPath = '/vPartidaCotizacion';
  static readonly vPartidaCotizacionQueryResultPath = '/vPartidaCotizacion';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Obtener un cotPartidaCotizacion por su idCotPartidaCotizacion
   * @param idCotPartidaCotizacion identificador del cotPartidaCotizacion
   * @return OK
   */
  cotPartidaCotizacionObtenerResponse(idCotPartidaCotizacion: string): __Observable<__StrictHttpResponse<CotPartidaCotizacion>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idCotPartidaCotizacion != null) __params = __params.set('idCotPartidaCotizacion', idCotPartidaCotizacion.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/cotPartidaCotizacion`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CotPartidaCotizacion>;
      })
    );
  }
  /**
   * Obtener un cotPartidaCotizacion por su idCotPartidaCotizacion
   * @param idCotPartidaCotizacion identificador del cotPartidaCotizacion
   * @return OK
   */
  cotPartidaCotizacionObtener(idCotPartidaCotizacion: string): __Observable<CotPartidaCotizacion> {
    return this.cotPartidaCotizacionObtenerResponse(idCotPartidaCotizacion).pipe(
      __map(_r => _r.body as CotPartidaCotizacion)
    );
  }

  /**
   * Guardar o actualizar un cotPartidaCotizacion
   * @param partidaCotizacion cotPartidaCotizacion a actualizar o guardar
   * @return OK
   */
  cotPartidaCotizacionGuardarOActualizarResponse(partidaCotizacion: CotPartidaCotizacion): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = partidaCotizacion;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/cotPartidaCotizacion`,
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
   * Guardar o actualizar un cotPartidaCotizacion
   * @param partidaCotizacion cotPartidaCotizacion a actualizar o guardar
   * @return OK
   */
  cotPartidaCotizacionGuardarOActualizar(partidaCotizacion: CotPartidaCotizacion): __Observable<string> {
    return this.cotPartidaCotizacionGuardarOActualizarResponse(partidaCotizacion).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Obtener lista de cotPartidaCotizacion.
   * @param info Objeto de tipo QueryInfo para obtener la lista.
   * @return OK
   */
  cotPartidaCotizacionQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultCotPartidaCotizacion>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/cotPartidaCotizacion`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultCotPartidaCotizacion>;
      })
    );
  }
  /**
   * Obtener lista de cotPartidaCotizacion.
   * @param info Objeto de tipo QueryInfo para obtener la lista.
   * @return OK
   */
  cotPartidaCotizacionQueryResult(info: QueryInfo): __Observable<QueryResultCotPartidaCotizacion> {
    return this.cotPartidaCotizacionQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultCotPartidaCotizacion)
    );
  }

  /**
   * Desactivar un cotPartidaCotizacion. Desactiva las partidas hijas que son los complementos y suplementos.
   * @param idCotPartidaCotizacion Identificador de cotPartidaCotizacion a ser desactivado.
   * @return OK
   */
  cotPartidaCotizacionDesactivarResponse(idCotPartidaCotizacion: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idCotPartidaCotizacion != null) __params = __params.set('idCotPartidaCotizacion', idCotPartidaCotizacion.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/cotPartidaCotizacion`,
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
   * Desactivar un cotPartidaCotizacion. Desactiva las partidas hijas que son los complementos y suplementos.
   * @param idCotPartidaCotizacion Identificador de cotPartidaCotizacion a ser desactivado.
   * @return OK
   */
  cotPartidaCotizacionDesactivar(idCotPartidaCotizacion: string): __Observable<string> {
    return this.cotPartidaCotizacionDesactivarResponse(idCotPartidaCotizacion).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Obtener cotPartidaCotizacionCapacitacionFecha
   * @param IdCotPartidaCotizacion undefined
   * @return OK
   */
  cotPartidaCotizacionCapacitacionFechaObtenerResponse(IdCotPartidaCotizacion: string): __Observable<__StrictHttpResponse<Array<CotPartidaCotizacionCapacitacionFecha>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (IdCotPartidaCotizacion != null) __params = __params.set('IdCotPartidaCotizacion', IdCotPartidaCotizacion.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/cotPartidaCotizacionCapacitacionFecha`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<CotPartidaCotizacionCapacitacionFecha>>;
      })
    );
  }
  /**
   * Obtener cotPartidaCotizacionCapacitacionFecha
   * @param IdCotPartidaCotizacion undefined
   * @return OK
   */
  cotPartidaCotizacionCapacitacionFechaObtener(IdCotPartidaCotizacion: string): __Observable<Array<CotPartidaCotizacionCapacitacionFecha>> {
    return this.cotPartidaCotizacionCapacitacionFechaObtenerResponse(IdCotPartidaCotizacion).pipe(
      __map(_r => _r.body as Array<CotPartidaCotizacionCapacitacionFecha>)
    );
  }

  /**
   * ObtenerPartidasConDetalle cotPartidaCotizacionDetalle
   * @param info undefined
   * @return OK
   */
  cotPartidaCotizacionDetalleObtenerPartidasConDetalleResponse(info: QueryInfo): __Observable<__StrictHttpResponse<Array<CotPartidaCotizacionDetalle>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/cotPartidaCotizacionDetalle`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<CotPartidaCotizacionDetalle>>;
      })
    );
  }
  /**
   * ObtenerPartidasConDetalle cotPartidaCotizacionDetalle
   * @param info undefined
   * @return OK
   */
  cotPartidaCotizacionDetalleObtenerPartidasConDetalle(info: QueryInfo): __Observable<Array<CotPartidaCotizacionDetalle>> {
    return this.cotPartidaCotizacionDetalleObtenerPartidasConDetalleResponse(info).pipe(
      __map(_r => _r.body as Array<CotPartidaCotizacionDetalle>)
    );
  }

  /**
   * Método para fabricar una partida de cotización con un producto y una cotización ya armada
   * @param cotPartidaCotizacionFactoryInput Entrada para fábrica de partida de cotización
   * @return OK
   */
  cotPartidaCotizacionExtensionsFabricarCotPartidaCotizacionResponse(cotPartidaCotizacionFactoryInput: CotPartidaCotizacionFactoryInput): __Observable<__StrictHttpResponse<VPartidaCotizacion>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = cotPartidaCotizacionFactoryInput;
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/FabricarCotPartidaCotizacion`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<VPartidaCotizacion>;
      })
    );
  }
  /**
   * Método para fabricar una partida de cotización con un producto y una cotización ya armada
   * @param cotPartidaCotizacionFactoryInput Entrada para fábrica de partida de cotización
   * @return OK
   */
  cotPartidaCotizacionExtensionsFabricarCotPartidaCotizacion(cotPartidaCotizacionFactoryInput: CotPartidaCotizacionFactoryInput): __Observable<VPartidaCotizacion> {
    return this.cotPartidaCotizacionExtensionsFabricarCotPartidaCotizacionResponse(cotPartidaCotizacionFactoryInput).pipe(
      __map(_r => _r.body as VPartidaCotizacion)
    );
  }

  /**
   * Registro de producto fuera del sistema .
   * @param GMPartidaInvestigacionCotizador Objeto de tipo GMPartidaInvestigacionCotizador para
   *             registrar la partida por investigar con sus comentarios.
   * @return OK
   */
  cotPartidaCotizacionInvestigacionGuardarOActualizarPartidaInvestigacionCotizadorResponse(GMPartidaInvestigacionCotizador: GMPartidaInvestigacionCotizador): __Observable<__StrictHttpResponse<GMPartidaInvestigacionCotizador>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = GMPartidaInvestigacionCotizador;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/cotPartidaCotizacionInvestigacion/GuardarPartidaInvestigacionCotizador`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<GMPartidaInvestigacionCotizador>;
      })
    );
  }
  /**
   * Registro de producto fuera del sistema .
   * @param GMPartidaInvestigacionCotizador Objeto de tipo GMPartidaInvestigacionCotizador para
   *             registrar la partida por investigar con sus comentarios.
   * @return OK
   */
  cotPartidaCotizacionInvestigacionGuardarOActualizarPartidaInvestigacionCotizador(GMPartidaInvestigacionCotizador: GMPartidaInvestigacionCotizador): __Observable<GMPartidaInvestigacionCotizador> {
    return this.cotPartidaCotizacionInvestigacionGuardarOActualizarPartidaInvestigacionCotizadorResponse(GMPartidaInvestigacionCotizador).pipe(
      __map(_r => _r.body as GMPartidaInvestigacionCotizador)
    );
  }

  /**
   * Registro de producto fuera del sistema .
   * @param ReatenderPartidaInvestigacion Objeto de tipo ReatenderPartidaInvestigacion para
   *             reatender la partida por investigar con sus comentarios.
   * @return OK
   */
  cotPartidaCotizacionInvestigacionGuardarReatenderPartidaInvestigacionCotizadorResponse(ReatenderPartidaInvestigacion: ReatenderPartidaInvestigacion): __Observable<__StrictHttpResponse<GMPartidaInvestigacionCotizador>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = ReatenderPartidaInvestigacion;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/cotPartidaCotizacionInvestigacion/ReatenderPartidaInvestigacionCotizador`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<GMPartidaInvestigacionCotizador>;
      })
    );
  }
  /**
   * Registro de producto fuera del sistema .
   * @param ReatenderPartidaInvestigacion Objeto de tipo ReatenderPartidaInvestigacion para
   *             reatender la partida por investigar con sus comentarios.
   * @return OK
   */
  cotPartidaCotizacionInvestigacionGuardarReatenderPartidaInvestigacionCotizador(ReatenderPartidaInvestigacion: ReatenderPartidaInvestigacion): __Observable<GMPartidaInvestigacionCotizador> {
    return this.cotPartidaCotizacionInvestigacionGuardarReatenderPartidaInvestigacionCotizadorResponse(ReatenderPartidaInvestigacion).pipe(
      __map(_r => _r.body as GMPartidaInvestigacionCotizador)
    );
  }

  /**
   * Consultar de partidas en investigacion con atencion con comentarios.
   * @param IdCotPartidaCotizacionInvestigacion Identificador de CotPartidaCotizacionInvestigacion
   *             para consultar.
   * @return OK
   */
  cotPartidaCotizacionInvestigacionPartidaInvetigacionAtencionComentariosDetalleResponse(IdCotPartidaCotizacionInvestigacion: string): __Observable<__StrictHttpResponse<CotPartidaInvetigacionAtencionComentariosObj>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (IdCotPartidaCotizacionInvestigacion != null) __params = __params.set('IdCotPartidaCotizacionInvestigacion', IdCotPartidaCotizacionInvestigacion.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/cotPartidaCotizacionInvestigacion/PartidaInvestigacionAtencionDetalle`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CotPartidaInvetigacionAtencionComentariosObj>;
      })
    );
  }
  /**
   * Consultar de partidas en investigacion con atencion con comentarios.
   * @param IdCotPartidaCotizacionInvestigacion Identificador de CotPartidaCotizacionInvestigacion
   *             para consultar.
   * @return OK
   */
  cotPartidaCotizacionInvestigacionPartidaInvetigacionAtencionComentariosDetalle(IdCotPartidaCotizacionInvestigacion: string): __Observable<CotPartidaInvetigacionAtencionComentariosObj> {
    return this.cotPartidaCotizacionInvestigacionPartidaInvetigacionAtencionComentariosDetalleResponse(IdCotPartidaCotizacionInvestigacion).pipe(
      __map(_r => _r.body as CotPartidaInvetigacionAtencionComentariosObj)
    );
  }

  /**
   * Obtener un cotPartidaCotizacionInvestigacion por su idCotPartidaCotizacionInvestigacion
   * @param idCotPartidaCotizacionInvestigacion identificador del cotPartidaCotizacionInvestigacion
   * @return OK
   */
  cotPartidaCotizacionInvestigacionObtenerResponse(idCotPartidaCotizacionInvestigacion: string): __Observable<__StrictHttpResponse<CotPartidaCotizacionInvestigacion>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idCotPartidaCotizacionInvestigacion != null) __params = __params.set('idCotPartidaCotizacionInvestigacion', idCotPartidaCotizacionInvestigacion.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/cotPartidaCotizacionInvestigacion`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CotPartidaCotizacionInvestigacion>;
      })
    );
  }
  /**
   * Obtener un cotPartidaCotizacionInvestigacion por su idCotPartidaCotizacionInvestigacion
   * @param idCotPartidaCotizacionInvestigacion identificador del cotPartidaCotizacionInvestigacion
   * @return OK
   */
  cotPartidaCotizacionInvestigacionObtener(idCotPartidaCotizacionInvestigacion: string): __Observable<CotPartidaCotizacionInvestigacion> {
    return this.cotPartidaCotizacionInvestigacionObtenerResponse(idCotPartidaCotizacionInvestigacion).pipe(
      __map(_r => _r.body as CotPartidaCotizacionInvestigacion)
    );
  }

  /**
   * Guardar o actualizar un cotPartidaCotizacionInvestigacion
   * @param PartidaCotizacionInvestigacion cotPartidaCotizacionInvestigacion a actualizar o guardar
   * @return OK
   */
  cotPartidaCotizacionInvestigacionGuardarOActualizarResponse(PartidaCotizacionInvestigacion: CotPartidaCotizacionInvestigacion): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = PartidaCotizacionInvestigacion;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/cotPartidaCotizacionInvestigacion`,
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
   * Guardar o actualizar un cotPartidaCotizacionInvestigacion
   * @param PartidaCotizacionInvestigacion cotPartidaCotizacionInvestigacion a actualizar o guardar
   * @return OK
   */
  cotPartidaCotizacionInvestigacionGuardarOActualizar(PartidaCotizacionInvestigacion: CotPartidaCotizacionInvestigacion): __Observable<string> {
    return this.cotPartidaCotizacionInvestigacionGuardarOActualizarResponse(PartidaCotizacionInvestigacion).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Obtener lista de cotPartidaCotizacionInvestigacion.
   * @param info Objeto de tipo QueryInfo para obtener la lista.
   * @return OK
   */
  cotPartidaCotizacionInvestigacionQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultCotPartidaCotizacionInvestigacion>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/cotPartidaCotizacionInvestigacion`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultCotPartidaCotizacionInvestigacion>;
      })
    );
  }
  /**
   * Obtener lista de cotPartidaCotizacionInvestigacion.
   * @param info Objeto de tipo QueryInfo para obtener la lista.
   * @return OK
   */
  cotPartidaCotizacionInvestigacionQueryResult(info: QueryInfo): __Observable<QueryResultCotPartidaCotizacionInvestigacion> {
    return this.cotPartidaCotizacionInvestigacionQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultCotPartidaCotizacionInvestigacion)
    );
  }

  /**
   * Desactivar un cotPartidaCotizacionInvestigacion.
   * @param idCotPartidaCotizacionInvestigacion Identificador de cotPartidaCotizacionInvestigacion a ser desactivado.
   * @return OK
   */
  cotPartidaCotizacionInvestigacionDesactivarResponse(idCotPartidaCotizacionInvestigacion: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idCotPartidaCotizacionInvestigacion != null) __params = __params.set('idCotPartidaCotizacionInvestigacion', idCotPartidaCotizacionInvestigacion.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/cotPartidaCotizacionInvestigacion`,
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
   * Desactivar un cotPartidaCotizacionInvestigacion.
   * @param idCotPartidaCotizacionInvestigacion Identificador de cotPartidaCotizacionInvestigacion a ser desactivado.
   * @return OK
   */
  cotPartidaCotizacionInvestigacionDesactivar(idCotPartidaCotizacionInvestigacion: string): __Observable<string> {
    return this.cotPartidaCotizacionInvestigacionDesactivarResponse(idCotPartidaCotizacionInvestigacion).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Obtener un cotPartidaCotizacionSeguimiento por su idcotPartidaCotizacionSeguimiento
   * @param idcotPartidaCotizacionSeguimiento identificador del cotPartidaCotizacionSeguimiento
   * @return OK
   */
  cotPartidaCotizacionSeguimientoObtenerResponse(idcotPartidaCotizacionSeguimiento: string): __Observable<__StrictHttpResponse<CotPartidaCotizacionSeguimiento>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcotPartidaCotizacionSeguimiento != null) __params = __params.set('idcotPartidaCotizacionSeguimiento', idcotPartidaCotizacionSeguimiento.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/cotPartidaCotizacionSeguimiento`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CotPartidaCotizacionSeguimiento>;
      })
    );
  }
  /**
   * Obtener un cotPartidaCotizacionSeguimiento por su idcotPartidaCotizacionSeguimiento
   * @param idcotPartidaCotizacionSeguimiento identificador del cotPartidaCotizacionSeguimiento
   * @return OK
   */
  cotPartidaCotizacionSeguimientoObtener(idcotPartidaCotizacionSeguimiento: string): __Observable<CotPartidaCotizacionSeguimiento> {
    return this.cotPartidaCotizacionSeguimientoObtenerResponse(idcotPartidaCotizacionSeguimiento).pipe(
      __map(_r => _r.body as CotPartidaCotizacionSeguimiento)
    );
  }

  /**
   * Guardar o actualizar un cotPartidaCotizacionSeguimiento
   * @param partidaCotizacion cotPartidaCotizacionSeguimiento a actualizar o guardar
   * @return OK
   */
  cotPartidaCotizacionSeguimientoGuardarOActualizarResponse(partidaCotizacion: CotPartidaCotizacionSeguimiento): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = partidaCotizacion;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/cotPartidaCotizacionSeguimiento`,
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
   * Guardar o actualizar un cotPartidaCotizacionSeguimiento
   * @param partidaCotizacion cotPartidaCotizacionSeguimiento a actualizar o guardar
   * @return OK
   */
  cotPartidaCotizacionSeguimientoGuardarOActualizar(partidaCotizacion: CotPartidaCotizacionSeguimiento): __Observable<string> {
    return this.cotPartidaCotizacionSeguimientoGuardarOActualizarResponse(partidaCotizacion).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Obtener lista de cotPartidaCotizacionSeguimiento.
   * @param info Objeto de tipo QueryInfo para obtener la lista.
   * @return OK
   */
  cotPartidaCotizacionSeguimientoQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultCotPartidaCotizacionSeguimiento>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/cotPartidaCotizacionSeguimiento`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultCotPartidaCotizacionSeguimiento>;
      })
    );
  }
  /**
   * Obtener lista de cotPartidaCotizacionSeguimiento.
   * @param info Objeto de tipo QueryInfo para obtener la lista.
   * @return OK
   */
  cotPartidaCotizacionSeguimientoQueryResult(info: QueryInfo): __Observable<QueryResultCotPartidaCotizacionSeguimiento> {
    return this.cotPartidaCotizacionSeguimientoQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultCotPartidaCotizacionSeguimiento)
    );
  }

  /**
   * Desactivar un cotPartidaCotizacionSeguimiento. Desactiva las partidas hijas que son los complementos y suplementos.
   * @param idcotPartidaCotizacionSeguimiento Identificador de cotPartidaCotizacionSeguimiento a ser desactivado.
   * @return OK
   */
  cotPartidaCotizacionSeguimientoDesactivarResponse(idcotPartidaCotizacionSeguimiento: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcotPartidaCotizacionSeguimiento != null) __params = __params.set('idcotPartidaCotizacionSeguimiento', idcotPartidaCotizacionSeguimiento.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/cotPartidaCotizacionSeguimiento`,
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
   * Desactivar un cotPartidaCotizacionSeguimiento. Desactiva las partidas hijas que son los complementos y suplementos.
   * @param idcotPartidaCotizacionSeguimiento Identificador de cotPartidaCotizacionSeguimiento a ser desactivado.
   * @return OK
   */
  cotPartidaCotizacionSeguimientoDesactivar(idcotPartidaCotizacionSeguimiento: string): __Observable<string> {
    return this.cotPartidaCotizacionSeguimientoDesactivarResponse(idcotPartidaCotizacionSeguimiento).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * ControlarPromesaDeCompra PartidaCotizacionObj
   * @param info undefined
   * @return OK
   */
  PartidaCotizacionObjControlarPromesaDeCompraResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultPartidaCotizacionControlarPromesaDeCompraObj>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/PartidaCotizacionObj/ControlarPromesaDeCompra`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultPartidaCotizacionControlarPromesaDeCompraObj>;
      })
    );
  }
  /**
   * ControlarPromesaDeCompra PartidaCotizacionObj
   * @param info undefined
   * @return OK
   */
  PartidaCotizacionObjControlarPromesaDeCompra(info: QueryInfo): __Observable<QueryResultPartidaCotizacionControlarPromesaDeCompraObj> {
    return this.PartidaCotizacionObjControlarPromesaDeCompraResponse(info).pipe(
      __map(_r => _r.body as QueryResultPartidaCotizacionControlarPromesaDeCompraObj)
    );
  }

  /**
   * GroupQueryResult PartidaCotizacionObj
   * @param info undefined
   * @return OK
   */
  PartidaCotizacionObjGroupQueryResultResponse(info: GroupQueryInfo): __Observable<__StrictHttpResponse<GroupQueryResultPartidaCotizacionCerrarOfertaObj>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/GrupoListaPartidaCotizacionObj`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<GroupQueryResultPartidaCotizacionCerrarOfertaObj>;
      })
    );
  }
  /**
   * GroupQueryResult PartidaCotizacionObj
   * @param info undefined
   * @return OK
   */
  PartidaCotizacionObjGroupQueryResult(info: GroupQueryInfo): __Observable<GroupQueryResultPartidaCotizacionCerrarOfertaObj> {
    return this.PartidaCotizacionObjGroupQueryResultResponse(info).pipe(
      __map(_r => _r.body as GroupQueryResultPartidaCotizacionCerrarOfertaObj)
    );
  }

  /**
   * QueryResult PartidaCotizacionObj
   * @param info undefined
   * @return OK
   */
  PartidaCotizacionObjQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultPartidaCotizacionCerrarOfertaObj>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/PartidaCotizacionObj`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultPartidaCotizacionCerrarOfertaObj>;
      })
    );
  }
  /**
   * QueryResult PartidaCotizacionObj
   * @param info undefined
   * @return OK
   */
  PartidaCotizacionObjQueryResult(info: QueryInfo): __Observable<QueryResultPartidaCotizacionCerrarOfertaObj> {
    return this.PartidaCotizacionObjQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultPartidaCotizacionCerrarOfertaObj)
    );
  }

  /**
   * Obtener vPartidaCotizacion
   * @param idCotPartidaCotizacion undefined
   * @return OK
   */
  vPartidaCotizacionObtenerResponse(idCotPartidaCotizacion: string): __Observable<__StrictHttpResponse<VPartidaCotizacion>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idCotPartidaCotizacion != null) __params = __params.set('idCotPartidaCotizacion', idCotPartidaCotizacion.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/vPartidaCotizacion`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<VPartidaCotizacion>;
      })
    );
  }
  /**
   * Obtener vPartidaCotizacion
   * @param idCotPartidaCotizacion undefined
   * @return OK
   */
  vPartidaCotizacionObtener(idCotPartidaCotizacion: string): __Observable<VPartidaCotizacion> {
    return this.vPartidaCotizacionObtenerResponse(idCotPartidaCotizacion).pipe(
      __map(_r => _r.body as VPartidaCotizacion)
    );
  }

  /**
   * QueryResult vPartidaCotizacion
   * @param info undefined
   * @return OK
   */
  vPartidaCotizacionQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultVPartidaCotizacion>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/vPartidaCotizacion`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultVPartidaCotizacion>;
      })
    );
  }
  /**
   * QueryResult vPartidaCotizacion
   * @param info undefined
   * @return OK
   */
  vPartidaCotizacionQueryResult(info: QueryInfo): __Observable<QueryResultVPartidaCotizacion> {
    return this.vPartidaCotizacionQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultVPartidaCotizacion)
    );
  }
}

module ProcesosL01CotizacionPartidasService {
}

export { ProcesosL01CotizacionPartidasService }
