/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiLogisticaConfiguration as __Configuration } from '../api-logistica-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { GMSolicitarAjustesCerrarOferta } from '../models/gmsolicitar-ajustes-cerrar-oferta';
import { VMarca } from '../models/vmarca';
import { FilterTuple } from '../models/filter-tuple';
import { VProveedor } from '../models/vproveedor';
import { ListaPartidaCotizacionCerrarOferta } from '../models/lista-partida-cotizacion-cerrar-oferta';
import { QueryInfo } from '../models/query-info';
import { Marca } from '../models/marca';
import { ParametroListaMarcasCotizacionCerrarOferta } from '../models/parametro-lista-marcas-cotizacion-cerrar-oferta';
import { QueryResultCerrarOfertaGraficaDonaObj } from '../models/query-result-cerrar-oferta-grafica-dona-obj';
import { QueryResultVClienteCotizacionesConfirmadasTotalizadores } from '../models/query-result-vcliente-cotizaciones-confirmadas-totalizadores';
import { TotalesPartidasConfiguradasMarcadas } from '../models/totales-partidas-configuradas-marcadas';
import { QueryResultVCOCotizacionesTotalesPartidas } from '../models/query-result-vcocotizaciones-totales-partidas';
import { QueryResultVCotCotizacionTotalesPartidas } from '../models/query-result-vcot-cotizacion-totales-partidas';
@Injectable({
  providedIn: 'root',
})
class ProcesosL01CotizacionCerrarOfertaService extends __BaseService {
  static readonly CerrarOfertaSolicitarAjustesProcessTransaccionPath = '/CerrarOferta/SolicitarAjustesOfertaTransaccion';
  static readonly PartidaCotizacionCerrarOfertaDetalleListaMarcasCotizacionCerrarOfertaConsultaPath = '/ListaMarcasCotizacionCerrarOfertaConsulta';
  static readonly PartidaCotizacionCerrarOfertaDetalleListaProveedoresCotizacionCerrarOfertaConsultaPath = '/ListaProveedoresCotizacionCerrarOfertaConsulta';
  static readonly PartidaCotizacionCerrarOfertaDetalleObtenerPath = '/ListaPartidaCotizacionCerrarOferta';
  static readonly PartidaCotizacionCerrarOfertaDetalleObtener_1Path = '/ListaMarcasCotizacionCerrarOferta';
  static readonly vClienteCotizacionesConfirmadasTotalizadoresObtenerCerrarOfertaGraficaDonaPath = '/vClienteCotizacionesPartidasEstrategiasTotales';
  static readonly vClienteCotizacionesConfirmadasTotalizadoresQueryResultPath = '/vClienteCotizacionesConfirmadasTotalizadores';
  static readonly vCOCotizacionesTotalesPartidasObtenerTotalesPartidasConfiguradasMarcadasPath = '/TotalesPartidasConfiguradasMarcadas';
  static readonly vCOCotizacionesTotalesPartidasQueryResultPath = '/vCOCotizacionesTotalesPartidas';
  static readonly vCotCotizacionTotalesPartidasQueryResultPath = '/vCotCotizacionTotalesPartidas';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * ProcessTransaccion CerrarOfertaSolicitarAjustes
   * @param GMSolicitarAjustesCerrarOferta undefined
   * @return OK
   */
  CerrarOfertaSolicitarAjustesProcessTransaccionResponse(GMSolicitarAjustesCerrarOferta: GMSolicitarAjustesCerrarOferta): __Observable<__StrictHttpResponse<GMSolicitarAjustesCerrarOferta>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = GMSolicitarAjustesCerrarOferta;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/CerrarOferta/SolicitarAjustesOfertaTransaccion`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<GMSolicitarAjustesCerrarOferta>;
      })
    );
  }
  /**
   * ProcessTransaccion CerrarOfertaSolicitarAjustes
   * @param GMSolicitarAjustesCerrarOferta undefined
   * @return OK
   */
  CerrarOfertaSolicitarAjustesProcessTransaccion(GMSolicitarAjustesCerrarOferta: GMSolicitarAjustesCerrarOferta): __Observable<GMSolicitarAjustesCerrarOferta> {
    return this.CerrarOfertaSolicitarAjustesProcessTransaccionResponse(GMSolicitarAjustesCerrarOferta).pipe(
      __map(_r => _r.body as GMSolicitarAjustesCerrarOferta)
    );
  }

  /**
   * ListaMarcasCotizacionCerrarOfertaConsulta PartidaCotizacionCerrarOfertaDetalle
   * @param param undefined
   * @return OK
   */
  PartidaCotizacionCerrarOfertaDetalleListaMarcasCotizacionCerrarOfertaConsultaResponse(param: Array<FilterTuple>): __Observable<__StrictHttpResponse<Array<VMarca>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = param;
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/ListaMarcasCotizacionCerrarOfertaConsulta`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<VMarca>>;
      })
    );
  }
  /**
   * ListaMarcasCotizacionCerrarOfertaConsulta PartidaCotizacionCerrarOfertaDetalle
   * @param param undefined
   * @return OK
   */
  PartidaCotizacionCerrarOfertaDetalleListaMarcasCotizacionCerrarOfertaConsulta(param: Array<FilterTuple>): __Observable<Array<VMarca>> {
    return this.PartidaCotizacionCerrarOfertaDetalleListaMarcasCotizacionCerrarOfertaConsultaResponse(param).pipe(
      __map(_r => _r.body as Array<VMarca>)
    );
  }

  /**
   * ListaProveedoresCotizacionCerrarOfertaConsulta PartidaCotizacionCerrarOfertaDetalle
   * @param idCotCotizacion undefined
   * @return OK
   */
  PartidaCotizacionCerrarOfertaDetalleListaProveedoresCotizacionCerrarOfertaConsultaResponse(idCotCotizacion: string): __Observable<__StrictHttpResponse<Array<VProveedor>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idCotCotizacion != null) __params = __params.set('idCotCotizacion', idCotCotizacion.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/ListaProveedoresCotizacionCerrarOfertaConsulta`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<VProveedor>>;
      })
    );
  }
  /**
   * ListaProveedoresCotizacionCerrarOfertaConsulta PartidaCotizacionCerrarOfertaDetalle
   * @param idCotCotizacion undefined
   * @return OK
   */
  PartidaCotizacionCerrarOfertaDetalleListaProveedoresCotizacionCerrarOfertaConsulta(idCotCotizacion: string): __Observable<Array<VProveedor>> {
    return this.PartidaCotizacionCerrarOfertaDetalleListaProveedoresCotizacionCerrarOfertaConsultaResponse(idCotCotizacion).pipe(
      __map(_r => _r.body as Array<VProveedor>)
    );
  }

  /**
   * Obtener PartidaCotizacionCerrarOfertaDetalle
   * @param info undefined
   * @return OK
   */
  PartidaCotizacionCerrarOfertaDetalleObtenerResponse(info: QueryInfo): __Observable<__StrictHttpResponse<ListaPartidaCotizacionCerrarOferta>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/ListaPartidaCotizacionCerrarOferta`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ListaPartidaCotizacionCerrarOferta>;
      })
    );
  }
  /**
   * Obtener PartidaCotizacionCerrarOfertaDetalle
   * @param info undefined
   * @return OK
   */
  PartidaCotizacionCerrarOfertaDetalleObtener(info: QueryInfo): __Observable<ListaPartidaCotizacionCerrarOferta> {
    return this.PartidaCotizacionCerrarOfertaDetalleObtenerResponse(info).pipe(
      __map(_r => _r.body as ListaPartidaCotizacionCerrarOferta)
    );
  }

  /**
   * Obtener PartidaCotizacionCerrarOfertaDetalle
   * @param param undefined
   * @return OK
   */
  PartidaCotizacionCerrarOfertaDetalleObtener_1Response(param: ParametroListaMarcasCotizacionCerrarOferta): __Observable<__StrictHttpResponse<Array<Marca>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = param;
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/ListaMarcasCotizacionCerrarOferta`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<Marca>>;
      })
    );
  }
  /**
   * Obtener PartidaCotizacionCerrarOfertaDetalle
   * @param param undefined
   * @return OK
   */
  PartidaCotizacionCerrarOfertaDetalleObtener_1(param: ParametroListaMarcasCotizacionCerrarOferta): __Observable<Array<Marca>> {
    return this.PartidaCotizacionCerrarOfertaDetalleObtener_1Response(param).pipe(
      __map(_r => _r.body as Array<Marca>)
    );
  }

  /**
   * ObtenerCerrarOfertaGraficaDona vClienteCotizacionesConfirmadasTotalizadores
   * @param info undefined
   * @return OK
   */
  vClienteCotizacionesConfirmadasTotalizadoresObtenerCerrarOfertaGraficaDonaResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultCerrarOfertaGraficaDonaObj>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/vClienteCotizacionesPartidasEstrategiasTotales`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultCerrarOfertaGraficaDonaObj>;
      })
    );
  }
  /**
   * ObtenerCerrarOfertaGraficaDona vClienteCotizacionesConfirmadasTotalizadores
   * @param info undefined
   * @return OK
   */
  vClienteCotizacionesConfirmadasTotalizadoresObtenerCerrarOfertaGraficaDona(info: QueryInfo): __Observable<QueryResultCerrarOfertaGraficaDonaObj> {
    return this.vClienteCotizacionesConfirmadasTotalizadoresObtenerCerrarOfertaGraficaDonaResponse(info).pipe(
      __map(_r => _r.body as QueryResultCerrarOfertaGraficaDonaObj)
    );
  }

  /**
   * Consultar lista paginada de vClienteCotizacionesConfirmadasTotalizadores
   * @param info Filtros y ordenamientos
   * @return OK
   */
  vClienteCotizacionesConfirmadasTotalizadoresQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultVClienteCotizacionesConfirmadasTotalizadores>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/vClienteCotizacionesConfirmadasTotalizadores`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultVClienteCotizacionesConfirmadasTotalizadores>;
      })
    );
  }
  /**
   * Consultar lista paginada de vClienteCotizacionesConfirmadasTotalizadores
   * @param info Filtros y ordenamientos
   * @return OK
   */
  vClienteCotizacionesConfirmadasTotalizadoresQueryResult(info: QueryInfo): __Observable<QueryResultVClienteCotizacionesConfirmadasTotalizadores> {
    return this.vClienteCotizacionesConfirmadasTotalizadoresQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultVClienteCotizacionesConfirmadasTotalizadores)
    );
  }

  /**
   * ObtenerTotalesPartidasConfiguradasMarcadas vCOCotizacionesTotalesPartidas
   * @param idCotizacion undefined
   * @return OK
   */
  vCOCotizacionesTotalesPartidasObtenerTotalesPartidasConfiguradasMarcadasResponse(idCotizacion: string): __Observable<__StrictHttpResponse<TotalesPartidasConfiguradasMarcadas>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idCotizacion != null) __params = __params.set('idCotizacion', idCotizacion.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/TotalesPartidasConfiguradasMarcadas`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<TotalesPartidasConfiguradasMarcadas>;
      })
    );
  }
  /**
   * ObtenerTotalesPartidasConfiguradasMarcadas vCOCotizacionesTotalesPartidas
   * @param idCotizacion undefined
   * @return OK
   */
  vCOCotizacionesTotalesPartidasObtenerTotalesPartidasConfiguradasMarcadas(idCotizacion: string): __Observable<TotalesPartidasConfiguradasMarcadas> {
    return this.vCOCotizacionesTotalesPartidasObtenerTotalesPartidasConfiguradasMarcadasResponse(idCotizacion).pipe(
      __map(_r => _r.body as TotalesPartidasConfiguradasMarcadas)
    );
  }

  /**
   * Consultar  de vCOCotizacionesTotalesPartidas
   * @param info Filtros y ordenamientos
   * @return OK
   */
  vCOCotizacionesTotalesPartidasQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultVCOCotizacionesTotalesPartidas>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/vCOCotizacionesTotalesPartidas`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultVCOCotizacionesTotalesPartidas>;
      })
    );
  }
  /**
   * Consultar  de vCOCotizacionesTotalesPartidas
   * @param info Filtros y ordenamientos
   * @return OK
   */
  vCOCotizacionesTotalesPartidasQueryResult(info: QueryInfo): __Observable<QueryResultVCOCotizacionesTotalesPartidas> {
    return this.vCOCotizacionesTotalesPartidasQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultVCOCotizacionesTotalesPartidas)
    );
  }

  /**
   * Consultar lista paginada de vCotCotizacionTotalesPartidas
   * @param info Filtros y ordenamientos
   * @return OK
   */
  vCotCotizacionTotalesPartidasQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultVCotCotizacionTotalesPartidas>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/vCotCotizacionTotalesPartidas`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultVCotCotizacionTotalesPartidas>;
      })
    );
  }
  /**
   * Consultar lista paginada de vCotCotizacionTotalesPartidas
   * @param info Filtros y ordenamientos
   * @return OK
   */
  vCotCotizacionTotalesPartidasQueryResult(info: QueryInfo): __Observable<QueryResultVCotCotizacionTotalesPartidas> {
    return this.vCotCotizacionTotalesPartidasQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultVCotCotizacionTotalesPartidas)
    );
  }
}

module ProcesosL01CotizacionCerrarOfertaService {
}

export { ProcesosL01CotizacionCerrarOfertaService }
