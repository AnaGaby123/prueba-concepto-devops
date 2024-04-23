/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiLogisticaConfiguration as __Configuration } from '../api-logistica-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { AjOfCondicionesdePagoCotizacion } from '../models/aj-of-condicionesde-pago-cotizacion';
import { QueryResultAjOfCondicionesdePagoCotizacion } from '../models/query-result-aj-of-condicionesde-pago-cotizacion';
import { QueryInfo } from '../models/query-info';
import { GMEstrategia } from '../models/gmestrategia';
import { AjOfEstrategiaCotizacion } from '../models/aj-of-estrategia-cotizacion';
import { QueryResultAjOfEstrategiaCotizacion } from '../models/query-result-aj-of-estrategia-cotizacion';
import { AjOfEstrategiaCotizacionTactica } from '../models/aj-of-estrategia-cotizacion-tactica';
import { QueryResultAjOfEstrategiaCotizacionTactica } from '../models/query-result-aj-of-estrategia-cotizacion-tactica';
import { CotPartidaCotizacion } from '../models/cot-partida-cotizacion';
import { AjOfFleteExpressCotizacion } from '../models/aj-of-flete-express-cotizacion';
import { QueryResultAjOfFleteExpressCotizacion } from '../models/query-result-aj-of-flete-express-cotizacion';
import { AjOfPrecioCotizacion } from '../models/aj-of-precio-cotizacion';
import { QueryResultAjOfPrecioCotizacion } from '../models/query-result-aj-of-precio-cotizacion';
import { AjOfRazonRechazo } from '../models/aj-of-razon-rechazo';
import { QueryResultAjOfRazonRechazo } from '../models/query-result-aj-of-razon-rechazo';
import { AjOfRechazo } from '../models/aj-of-rechazo';
import { QueryResultAjOfRechazo } from '../models/query-result-aj-of-rechazo';
import { AjOfValorConfiguracionTiempoEntregaCotizacion } from '../models/aj-of-valor-configuracion-tiempo-entrega-cotizacion';
import { QueryResultAjOfValorConfiguracionTiempoEntregaCotizacion } from '../models/query-result-aj-of-valor-configuracion-tiempo-entrega-cotizacion';
import { QueryResultCotCotizacionAjusteOfertaObj } from '../models/query-result-cot-cotizacion-ajuste-oferta-obj';
import { DashboardData } from '../models/dashboard-data';
import { ResumeGroupQueryInfo } from '../models/resume-group-query-info';
import { AttributeDashboard } from '../models/attribute-dashboard';
import { GMRechazoAjusteOferta } from '../models/gmrechazo-ajuste-oferta';
import { AjusteFleteExpressPartidaObj } from '../models/ajuste-flete-express-partida-obj';
import { AjusteMenosDosDiasPartidaObj } from '../models/ajuste-menos-dos-dias-partida-obj';
import { AjustePrecioPartidaObj } from '../models/ajuste-precio-partida-obj';
import { QueryResultVClienteCotizacionAjusteOferta } from '../models/query-result-vcliente-cotizacion-ajuste-oferta';
import { TotalClientesCotizacionesObj } from '../models/total-clientes-cotizaciones-obj';
import { FilterTuple } from '../models/filter-tuple';
import { QueryResultVClienteEVIajusteOfertaLista } from '../models/query-result-vcliente-eviajuste-oferta-lista';
import { QueryResultVCotizacionesCarruselAjusteOferta } from '../models/query-result-vcotizaciones-carrusel-ajuste-oferta';
import { TotalPartidasPorTipoObj } from '../models/total-partidas-por-tipo-obj';
import { BarraTipoPartidaCerrarOfertaObj } from '../models/barra-tipo-partida-cerrar-oferta-obj';
import { QueryResultVEVIcotizacionesAjusteOferta } from '../models/query-result-vevicotizaciones-ajuste-oferta';
import { QueryResultVMarcaPartidaAjusteOferta } from '../models/query-result-vmarca-partida-ajuste-oferta';
import { TotalMarcasPartidasObj } from '../models/total-marcas-partidas-obj';
import { TotalClientesPorTipoAjusteDeOfertaObj } from '../models/total-clientes-por-tipo-ajuste-de-oferta-obj';
import { TotalAjustesPorTipoObj } from '../models/total-ajustes-por-tipo-obj';
@Injectable({
  providedIn: 'root',
})
class ProcesosL02AjustarOfertaService extends __BaseService {
  static readonly ajOfCondicionesDePagoCotizacionObtenerPath = '/ajOfCondicionesDePagoCotizacion';
  static readonly ajOfCondicionesDePagoCotizacionGuardarOActualizarPath = '/ajOfCondicionesDePagoCotizacion';
  static readonly ajOfCondicionesDePagoCotizacionQueryResultPath = '/ajOfCondicionesDePagoCotizacion';
  static readonly ajOfCondicionesDePagoCotizacionDesactivarPath = '/ajOfCondicionesDePagoCotizacion';
  static readonly ajOfEstrategiaCotizacionEstrategiaDetallePath = '/ajOfEstrategiaCotizacion/ObtenerEstrategia';
  static readonly ajOfEstrategiaCotizacionObtenerPath = '/ajOfEstrategiaCotizacion';
  static readonly ajOfEstrategiaCotizacionGuardarOActualizarPath = '/ajOfEstrategiaCotizacion';
  static readonly ajOfEstrategiaCotizacionQueryResultPath = '/ajOfEstrategiaCotizacion';
  static readonly ajOfEstrategiaCotizacionDesactivarPath = '/ajOfEstrategiaCotizacion';
  static readonly ajOfEstrategiaCotizacionTacticaObtenerPath = '/ajOfEstrategiaCotizacionTactica';
  static readonly ajOfEstrategiaCotizacionTacticaGuardarOActualizarPath = '/ajOfEstrategiaCotizacionTactica';
  static readonly ajOfEstrategiaCotizacionTacticaQueryResultPath = '/ajOfEstrategiaCotizacionTactica';
  static readonly ajOfEstrategiaCotizacionTacticaDesactivarPath = '/ajOfEstrategiaCotizacionTactica';
  static readonly ajOfFleteExpressCotizacionDesactivarVariosPath = '/DesactivarajOfFleteExpressCotizacionMultiple';
  static readonly ajOfFleteExpressCotizacionObtenerPath = '/ajOfFleteExpressCotizacion';
  static readonly ajOfFleteExpressCotizacionGuardarOActualizarPath = '/ajOfFleteExpressCotizacion';
  static readonly ajOfFleteExpressCotizacionQueryResultPath = '/ajOfFleteExpressCotizacion';
  static readonly ajOfPrecioCotizacionObtenerPath = '/ajOfPrecioCotizacion';
  static readonly ajOfPrecioCotizacionGuardarOActualizarPath = '/ajOfPrecioCotizacion';
  static readonly ajOfPrecioCotizacionQueryResultPath = '/ajOfPrecioCotizacion';
  static readonly ajOfPrecioCotizacionDesactivarPath = '/ajOfPrecioCotizacion';
  static readonly ajOfRazonRechazoObtenerPath = '/ajOfRazonRechazo';
  static readonly ajOfRazonRechazoGuardarOActualizarPath = '/ajOfRazonRechazo';
  static readonly ajOfRazonRechazoQueryResultPath = '/ajOfRazonRechazo';
  static readonly ajOfRazonRechazoDesactivarPath = '/ajOfRazonRechazo';
  static readonly ajOfRechazoObtenerPath = '/ajOfRechazo';
  static readonly ajOfRechazoGuardarOActualizarPath = '/ajOfRechazo';
  static readonly ajOfRechazoQueryResultPath = '/ajOfRechazo';
  static readonly ajOfRechazoDesactivarPath = '/ajOfRechazo';
  static readonly ajOfValorConfiguracionTiempoEntregaCotizacionObtenerPath = '/ajOfValorConfiguracionTiempoEntregaCotizacion';
  static readonly ajOfValorConfiguracionTiempoEntregaCotizacionGuardarOActualizarPath = '/ajOfValorConfiguracionTiempoEntregaCotizacion';
  static readonly ajOfValorConfiguracionTiempoEntregaCotizacionQueryResultPath = '/ajOfValorConfiguracionTiempoEntregaCotizacion';
  static readonly ajOfValorConfiguracionTiempoEntregaCotizacionDesactivarPath = '/ajOfValorConfiguracionTiempoEntregaCotizacion';
  static readonly AjustarOfertaListadoPartidasPath = '/AjustarOferta/Lista';
  static readonly AjustarOfertaObtenerAjustarOfertaDashboardPath = '/AjustarOferta/dashboard';
  static readonly AjustarOfertaObtenerTabsAjustarOfertaDashboardPath = '/AjustarOferta/tabs';
  static readonly AjustarOfertaRechazarAjusteOfertaPath = '/AjustarOferta/RechazarAjusteOferta';
  static readonly AjustarOfertaMostrarAjustesSolicitadosObtenerAjusteCondicionesDePagoPath = '/ObtenerAjusteajOfCondicionesDePagoCotizacion';
  static readonly AjustarOfertaMostrarAjustesSolicitadosObtenerAjusteFleteExpressPath = '/ObtenerAjusteajOfFleteEpress';
  static readonly AjustarOfertaMostrarAjustesSolicitadosObtenerAjusteMenosDosDiasPath = '/ObtenerAjusteajOfMenosDosDias';
  static readonly AjustarOfertaMostrarAjustesSolicitadosObtenerAjustePrecioPath = '/ObtenerAjusteajOfPrecio';
  static readonly vClienteCotizacionAjusteOfertaQueryResultPath = '/vClienteCotizacionAjusteOferta';
  static readonly vClienteCotizacionAjusteOfertaVClienteCotizacionAjusteOfertaTotalesPath = '/vClienteCotizacionAjusteOfertaTotales';
  static readonly vClienteEVIajusteOfertaListaQueryResultPath = '/vClienteEVIajusteOfertaLista';
  static readonly vCotizacionesCarruselAjusteOfertaQueryResultPath = '/vCotizacionesCarruselAjusteOferta';
  static readonly vCotizacionTipoPartidaAjusteOfertaVCotizacionTipoPartidaAjusteOfertaTotalesPath = '/vCotizacionTipoPartidaAjusteOfertaTotales';
  static readonly vcotPartidaTipoCerrarOfertaVcotPartidaTipoCerrarOfertaBarraPath = '/vcotPartidaTipoCerrarOfertaBarra';
  static readonly vEVIcotizacionesAjusteOfertaQueryResultPath = '/vEVIcotizacionesAjusteOferta';
  static readonly vEVIcotizacionesAjusteOfertaVEVIcotizacionesAjusteOfertaTotalesPath = '/vEVIcotizacionesAjusteOfertaTotales';
  static readonly vMarcaPartidaAjusteOfertaQueryResultPath = '/vMarcaPartidaAjusteOferta';
  static readonly vMarcaPartidaAjusteOfertaVMarcaPartidaAjusteOfertaTotalesPath = '/vMarcaPartidaAjusteOfertaTotales';
  static readonly vTotalPorTipoAjusteDeOfertaVTotalClientesPorTipoAjusteDeOfertaPath = '/vTotalClientesPorTipoAjusteDeOferta';
  static readonly vTotalPorTipoAjusteDeOfertaVTotalPorTipoAjusteDeOfertaGraficaPath = '/vTotalPorTipoAjusteDeOfertaGrafica';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Obtener ajOfCondicionesDePagoCotizacion
   * @param idajOfCondicionesDePagoCotizacion undefined
   * @return OK
   */
  ajOfCondicionesDePagoCotizacionObtenerResponse(idajOfCondicionesDePagoCotizacion: string): __Observable<__StrictHttpResponse<AjOfCondicionesdePagoCotizacion>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idajOfCondicionesDePagoCotizacion != null) __params = __params.set('idajOfCondicionesDePagoCotizacion', idajOfCondicionesDePagoCotizacion.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/ajOfCondicionesDePagoCotizacion`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<AjOfCondicionesdePagoCotizacion>;
      })
    );
  }
  /**
   * Obtener ajOfCondicionesDePagoCotizacion
   * @param idajOfCondicionesDePagoCotizacion undefined
   * @return OK
   */
  ajOfCondicionesDePagoCotizacionObtener(idajOfCondicionesDePagoCotizacion: string): __Observable<AjOfCondicionesdePagoCotizacion> {
    return this.ajOfCondicionesDePagoCotizacionObtenerResponse(idajOfCondicionesDePagoCotizacion).pipe(
      __map(_r => _r.body as AjOfCondicionesdePagoCotizacion)
    );
  }

  /**
   * GuardarOActualizar ajOfCondicionesDePagoCotizacion
   * @param ajOfCondicionesDePagoCotizacion undefined
   * @return OK
   */
  ajOfCondicionesDePagoCotizacionGuardarOActualizarResponse(ajOfCondicionesDePagoCotizacion: AjOfCondicionesdePagoCotizacion): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = ajOfCondicionesDePagoCotizacion;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/ajOfCondicionesDePagoCotizacion`,
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
   * GuardarOActualizar ajOfCondicionesDePagoCotizacion
   * @param ajOfCondicionesDePagoCotizacion undefined
   * @return OK
   */
  ajOfCondicionesDePagoCotizacionGuardarOActualizar(ajOfCondicionesDePagoCotizacion: AjOfCondicionesdePagoCotizacion): __Observable<string> {
    return this.ajOfCondicionesDePagoCotizacionGuardarOActualizarResponse(ajOfCondicionesDePagoCotizacion).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * QueryResult ajOfCondicionesDePagoCotizacion
   * @param info undefined
   * @return OK
   */
  ajOfCondicionesDePagoCotizacionQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultAjOfCondicionesdePagoCotizacion>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/ajOfCondicionesDePagoCotizacion`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultAjOfCondicionesdePagoCotizacion>;
      })
    );
  }
  /**
   * QueryResult ajOfCondicionesDePagoCotizacion
   * @param info undefined
   * @return OK
   */
  ajOfCondicionesDePagoCotizacionQueryResult(info: QueryInfo): __Observable<QueryResultAjOfCondicionesdePagoCotizacion> {
    return this.ajOfCondicionesDePagoCotizacionQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultAjOfCondicionesdePagoCotizacion)
    );
  }

  /**
   * Desactivar ajOfCondicionesDePagoCotizacion
   * @param idajOfCondicionesDePagoCotizacion undefined
   * @return OK
   */
  ajOfCondicionesDePagoCotizacionDesactivarResponse(idajOfCondicionesDePagoCotizacion: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idajOfCondicionesDePagoCotizacion != null) __params = __params.set('idajOfCondicionesDePagoCotizacion', idajOfCondicionesDePagoCotizacion.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/ajOfCondicionesDePagoCotizacion`,
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
   * Desactivar ajOfCondicionesDePagoCotizacion
   * @param idajOfCondicionesDePagoCotizacion undefined
   * @return OK
   */
  ajOfCondicionesDePagoCotizacionDesactivar(idajOfCondicionesDePagoCotizacion: string): __Observable<string> {
    return this.ajOfCondicionesDePagoCotizacionDesactivarResponse(idajOfCondicionesDePagoCotizacion).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * EstrategiaDetalle ajOfEstrategiaCotizacion
   * @param idajOfEstrategiaCotizacion undefined
   * @return OK
   */
  ajOfEstrategiaCotizacionEstrategiaDetalleResponse(idajOfEstrategiaCotizacion: string): __Observable<__StrictHttpResponse<GMEstrategia>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idajOfEstrategiaCotizacion != null) __params = __params.set('idajOfEstrategiaCotizacion', idajOfEstrategiaCotizacion.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/ajOfEstrategiaCotizacion/ObtenerEstrategia`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<GMEstrategia>;
      })
    );
  }
  /**
   * EstrategiaDetalle ajOfEstrategiaCotizacion
   * @param idajOfEstrategiaCotizacion undefined
   * @return OK
   */
  ajOfEstrategiaCotizacionEstrategiaDetalle(idajOfEstrategiaCotizacion: string): __Observable<GMEstrategia> {
    return this.ajOfEstrategiaCotizacionEstrategiaDetalleResponse(idajOfEstrategiaCotizacion).pipe(
      __map(_r => _r.body as GMEstrategia)
    );
  }

  /**
   * Obtener ajOfEstrategiaCotizacion
   * @param idajOfEstrategiaCotizacion undefined
   * @return OK
   */
  ajOfEstrategiaCotizacionObtenerResponse(idajOfEstrategiaCotizacion: string): __Observable<__StrictHttpResponse<AjOfEstrategiaCotizacion>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idajOfEstrategiaCotizacion != null) __params = __params.set('idajOfEstrategiaCotizacion', idajOfEstrategiaCotizacion.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/ajOfEstrategiaCotizacion`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<AjOfEstrategiaCotizacion>;
      })
    );
  }
  /**
   * Obtener ajOfEstrategiaCotizacion
   * @param idajOfEstrategiaCotizacion undefined
   * @return OK
   */
  ajOfEstrategiaCotizacionObtener(idajOfEstrategiaCotizacion: string): __Observable<AjOfEstrategiaCotizacion> {
    return this.ajOfEstrategiaCotizacionObtenerResponse(idajOfEstrategiaCotizacion).pipe(
      __map(_r => _r.body as AjOfEstrategiaCotizacion)
    );
  }

  /**
   * GuardarOActualizar ajOfEstrategiaCotizacion
   * @param ajOfEstrategiaCotizacion undefined
   * @return OK
   */
  ajOfEstrategiaCotizacionGuardarOActualizarResponse(ajOfEstrategiaCotizacion: AjOfEstrategiaCotizacion): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = ajOfEstrategiaCotizacion;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/ajOfEstrategiaCotizacion`,
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
   * GuardarOActualizar ajOfEstrategiaCotizacion
   * @param ajOfEstrategiaCotizacion undefined
   * @return OK
   */
  ajOfEstrategiaCotizacionGuardarOActualizar(ajOfEstrategiaCotizacion: AjOfEstrategiaCotizacion): __Observable<string> {
    return this.ajOfEstrategiaCotizacionGuardarOActualizarResponse(ajOfEstrategiaCotizacion).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * QueryResult ajOfEstrategiaCotizacion
   * @param info undefined
   * @return OK
   */
  ajOfEstrategiaCotizacionQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultAjOfEstrategiaCotizacion>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/ajOfEstrategiaCotizacion`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultAjOfEstrategiaCotizacion>;
      })
    );
  }
  /**
   * QueryResult ajOfEstrategiaCotizacion
   * @param info undefined
   * @return OK
   */
  ajOfEstrategiaCotizacionQueryResult(info: QueryInfo): __Observable<QueryResultAjOfEstrategiaCotizacion> {
    return this.ajOfEstrategiaCotizacionQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultAjOfEstrategiaCotizacion)
    );
  }

  /**
   * Desactivar ajOfEstrategiaCotizacion
   * @param idajOfEstrategiaCotizacion undefined
   * @return OK
   */
  ajOfEstrategiaCotizacionDesactivarResponse(idajOfEstrategiaCotizacion: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idajOfEstrategiaCotizacion != null) __params = __params.set('idajOfEstrategiaCotizacion', idajOfEstrategiaCotizacion.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/ajOfEstrategiaCotizacion`,
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
   * Desactivar ajOfEstrategiaCotizacion
   * @param idajOfEstrategiaCotizacion undefined
   * @return OK
   */
  ajOfEstrategiaCotizacionDesactivar(idajOfEstrategiaCotizacion: string): __Observable<string> {
    return this.ajOfEstrategiaCotizacionDesactivarResponse(idajOfEstrategiaCotizacion).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Obtener ajOfEstrategiaCotizacionTactica
   * @param idajOfEstrategiaCotizacionTactica undefined
   * @return OK
   */
  ajOfEstrategiaCotizacionTacticaObtenerResponse(idajOfEstrategiaCotizacionTactica: string): __Observable<__StrictHttpResponse<AjOfEstrategiaCotizacionTactica>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idajOfEstrategiaCotizacionTactica != null) __params = __params.set('idajOfEstrategiaCotizacionTactica', idajOfEstrategiaCotizacionTactica.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/ajOfEstrategiaCotizacionTactica`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<AjOfEstrategiaCotizacionTactica>;
      })
    );
  }
  /**
   * Obtener ajOfEstrategiaCotizacionTactica
   * @param idajOfEstrategiaCotizacionTactica undefined
   * @return OK
   */
  ajOfEstrategiaCotizacionTacticaObtener(idajOfEstrategiaCotizacionTactica: string): __Observable<AjOfEstrategiaCotizacionTactica> {
    return this.ajOfEstrategiaCotizacionTacticaObtenerResponse(idajOfEstrategiaCotizacionTactica).pipe(
      __map(_r => _r.body as AjOfEstrategiaCotizacionTactica)
    );
  }

  /**
   * GuardarOActualizar ajOfEstrategiaCotizacionTactica
   * @param ajOfEstrategiaCotizacionTactica undefined
   * @return OK
   */
  ajOfEstrategiaCotizacionTacticaGuardarOActualizarResponse(ajOfEstrategiaCotizacionTactica: AjOfEstrategiaCotizacionTactica): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = ajOfEstrategiaCotizacionTactica;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/ajOfEstrategiaCotizacionTactica`,
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
   * GuardarOActualizar ajOfEstrategiaCotizacionTactica
   * @param ajOfEstrategiaCotizacionTactica undefined
   * @return OK
   */
  ajOfEstrategiaCotizacionTacticaGuardarOActualizar(ajOfEstrategiaCotizacionTactica: AjOfEstrategiaCotizacionTactica): __Observable<string> {
    return this.ajOfEstrategiaCotizacionTacticaGuardarOActualizarResponse(ajOfEstrategiaCotizacionTactica).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * QueryResult ajOfEstrategiaCotizacionTactica
   * @param info undefined
   * @return OK
   */
  ajOfEstrategiaCotizacionTacticaQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultAjOfEstrategiaCotizacionTactica>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/ajOfEstrategiaCotizacionTactica`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultAjOfEstrategiaCotizacionTactica>;
      })
    );
  }
  /**
   * QueryResult ajOfEstrategiaCotizacionTactica
   * @param info undefined
   * @return OK
   */
  ajOfEstrategiaCotizacionTacticaQueryResult(info: QueryInfo): __Observable<QueryResultAjOfEstrategiaCotizacionTactica> {
    return this.ajOfEstrategiaCotizacionTacticaQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultAjOfEstrategiaCotizacionTactica)
    );
  }

  /**
   * Desactivar ajOfEstrategiaCotizacionTactica
   * @param idajOfEstrategiaCotizacionTactica undefined
   * @return OK
   */
  ajOfEstrategiaCotizacionTacticaDesactivarResponse(idajOfEstrategiaCotizacionTactica: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idajOfEstrategiaCotizacionTactica != null) __params = __params.set('idajOfEstrategiaCotizacionTactica', idajOfEstrategiaCotizacionTactica.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/ajOfEstrategiaCotizacionTactica`,
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
   * Desactivar ajOfEstrategiaCotizacionTactica
   * @param idajOfEstrategiaCotizacionTactica undefined
   * @return OK
   */
  ajOfEstrategiaCotizacionTacticaDesactivar(idajOfEstrategiaCotizacionTactica: string): __Observable<string> {
    return this.ajOfEstrategiaCotizacionTacticaDesactivarResponse(idajOfEstrategiaCotizacionTactica).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * DesactivarVarios ajOfFleteExpressCotizacion
   * @param idCotCotizacion undefined
   * @return OK
   */
  ajOfFleteExpressCotizacionDesactivarVariosResponse(idCotCotizacion: string): __Observable<__StrictHttpResponse<Array<CotPartidaCotizacion>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idCotCotizacion != null) __params = __params.set('idCotCotizacion', idCotCotizacion.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/DesactivarajOfFleteExpressCotizacionMultiple`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<CotPartidaCotizacion>>;
      })
    );
  }
  /**
   * DesactivarVarios ajOfFleteExpressCotizacion
   * @param idCotCotizacion undefined
   * @return OK
   */
  ajOfFleteExpressCotizacionDesactivarVarios(idCotCotizacion: string): __Observable<Array<CotPartidaCotizacion>> {
    return this.ajOfFleteExpressCotizacionDesactivarVariosResponse(idCotCotizacion).pipe(
      __map(_r => _r.body as Array<CotPartidaCotizacion>)
    );
  }

  /**
   * Obtener ajOfFleteExpressCotizacion
   * @param idAjOfFleteExpressCotizacion undefined
   * @return OK
   */
  ajOfFleteExpressCotizacionObtenerResponse(idAjOfFleteExpressCotizacion: string): __Observable<__StrictHttpResponse<AjOfFleteExpressCotizacion>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idAjOfFleteExpressCotizacion != null) __params = __params.set('idAjOfFleteExpressCotizacion', idAjOfFleteExpressCotizacion.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/ajOfFleteExpressCotizacion`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<AjOfFleteExpressCotizacion>;
      })
    );
  }
  /**
   * Obtener ajOfFleteExpressCotizacion
   * @param idAjOfFleteExpressCotizacion undefined
   * @return OK
   */
  ajOfFleteExpressCotizacionObtener(idAjOfFleteExpressCotizacion: string): __Observable<AjOfFleteExpressCotizacion> {
    return this.ajOfFleteExpressCotizacionObtenerResponse(idAjOfFleteExpressCotizacion).pipe(
      __map(_r => _r.body as AjOfFleteExpressCotizacion)
    );
  }

  /**
   * GuardarOActualizar ajOfFleteExpressCotizacion
   * @param ajOfFleteExpressCotizacion undefined
   * @return OK
   */
  ajOfFleteExpressCotizacionGuardarOActualizarResponse(ajOfFleteExpressCotizacion: AjOfFleteExpressCotizacion): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = ajOfFleteExpressCotizacion;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/ajOfFleteExpressCotizacion`,
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
   * GuardarOActualizar ajOfFleteExpressCotizacion
   * @param ajOfFleteExpressCotizacion undefined
   * @return OK
   */
  ajOfFleteExpressCotizacionGuardarOActualizar(ajOfFleteExpressCotizacion: AjOfFleteExpressCotizacion): __Observable<string> {
    return this.ajOfFleteExpressCotizacionGuardarOActualizarResponse(ajOfFleteExpressCotizacion).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * QueryResult ajOfFleteExpressCotizacion
   * @param info undefined
   * @return OK
   */
  ajOfFleteExpressCotizacionQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultAjOfFleteExpressCotizacion>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/ajOfFleteExpressCotizacion`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultAjOfFleteExpressCotizacion>;
      })
    );
  }
  /**
   * QueryResult ajOfFleteExpressCotizacion
   * @param info undefined
   * @return OK
   */
  ajOfFleteExpressCotizacionQueryResult(info: QueryInfo): __Observable<QueryResultAjOfFleteExpressCotizacion> {
    return this.ajOfFleteExpressCotizacionQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultAjOfFleteExpressCotizacion)
    );
  }

  /**
   * Obtener ajOfPrecioCotizacion
   * @param idajOfPrecioCotizacion undefined
   * @return OK
   */
  ajOfPrecioCotizacionObtenerResponse(idajOfPrecioCotizacion: string): __Observable<__StrictHttpResponse<AjOfPrecioCotizacion>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idajOfPrecioCotizacion != null) __params = __params.set('idajOfPrecioCotizacion', idajOfPrecioCotizacion.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/ajOfPrecioCotizacion`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<AjOfPrecioCotizacion>;
      })
    );
  }
  /**
   * Obtener ajOfPrecioCotizacion
   * @param idajOfPrecioCotizacion undefined
   * @return OK
   */
  ajOfPrecioCotizacionObtener(idajOfPrecioCotizacion: string): __Observable<AjOfPrecioCotizacion> {
    return this.ajOfPrecioCotizacionObtenerResponse(idajOfPrecioCotizacion).pipe(
      __map(_r => _r.body as AjOfPrecioCotizacion)
    );
  }

  /**
   * GuardarOActualizar ajOfPrecioCotizacion
   * @param ajOfPrecioCotizacion undefined
   * @return OK
   */
  ajOfPrecioCotizacionGuardarOActualizarResponse(ajOfPrecioCotizacion: AjOfPrecioCotizacion): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = ajOfPrecioCotizacion;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/ajOfPrecioCotizacion`,
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
   * GuardarOActualizar ajOfPrecioCotizacion
   * @param ajOfPrecioCotizacion undefined
   * @return OK
   */
  ajOfPrecioCotizacionGuardarOActualizar(ajOfPrecioCotizacion: AjOfPrecioCotizacion): __Observable<string> {
    return this.ajOfPrecioCotizacionGuardarOActualizarResponse(ajOfPrecioCotizacion).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * QueryResult ajOfPrecioCotizacion
   * @param info undefined
   * @return OK
   */
  ajOfPrecioCotizacionQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultAjOfPrecioCotizacion>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/ajOfPrecioCotizacion`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultAjOfPrecioCotizacion>;
      })
    );
  }
  /**
   * QueryResult ajOfPrecioCotizacion
   * @param info undefined
   * @return OK
   */
  ajOfPrecioCotizacionQueryResult(info: QueryInfo): __Observable<QueryResultAjOfPrecioCotizacion> {
    return this.ajOfPrecioCotizacionQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultAjOfPrecioCotizacion)
    );
  }

  /**
   * Desactivar ajOfPrecioCotizacion
   * @param idajOfPrecioCotizacion undefined
   * @return OK
   */
  ajOfPrecioCotizacionDesactivarResponse(idajOfPrecioCotizacion: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idajOfPrecioCotizacion != null) __params = __params.set('idajOfPrecioCotizacion', idajOfPrecioCotizacion.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/ajOfPrecioCotizacion`,
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
   * Desactivar ajOfPrecioCotizacion
   * @param idajOfPrecioCotizacion undefined
   * @return OK
   */
  ajOfPrecioCotizacionDesactivar(idajOfPrecioCotizacion: string): __Observable<string> {
    return this.ajOfPrecioCotizacionDesactivarResponse(idajOfPrecioCotizacion).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar registro de ajOfRazonRechazo
   * @param idajOfRazonRechazo Identificador de ajOfRazonRechazo
   * @return OK
   */
  ajOfRazonRechazoObtenerResponse(idajOfRazonRechazo: string): __Observable<__StrictHttpResponse<AjOfRazonRechazo>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idajOfRazonRechazo != null) __params = __params.set('idajOfRazonRechazo', idajOfRazonRechazo.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/ajOfRazonRechazo`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<AjOfRazonRechazo>;
      })
    );
  }
  /**
   * Consultar registro de ajOfRazonRechazo
   * @param idajOfRazonRechazo Identificador de ajOfRazonRechazo
   * @return OK
   */
  ajOfRazonRechazoObtener(idajOfRazonRechazo: string): __Observable<AjOfRazonRechazo> {
    return this.ajOfRazonRechazoObtenerResponse(idajOfRazonRechazo).pipe(
      __map(_r => _r.body as AjOfRazonRechazo)
    );
  }

  /**
   * Guardar o actualizar ajOfRazonRechazo
   * @param ajOfRazonRechazo ajOfRazonRechazo
   * @return OK
   */
  ajOfRazonRechazoGuardarOActualizarResponse(ajOfRazonRechazo: AjOfRazonRechazo): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = ajOfRazonRechazo;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/ajOfRazonRechazo`,
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
   * Guardar o actualizar ajOfRazonRechazo
   * @param ajOfRazonRechazo ajOfRazonRechazo
   * @return OK
   */
  ajOfRazonRechazoGuardarOActualizar(ajOfRazonRechazo: AjOfRazonRechazo): __Observable<string> {
    return this.ajOfRazonRechazoGuardarOActualizarResponse(ajOfRazonRechazo).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de ajOfRazonRechazo
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  ajOfRazonRechazoQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultAjOfRazonRechazo>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/ajOfRazonRechazo`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultAjOfRazonRechazo>;
      })
    );
  }
  /**
   * Consultar lista paginada de ajOfRazonRechazo
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  ajOfRazonRechazoQueryResult(info: QueryInfo): __Observable<QueryResultAjOfRazonRechazo> {
    return this.ajOfRazonRechazoQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultAjOfRazonRechazo)
    );
  }

  /**
   * Desactivar registro de ajOfRazonRechazo
   * @param idajOfRazonRechazo Identificador de registro de ajOfRazonRechazo
   * @return OK
   */
  ajOfRazonRechazoDesactivarResponse(idajOfRazonRechazo: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idajOfRazonRechazo != null) __params = __params.set('idajOfRazonRechazo', idajOfRazonRechazo.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/ajOfRazonRechazo`,
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
   * Desactivar registro de ajOfRazonRechazo
   * @param idajOfRazonRechazo Identificador de registro de ajOfRazonRechazo
   * @return OK
   */
  ajOfRazonRechazoDesactivar(idajOfRazonRechazo: string): __Observable<string> {
    return this.ajOfRazonRechazoDesactivarResponse(idajOfRazonRechazo).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar registro de ajOfRechazo
   * @param idajOfRechazo Identificador de ajOfRechazo
   * @return OK
   */
  ajOfRechazoObtenerResponse(idajOfRechazo: string): __Observable<__StrictHttpResponse<AjOfRechazo>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idajOfRechazo != null) __params = __params.set('idajOfRechazo', idajOfRechazo.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/ajOfRechazo`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<AjOfRechazo>;
      })
    );
  }
  /**
   * Consultar registro de ajOfRechazo
   * @param idajOfRechazo Identificador de ajOfRechazo
   * @return OK
   */
  ajOfRechazoObtener(idajOfRechazo: string): __Observable<AjOfRechazo> {
    return this.ajOfRechazoObtenerResponse(idajOfRechazo).pipe(
      __map(_r => _r.body as AjOfRechazo)
    );
  }

  /**
   * Guardar o actualizar ajOfRechazo
   * @param ajOfRechazo ajOfRechazo
   * @return OK
   */
  ajOfRechazoGuardarOActualizarResponse(ajOfRechazo: AjOfRechazo): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = ajOfRechazo;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/ajOfRechazo`,
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
   * Guardar o actualizar ajOfRechazo
   * @param ajOfRechazo ajOfRechazo
   * @return OK
   */
  ajOfRechazoGuardarOActualizar(ajOfRechazo: AjOfRechazo): __Observable<string> {
    return this.ajOfRechazoGuardarOActualizarResponse(ajOfRechazo).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de ajOfRechazo
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  ajOfRechazoQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultAjOfRechazo>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/ajOfRechazo`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultAjOfRechazo>;
      })
    );
  }
  /**
   * Consultar lista paginada de ajOfRechazo
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  ajOfRechazoQueryResult(info: QueryInfo): __Observable<QueryResultAjOfRechazo> {
    return this.ajOfRechazoQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultAjOfRechazo)
    );
  }

  /**
   * Desactivar registro de ajOfRechazo
   * @param idajOfRechazo Identificador de registro de ajOfRechazo
   * @return OK
   */
  ajOfRechazoDesactivarResponse(idajOfRechazo: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idajOfRechazo != null) __params = __params.set('idajOfRechazo', idajOfRechazo.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/ajOfRechazo`,
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
   * Desactivar registro de ajOfRechazo
   * @param idajOfRechazo Identificador de registro de ajOfRechazo
   * @return OK
   */
  ajOfRechazoDesactivar(idajOfRechazo: string): __Observable<string> {
    return this.ajOfRechazoDesactivarResponse(idajOfRechazo).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Obtener ajOfValorConfiguracionTiempoEntregaCotizacion
   * @param idajOfValorConfiguracionTiempoEntregaCotizacion undefined
   * @return OK
   */
  ajOfValorConfiguracionTiempoEntregaCotizacionObtenerResponse(idajOfValorConfiguracionTiempoEntregaCotizacion: string): __Observable<__StrictHttpResponse<AjOfValorConfiguracionTiempoEntregaCotizacion>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idajOfValorConfiguracionTiempoEntregaCotizacion != null) __params = __params.set('idajOfValorConfiguracionTiempoEntregaCotizacion', idajOfValorConfiguracionTiempoEntregaCotizacion.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/ajOfValorConfiguracionTiempoEntregaCotizacion`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<AjOfValorConfiguracionTiempoEntregaCotizacion>;
      })
    );
  }
  /**
   * Obtener ajOfValorConfiguracionTiempoEntregaCotizacion
   * @param idajOfValorConfiguracionTiempoEntregaCotizacion undefined
   * @return OK
   */
  ajOfValorConfiguracionTiempoEntregaCotizacionObtener(idajOfValorConfiguracionTiempoEntregaCotizacion: string): __Observable<AjOfValorConfiguracionTiempoEntregaCotizacion> {
    return this.ajOfValorConfiguracionTiempoEntregaCotizacionObtenerResponse(idajOfValorConfiguracionTiempoEntregaCotizacion).pipe(
      __map(_r => _r.body as AjOfValorConfiguracionTiempoEntregaCotizacion)
    );
  }

  /**
   * GuardarOActualizar ajOfValorConfiguracionTiempoEntregaCotizacion
   * @param ajOfValorConfiguracionTiempoEntregaCotizacion undefined
   * @return OK
   */
  ajOfValorConfiguracionTiempoEntregaCotizacionGuardarOActualizarResponse(ajOfValorConfiguracionTiempoEntregaCotizacion: AjOfValorConfiguracionTiempoEntregaCotizacion): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = ajOfValorConfiguracionTiempoEntregaCotizacion;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/ajOfValorConfiguracionTiempoEntregaCotizacion`,
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
   * GuardarOActualizar ajOfValorConfiguracionTiempoEntregaCotizacion
   * @param ajOfValorConfiguracionTiempoEntregaCotizacion undefined
   * @return OK
   */
  ajOfValorConfiguracionTiempoEntregaCotizacionGuardarOActualizar(ajOfValorConfiguracionTiempoEntregaCotizacion: AjOfValorConfiguracionTiempoEntregaCotizacion): __Observable<string> {
    return this.ajOfValorConfiguracionTiempoEntregaCotizacionGuardarOActualizarResponse(ajOfValorConfiguracionTiempoEntregaCotizacion).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * QueryResult ajOfValorConfiguracionTiempoEntregaCotizacion
   * @param info undefined
   * @return OK
   */
  ajOfValorConfiguracionTiempoEntregaCotizacionQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultAjOfValorConfiguracionTiempoEntregaCotizacion>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/ajOfValorConfiguracionTiempoEntregaCotizacion`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultAjOfValorConfiguracionTiempoEntregaCotizacion>;
      })
    );
  }
  /**
   * QueryResult ajOfValorConfiguracionTiempoEntregaCotizacion
   * @param info undefined
   * @return OK
   */
  ajOfValorConfiguracionTiempoEntregaCotizacionQueryResult(info: QueryInfo): __Observable<QueryResultAjOfValorConfiguracionTiempoEntregaCotizacion> {
    return this.ajOfValorConfiguracionTiempoEntregaCotizacionQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultAjOfValorConfiguracionTiempoEntregaCotizacion)
    );
  }

  /**
   * Desactivar ajOfValorConfiguracionTiempoEntregaCotizacion
   * @param idajOfValorConfiguracionTiempoEntregaCotizacion undefined
   * @return OK
   */
  ajOfValorConfiguracionTiempoEntregaCotizacionDesactivarResponse(idajOfValorConfiguracionTiempoEntregaCotizacion: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idajOfValorConfiguracionTiempoEntregaCotizacion != null) __params = __params.set('idajOfValorConfiguracionTiempoEntregaCotizacion', idajOfValorConfiguracionTiempoEntregaCotizacion.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/ajOfValorConfiguracionTiempoEntregaCotizacion`,
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
   * Desactivar ajOfValorConfiguracionTiempoEntregaCotizacion
   * @param idajOfValorConfiguracionTiempoEntregaCotizacion undefined
   * @return OK
   */
  ajOfValorConfiguracionTiempoEntregaCotizacionDesactivar(idajOfValorConfiguracionTiempoEntregaCotizacion: string): __Observable<string> {
    return this.ajOfValorConfiguracionTiempoEntregaCotizacionDesactivarResponse(idajOfValorConfiguracionTiempoEntregaCotizacion).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * listadoPartidas AjustarOferta
   * @param info undefined
   * @return OK
   */
  AjustarOfertaListadoPartidasResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultCotCotizacionAjusteOfertaObj>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/AjustarOferta/Lista`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultCotCotizacionAjusteOfertaObj>;
      })
    );
  }
  /**
   * listadoPartidas AjustarOferta
   * @param info undefined
   * @return OK
   */
  AjustarOfertaListadoPartidas(info: QueryInfo): __Observable<QueryResultCotCotizacionAjusteOfertaObj> {
    return this.AjustarOfertaListadoPartidasResponse(info).pipe(
      __map(_r => _r.body as QueryResultCotCotizacionAjusteOfertaObj)
    );
  }

  /**
   * Servicio para obtener elementos del Dashboard
   * @param info Filtros y ordenamientos
   * @return OK
   */
  AjustarOfertaObtenerAjustarOfertaDashboardResponse(info: ResumeGroupQueryInfo): __Observable<__StrictHttpResponse<DashboardData>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/AjustarOferta/dashboard`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<DashboardData>;
      })
    );
  }
  /**
   * Servicio para obtener elementos del Dashboard
   * @param info Filtros y ordenamientos
   * @return OK
   */
  AjustarOfertaObtenerAjustarOfertaDashboard(info: ResumeGroupQueryInfo): __Observable<DashboardData> {
    return this.AjustarOfertaObtenerAjustarOfertaDashboardResponse(info).pipe(
      __map(_r => _r.body as DashboardData)
    );
  }

  /**
   * Servicio para obtener los elementos de las tabs.
   * @param info Filtros y ordenamientos
   * @return OK
   */
  AjustarOfertaObtenerTabsAjustarOfertaDashboardResponse(info: ResumeGroupQueryInfo): __Observable<__StrictHttpResponse<Array<AttributeDashboard>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/AjustarOferta/tabs`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<AttributeDashboard>>;
      })
    );
  }
  /**
   * Servicio para obtener los elementos de las tabs.
   * @param info Filtros y ordenamientos
   * @return OK
   */
  AjustarOfertaObtenerTabsAjustarOfertaDashboard(info: ResumeGroupQueryInfo): __Observable<Array<AttributeDashboard>> {
    return this.AjustarOfertaObtenerTabsAjustarOfertaDashboardResponse(info).pipe(
      __map(_r => _r.body as Array<AttributeDashboard>)
    );
  }

  /**
   * RechazarAjusteOferta AjustarOferta
   * @param rechazo undefined
   * @return OK
   */
  AjustarOfertaRechazarAjusteOfertaResponse(rechazo: GMRechazoAjusteOferta): __Observable<__StrictHttpResponse<GMRechazoAjusteOferta>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = rechazo;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/AjustarOferta/RechazarAjusteOferta`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<GMRechazoAjusteOferta>;
      })
    );
  }
  /**
   * RechazarAjusteOferta AjustarOferta
   * @param rechazo undefined
   * @return OK
   */
  AjustarOfertaRechazarAjusteOferta(rechazo: GMRechazoAjusteOferta): __Observable<GMRechazoAjusteOferta> {
    return this.AjustarOfertaRechazarAjusteOfertaResponse(rechazo).pipe(
      __map(_r => _r.body as GMRechazoAjusteOferta)
    );
  }

  /**
   * ObtenerAjusteCondicionesDePago AjustarOfertaMostrarAjustesSolicitados
   * @param idCotCotizacion undefined
   * @return OK
   */
  AjustarOfertaMostrarAjustesSolicitadosObtenerAjusteCondicionesDePagoResponse(idCotCotizacion: string): __Observable<__StrictHttpResponse<AjOfCondicionesdePagoCotizacion>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idCotCotizacion != null) __params = __params.set('idCotCotizacion', idCotCotizacion.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/ObtenerAjusteajOfCondicionesDePagoCotizacion`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<AjOfCondicionesdePagoCotizacion>;
      })
    );
  }
  /**
   * ObtenerAjusteCondicionesDePago AjustarOfertaMostrarAjustesSolicitados
   * @param idCotCotizacion undefined
   * @return OK
   */
  AjustarOfertaMostrarAjustesSolicitadosObtenerAjusteCondicionesDePago(idCotCotizacion: string): __Observable<AjOfCondicionesdePagoCotizacion> {
    return this.AjustarOfertaMostrarAjustesSolicitadosObtenerAjusteCondicionesDePagoResponse(idCotCotizacion).pipe(
      __map(_r => _r.body as AjOfCondicionesdePagoCotizacion)
    );
  }

  /**
   * ObtenerAjusteFleteExpress AjustarOfertaMostrarAjustesSolicitados
   * @param idCotCotizacion undefined
   * @return OK
   */
  AjustarOfertaMostrarAjustesSolicitadosObtenerAjusteFleteExpressResponse(idCotCotizacion: string): __Observable<__StrictHttpResponse<Array<AjusteFleteExpressPartidaObj>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idCotCotizacion != null) __params = __params.set('idCotCotizacion', idCotCotizacion.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/ObtenerAjusteajOfFleteEpress`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<AjusteFleteExpressPartidaObj>>;
      })
    );
  }
  /**
   * ObtenerAjusteFleteExpress AjustarOfertaMostrarAjustesSolicitados
   * @param idCotCotizacion undefined
   * @return OK
   */
  AjustarOfertaMostrarAjustesSolicitadosObtenerAjusteFleteExpress(idCotCotizacion: string): __Observable<Array<AjusteFleteExpressPartidaObj>> {
    return this.AjustarOfertaMostrarAjustesSolicitadosObtenerAjusteFleteExpressResponse(idCotCotizacion).pipe(
      __map(_r => _r.body as Array<AjusteFleteExpressPartidaObj>)
    );
  }

  /**
   * ObtenerAjusteMenosDosDias AjustarOfertaMostrarAjustesSolicitados
   * @param info undefined
   * @return OK
   */
  AjustarOfertaMostrarAjustesSolicitadosObtenerAjusteMenosDosDiasResponse(info: QueryInfo): __Observable<__StrictHttpResponse<Array<AjusteMenosDosDiasPartidaObj>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/ObtenerAjusteajOfMenosDosDias`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<AjusteMenosDosDiasPartidaObj>>;
      })
    );
  }
  /**
   * ObtenerAjusteMenosDosDias AjustarOfertaMostrarAjustesSolicitados
   * @param info undefined
   * @return OK
   */
  AjustarOfertaMostrarAjustesSolicitadosObtenerAjusteMenosDosDias(info: QueryInfo): __Observable<Array<AjusteMenosDosDiasPartidaObj>> {
    return this.AjustarOfertaMostrarAjustesSolicitadosObtenerAjusteMenosDosDiasResponse(info).pipe(
      __map(_r => _r.body as Array<AjusteMenosDosDiasPartidaObj>)
    );
  }

  /**
   * ObtenerAjustePrecio AjustarOfertaMostrarAjustesSolicitados
   * @param info undefined
   * @return OK
   */
  AjustarOfertaMostrarAjustesSolicitadosObtenerAjustePrecioResponse(info: QueryInfo): __Observable<__StrictHttpResponse<Array<AjustePrecioPartidaObj>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/ObtenerAjusteajOfPrecio`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<AjustePrecioPartidaObj>>;
      })
    );
  }
  /**
   * ObtenerAjustePrecio AjustarOfertaMostrarAjustesSolicitados
   * @param info undefined
   * @return OK
   */
  AjustarOfertaMostrarAjustesSolicitadosObtenerAjustePrecio(info: QueryInfo): __Observable<Array<AjustePrecioPartidaObj>> {
    return this.AjustarOfertaMostrarAjustesSolicitadosObtenerAjustePrecioResponse(info).pipe(
      __map(_r => _r.body as Array<AjustePrecioPartidaObj>)
    );
  }

  /**
   * QueryResult vClienteCotizacionAjusteOferta
   * @param info undefined
   * @return OK
   */
  vClienteCotizacionAjusteOfertaQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultVClienteCotizacionAjusteOferta>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/vClienteCotizacionAjusteOferta`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultVClienteCotizacionAjusteOferta>;
      })
    );
  }
  /**
   * QueryResult vClienteCotizacionAjusteOferta
   * @param info undefined
   * @return OK
   */
  vClienteCotizacionAjusteOfertaQueryResult(info: QueryInfo): __Observable<QueryResultVClienteCotizacionAjusteOferta> {
    return this.vClienteCotizacionAjusteOfertaQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultVClienteCotizacionAjusteOferta)
    );
  }

  /**
   * vClienteCotizacionAjusteOfertaTotales vClienteCotizacionAjusteOferta
   * @param filters undefined
   * @return OK
   */
  vClienteCotizacionAjusteOfertaVClienteCotizacionAjusteOfertaTotalesResponse(filters: Array<FilterTuple>): __Observable<__StrictHttpResponse<TotalClientesCotizacionesObj>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = filters;
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/vClienteCotizacionAjusteOfertaTotales`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<TotalClientesCotizacionesObj>;
      })
    );
  }
  /**
   * vClienteCotizacionAjusteOfertaTotales vClienteCotizacionAjusteOferta
   * @param filters undefined
   * @return OK
   */
  vClienteCotizacionAjusteOfertaVClienteCotizacionAjusteOfertaTotales(filters: Array<FilterTuple>): __Observable<TotalClientesCotizacionesObj> {
    return this.vClienteCotizacionAjusteOfertaVClienteCotizacionAjusteOfertaTotalesResponse(filters).pipe(
      __map(_r => _r.body as TotalClientesCotizacionesObj)
    );
  }

  /**
   * QueryResult vClienteEVIajusteOfertaLista
   * @param info undefined
   * @return OK
   */
  vClienteEVIajusteOfertaListaQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultVClienteEVIajusteOfertaLista>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/vClienteEVIajusteOfertaLista`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultVClienteEVIajusteOfertaLista>;
      })
    );
  }
  /**
   * QueryResult vClienteEVIajusteOfertaLista
   * @param info undefined
   * @return OK
   */
  vClienteEVIajusteOfertaListaQueryResult(info: QueryInfo): __Observable<QueryResultVClienteEVIajusteOfertaLista> {
    return this.vClienteEVIajusteOfertaListaQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultVClienteEVIajusteOfertaLista)
    );
  }

  /**
   * QueryResult vCotizacionesCarruselAjusteOferta
   * @param info undefined
   * @return OK
   */
  vCotizacionesCarruselAjusteOfertaQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultVCotizacionesCarruselAjusteOferta>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/vCotizacionesCarruselAjusteOferta`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultVCotizacionesCarruselAjusteOferta>;
      })
    );
  }
  /**
   * QueryResult vCotizacionesCarruselAjusteOferta
   * @param info undefined
   * @return OK
   */
  vCotizacionesCarruselAjusteOfertaQueryResult(info: QueryInfo): __Observable<QueryResultVCotizacionesCarruselAjusteOferta> {
    return this.vCotizacionesCarruselAjusteOfertaQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultVCotizacionesCarruselAjusteOferta)
    );
  }

  /**
   * vCotizacionTipoPartidaAjusteOfertaTotales vCotizacionTipoPartidaAjusteOferta
   * @param filters undefined
   * @return OK
   */
  vCotizacionTipoPartidaAjusteOfertaVCotizacionTipoPartidaAjusteOfertaTotalesResponse(filters: Array<FilterTuple>): __Observable<__StrictHttpResponse<TotalPartidasPorTipoObj>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = filters;
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/vCotizacionTipoPartidaAjusteOfertaTotales`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<TotalPartidasPorTipoObj>;
      })
    );
  }
  /**
   * vCotizacionTipoPartidaAjusteOfertaTotales vCotizacionTipoPartidaAjusteOferta
   * @param filters undefined
   * @return OK
   */
  vCotizacionTipoPartidaAjusteOfertaVCotizacionTipoPartidaAjusteOfertaTotales(filters: Array<FilterTuple>): __Observable<TotalPartidasPorTipoObj> {
    return this.vCotizacionTipoPartidaAjusteOfertaVCotizacionTipoPartidaAjusteOfertaTotalesResponse(filters).pipe(
      __map(_r => _r.body as TotalPartidasPorTipoObj)
    );
  }

  /**
   * vcotPartidaTipoCerrarOfertaBarra vcotPartidaTipoCerrarOferta
   * @param filters undefined
   * @return OK
   */
  vcotPartidaTipoCerrarOfertaVcotPartidaTipoCerrarOfertaBarraResponse(filters: Array<FilterTuple>): __Observable<__StrictHttpResponse<BarraTipoPartidaCerrarOfertaObj>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = filters;
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/vcotPartidaTipoCerrarOfertaBarra`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<BarraTipoPartidaCerrarOfertaObj>;
      })
    );
  }
  /**
   * vcotPartidaTipoCerrarOfertaBarra vcotPartidaTipoCerrarOferta
   * @param filters undefined
   * @return OK
   */
  vcotPartidaTipoCerrarOfertaVcotPartidaTipoCerrarOfertaBarra(filters: Array<FilterTuple>): __Observable<BarraTipoPartidaCerrarOfertaObj> {
    return this.vcotPartidaTipoCerrarOfertaVcotPartidaTipoCerrarOfertaBarraResponse(filters).pipe(
      __map(_r => _r.body as BarraTipoPartidaCerrarOfertaObj)
    );
  }

  /**
   * QueryResult vEVIcotizacionesAjusteOferta
   * @param info undefined
   * @return OK
   */
  vEVIcotizacionesAjusteOfertaQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultVEVIcotizacionesAjusteOferta>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/vEVIcotizacionesAjusteOferta`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultVEVIcotizacionesAjusteOferta>;
      })
    );
  }
  /**
   * QueryResult vEVIcotizacionesAjusteOferta
   * @param info undefined
   * @return OK
   */
  vEVIcotizacionesAjusteOfertaQueryResult(info: QueryInfo): __Observable<QueryResultVEVIcotizacionesAjusteOferta> {
    return this.vEVIcotizacionesAjusteOfertaQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultVEVIcotizacionesAjusteOferta)
    );
  }

  /**
   * vEVIcotizacionesAjusteOfertaTotales vEVIcotizacionesAjusteOferta
   * @param filters undefined
   * @return OK
   */
  vEVIcotizacionesAjusteOfertaVEVIcotizacionesAjusteOfertaTotalesResponse(filters: Array<FilterTuple>): __Observable<__StrictHttpResponse<TotalClientesCotizacionesObj>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = filters;
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/vEVIcotizacionesAjusteOfertaTotales`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<TotalClientesCotizacionesObj>;
      })
    );
  }
  /**
   * vEVIcotizacionesAjusteOfertaTotales vEVIcotizacionesAjusteOferta
   * @param filters undefined
   * @return OK
   */
  vEVIcotizacionesAjusteOfertaVEVIcotizacionesAjusteOfertaTotales(filters: Array<FilterTuple>): __Observable<TotalClientesCotizacionesObj> {
    return this.vEVIcotizacionesAjusteOfertaVEVIcotizacionesAjusteOfertaTotalesResponse(filters).pipe(
      __map(_r => _r.body as TotalClientesCotizacionesObj)
    );
  }

  /**
   * QueryResult vMarcaPartidaAjusteOferta
   * @param info undefined
   * @return OK
   */
  vMarcaPartidaAjusteOfertaQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultVMarcaPartidaAjusteOferta>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/vMarcaPartidaAjusteOferta`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultVMarcaPartidaAjusteOferta>;
      })
    );
  }
  /**
   * QueryResult vMarcaPartidaAjusteOferta
   * @param info undefined
   * @return OK
   */
  vMarcaPartidaAjusteOfertaQueryResult(info: QueryInfo): __Observable<QueryResultVMarcaPartidaAjusteOferta> {
    return this.vMarcaPartidaAjusteOfertaQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultVMarcaPartidaAjusteOferta)
    );
  }

  /**
   * vMarcaPartidaAjusteOfertaTotales vMarcaPartidaAjusteOferta
   * @param filters undefined
   * @return OK
   */
  vMarcaPartidaAjusteOfertaVMarcaPartidaAjusteOfertaTotalesResponse(filters: Array<FilterTuple>): __Observable<__StrictHttpResponse<TotalMarcasPartidasObj>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = filters;
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/vMarcaPartidaAjusteOfertaTotales`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<TotalMarcasPartidasObj>;
      })
    );
  }
  /**
   * vMarcaPartidaAjusteOfertaTotales vMarcaPartidaAjusteOferta
   * @param filters undefined
   * @return OK
   */
  vMarcaPartidaAjusteOfertaVMarcaPartidaAjusteOfertaTotales(filters: Array<FilterTuple>): __Observable<TotalMarcasPartidasObj> {
    return this.vMarcaPartidaAjusteOfertaVMarcaPartidaAjusteOfertaTotalesResponse(filters).pipe(
      __map(_r => _r.body as TotalMarcasPartidasObj)
    );
  }

  /**
   * vTotalClientesPorTipoAjusteDeOferta vTotalPorTipoAjusteDeOferta
   * @param filters undefined
   * @return OK
   */
  vTotalPorTipoAjusteDeOfertaVTotalClientesPorTipoAjusteDeOfertaResponse(filters: Array<FilterTuple>): __Observable<__StrictHttpResponse<TotalClientesPorTipoAjusteDeOfertaObj>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = filters;
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/vTotalClientesPorTipoAjusteDeOferta`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<TotalClientesPorTipoAjusteDeOfertaObj>;
      })
    );
  }
  /**
   * vTotalClientesPorTipoAjusteDeOferta vTotalPorTipoAjusteDeOferta
   * @param filters undefined
   * @return OK
   */
  vTotalPorTipoAjusteDeOfertaVTotalClientesPorTipoAjusteDeOferta(filters: Array<FilterTuple>): __Observable<TotalClientesPorTipoAjusteDeOfertaObj> {
    return this.vTotalPorTipoAjusteDeOfertaVTotalClientesPorTipoAjusteDeOfertaResponse(filters).pipe(
      __map(_r => _r.body as TotalClientesPorTipoAjusteDeOfertaObj)
    );
  }

  /**
   * vTotalPorTipoAjusteDeOfertaGrafica vTotalPorTipoAjusteDeOferta
   * @param filters undefined
   * @return OK
   */
  vTotalPorTipoAjusteDeOfertaVTotalPorTipoAjusteDeOfertaGraficaResponse(filters: Array<FilterTuple>): __Observable<__StrictHttpResponse<TotalAjustesPorTipoObj>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = filters;
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/vTotalPorTipoAjusteDeOfertaGrafica`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<TotalAjustesPorTipoObj>;
      })
    );
  }
  /**
   * vTotalPorTipoAjusteDeOfertaGrafica vTotalPorTipoAjusteDeOferta
   * @param filters undefined
   * @return OK
   */
  vTotalPorTipoAjusteDeOfertaVTotalPorTipoAjusteDeOfertaGrafica(filters: Array<FilterTuple>): __Observable<TotalAjustesPorTipoObj> {
    return this.vTotalPorTipoAjusteDeOfertaVTotalPorTipoAjusteDeOfertaGraficaResponse(filters).pipe(
      __map(_r => _r.body as TotalAjustesPorTipoObj)
    );
  }
}

module ProcesosL02AjustarOfertaService {
}

export { ProcesosL02AjustarOfertaService }
