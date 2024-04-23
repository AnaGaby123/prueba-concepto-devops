/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiCatalogosConfiguration as __Configuration } from '../api-catalogos-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
class ConfiguracionProductosConsultaExternaService extends __BaseService {
  static readonly ProductoUSPDisponibilidadProductoUSPPath = '/DisponibilidadProductoUSP';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Revisar la disponibilidad de un producto.
   * @param catalogo Nombre de catálogo del producto de USP.
   * @return OK
   */
  ProductoUSPDisponibilidadProductoUSPResponse(catalogo: string): __Observable<__StrictHttpResponse<boolean>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (catalogo != null) __params = __params.set('catalogo', catalogo.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/DisponibilidadProductoUSP`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'text'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return (_r as HttpResponse<any>).clone({ body: (_r as HttpResponse<any>).body === 'true' }) as __StrictHttpResponse<boolean>
      })
    );
  }
  /**
   * Revisar la disponibilidad de un producto.
   * @param catalogo Nombre de catálogo del producto de USP.
   * @return OK
   */
  ProductoUSPDisponibilidadProductoUSP(catalogo: string): __Observable<boolean> {
    return this.ProductoUSPDisponibilidadProductoUSPResponse(catalogo).pipe(
      __map(_r => _r.body as boolean)
    );
  }
}

module ConfiguracionProductosConsultaExternaService {
}

export { ConfiguracionProductosConsultaExternaService }
