/* tslint:disable */
import { NgModule, ModuleWithProviders } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ApiLogisticaConfiguration, ApiLogisticaConfigurationInterface } from './api-logistica-configuration';

import { ProcesosAutorizacionesService } from './services/procesos-autorizaciones.service';
import { ProcesosL01CotizacionService } from './services/procesos-l01cotizacion.service';
import { ProcesosL01CotizacionArchivoService } from './services/procesos-l01cotizacion-archivo.service';
import { ProcesosL01CotizacionAtenderCierreService } from './services/procesos-l01cotizacion-atender-cierre.service';
import { ProcesosL01CotizacionCancelacionService } from './services/procesos-l01cotizacion-cancelacion.service';
import { ProcesosL01CotizacionCerrarOfertaService } from './services/procesos-l01cotizacion-cerrar-oferta.service';
import { ProcesosL01CotizacionCerrarOfertaDashboardService } from './services/procesos-l01cotizacion-cerrar-oferta-dashboard.service';
import { ProcesosL01CotizacionCerrarOfertaPopsAjustesService } from './services/procesos-l01cotizacion-cerrar-oferta-pops-ajustes.service';
import { ProcesosL01CotizacionCerrarOfertaTopIndexService } from './services/procesos-l01cotizacion-cerrar-oferta-top-index.service';
import { ProcesosL01CotizacionCierreService } from './services/procesos-l01cotizacion-cierre.service';
import { ProcesosL01CotizacionCierreTasasConversionService } from './services/procesos-l01cotizacion-cierre-tasas-conversion.service';
import { ProcesosL01CotizacionClienteService } from './services/procesos-l01cotizacion-cliente.service';
import { ProcesosL01CotizacionConfiguracionService } from './services/procesos-l01cotizacion-configuracion.service';
import { ProcesosL01CotizacionContactoClienteService } from './services/procesos-l01cotizacion-contacto-cliente.service';
import { ProcesosL01CotizacionCorreosService } from './services/procesos-l01cotizacion-correos.service';
import { ProcesosL01CotizacionEvaluacionService } from './services/procesos-l01cotizacion-evaluacion.service';
import { ProcesosL01CotizacionFletesService } from './services/procesos-l01cotizacion-fletes.service';
import { ProcesosL01CotizacionInvestigacionService } from './services/procesos-l01cotizacion-investigacion.service';
import { ProcesosL01CotizacionPartidasService } from './services/procesos-l01cotizacion-partidas.service';
import { ProcesosL01CotizacionPartidasDesglosesService } from './services/procesos-l01cotizacion-partidas-desgloses.service';
import { ProcesosL01CotizacionPromesaDeCompraService } from './services/procesos-l01cotizacion-promesa-de-compra.service';
import { ProcesosL01CotizacionRecotizarService } from './services/procesos-l01cotizacion-recotizar.service';
import { ProcesosL02AjustarOfertaService } from './services/procesos-l02ajustar-oferta.service';
import { ProcesosL02AjustarOfertaAutorizarAjusteOfertaService } from './services/procesos-l02ajustar-oferta-autorizar-ajuste-oferta.service';
import { ProcesosL02AjustarOfertaEstablecerEstrategiaService } from './services/procesos-l02ajustar-oferta-establecer-estrategia.service';
import { ProcesosL02AjustarOfertaEstablecerEstrategiaCotizacionService } from './services/procesos-l02ajustar-oferta-establecer-estrategia-cotizacion.service';
import { ProcesosL02AjustarOfertaMasivosService } from './services/procesos-l02ajustar-oferta-masivos.service';
import { ProcesosL03PromesaDeCompraService } from './services/procesos-l03promesa-de-compra.service';
import { ProcesosL03PromesaDeCompraDashboardService } from './services/procesos-l03promesa-de-compra-dashboard.service';
import { ProcesosL03PromesaDeCompraEstanteService } from './services/procesos-l03promesa-de-compra-estante.service';
import { ProcesosL04PretramitarPedidoService } from './services/procesos-l04pretramitar-pedido.service';
import { ProcesosL04PretramitarPedidoCorreosService } from './services/procesos-l04pretramitar-pedido-correos.service';
import { ProcesosL04PretramitarPedidoCorreosGestionarIntramitablesService } from './services/procesos-l04pretramitar-pedido-correos-gestionar-intramitables.service';
import { ProcesosL04PretramitarPedidoCorreosOcNoAmparadaService } from './services/procesos-l04pretramitar-pedido-correos-oc-no-amparada.service';
import { ProcesosL04PretramitarPedidoGestionarIntramitablesService } from './services/procesos-l04pretramitar-pedido-gestionar-intramitables.service';
import { ProcesosL04PretramitarPedidoRecalcularService } from './services/procesos-l04pretramitar-pedido-recalcular.service';
import { ProcesosL05TramitarPedidoService } from './services/procesos-l05tramitar-pedido.service';
import { ProcesosL05TramitarPedidoCartaDeDisponibilidadService } from './services/procesos-l05tramitar-pedido-carta-de-disponibilidad.service';
import { ProcesosL05TramitarPedidoConfiguracionesService } from './services/procesos-l05tramitar-pedido-configuraciones.service';
import { ProcesosL05TramitarPedidoCorreosService } from './services/procesos-l05tramitar-pedido-correos.service';
import { ProcesosL05TramitarPedidoDashboardService } from './services/procesos-l05tramitar-pedido-dashboard.service';
import { ProcesosL05TramitarPedidoFacturasService } from './services/procesos-l05tramitar-pedido-facturas.service';
import { ProcesosL05TramitarPedidoFacturasSanofiService } from './services/procesos-l05tramitar-pedido-facturas-sanofi.service';
import { ProcesosL05TramitarPedidoFletesService } from './services/procesos-l05tramitar-pedido-fletes.service';
import { ProcesosL05TramitarPedidoLiberarService } from './services/procesos-l05tramitar-pedido-liberar.service';
import { ProcesosL05TramitarPedidoModificacionService } from './services/procesos-l05tramitar-pedido-modificacion.service';
import { ProcesosL05TramitarPedidoPartidasService } from './services/procesos-l05tramitar-pedido-partidas.service';
import { ProcesosL05TramitarPedidoSepararPedidoService } from './services/procesos-l05tramitar-pedido-separar-pedido.service';
import { ProcesosL06OrdenDeCompraService } from './services/procesos-l06orden-de-compra.service';
import { ProcesosL06OrdenDeCompraCargarFacturaService } from './services/procesos-l06orden-de-compra-cargar-factura.service';
import { ProcesosL06OrdenDeCompraCargarFacturaCalculosService } from './services/procesos-l06orden-de-compra-cargar-factura-calculos.service';
import { ProcesosL06OrdenDeCompraConfirmacionService } from './services/procesos-l06orden-de-compra-confirmacion.service';
import { ProcesosL06OrdenDeCompraCorreosService } from './services/procesos-l06orden-de-compra-correos.service';
import { ProcesosL06OrdenDeCompraDashboardService } from './services/procesos-l06orden-de-compra-dashboard.service';
import { ProcesosL06OrdenDeCompraDeclararArribosService } from './services/procesos-l06orden-de-compra-declarar-arribos.service';
import { ProcesosL06OrdenDeCompraDeclararArribosDashboardService } from './services/procesos-l06orden-de-compra-declarar-arribos-dashboard.service';
import { ProcesosL06OrdenDeCompraEnviosService } from './services/procesos-l06orden-de-compra-envios.service';
import { ProcesosL06OrdenDeCompraGestionarBackOrderService } from './services/procesos-l06orden-de-compra-gestionar-back-order.service';
import { ProcesosL06OrdenDeCompraPartidasService } from './services/procesos-l06orden-de-compra-partidas.service';
import { ProcesosL06OrdenDeCompraPartidasModificacionesService } from './services/procesos-l06orden-de-compra-partidas-modificaciones.service';
import { ProcesosL06OrdenDeCompraPendientesService } from './services/procesos-l06orden-de-compra-pendientes.service';
import { ProcesosL06OrdenDeCompraRegistrarArriboService } from './services/procesos-l06orden-de-compra-registrar-arribo.service';
import { ProcesosL07ImportacionesService } from './services/procesos-l07importaciones.service';
import { ProcesosL07ImportacionesAsistenteImportacionesService } from './services/procesos-l07importaciones-asistente-importaciones.service';
import { ProcesosL07ImportacionesConfirmarDespachoService } from './services/procesos-l07importaciones-confirmar-despacho.service';
import { ProcesosL07ImportacionesMonitorearDespachoService } from './services/procesos-l07importaciones-monitorear-despacho.service';
import { ProcesosL07ImportacionesPlanificarDespachoService } from './services/procesos-l07importaciones-planificar-despacho.service';
import { ProcesosL07ImportacionesRegistrarDespachoService } from './services/procesos-l07importaciones-registrar-despacho.service';
import { ProcesosL08InspeccionService } from './services/procesos-l08inspeccion.service';
import { ProcesosL08InspeccionSeguridadService } from './services/procesos-l08inspeccion-seguridad.service';
import { ProcesosL09EmbalarService } from './services/procesos-l09embalar.service';
import { ProcesosL09EmbalarArchivosDescargadosService } from './services/procesos-l09embalar-archivos-descargados.service';
import { ProcesosL09EmbalarColectarService } from './services/procesos-l09embalar-colectar.service';
import { ProcesosL09EmbalarDashboardService } from './services/procesos-l09embalar-dashboard.service';
import { ProcesosL09EmbalarPartidasService } from './services/procesos-l09embalar-partidas.service';
import { ProcesosMailbotService } from './services/procesos-mailbot.service';
import { SistemaService } from './services/sistema.service';

/**
 * Provider for all ApiLogistica services, plus ApiLogisticaConfiguration
 */
@NgModule({
  imports: [
    HttpClientModule
  ],
  exports: [
    HttpClientModule
  ],
  declarations: [],
  providers: [
    ApiLogisticaConfiguration,
    ProcesosAutorizacionesService,
    ProcesosL01CotizacionService,
    ProcesosL01CotizacionArchivoService,
    ProcesosL01CotizacionAtenderCierreService,
    ProcesosL01CotizacionCancelacionService,
    ProcesosL01CotizacionCerrarOfertaService,
    ProcesosL01CotizacionCerrarOfertaDashboardService,
    ProcesosL01CotizacionCerrarOfertaPopsAjustesService,
    ProcesosL01CotizacionCerrarOfertaTopIndexService,
    ProcesosL01CotizacionCierreService,
    ProcesosL01CotizacionCierreTasasConversionService,
    ProcesosL01CotizacionClienteService,
    ProcesosL01CotizacionConfiguracionService,
    ProcesosL01CotizacionContactoClienteService,
    ProcesosL01CotizacionCorreosService,
    ProcesosL01CotizacionEvaluacionService,
    ProcesosL01CotizacionFletesService,
    ProcesosL01CotizacionInvestigacionService,
    ProcesosL01CotizacionPartidasService,
    ProcesosL01CotizacionPartidasDesglosesService,
    ProcesosL01CotizacionPromesaDeCompraService,
    ProcesosL01CotizacionRecotizarService,
    ProcesosL02AjustarOfertaService,
    ProcesosL02AjustarOfertaAutorizarAjusteOfertaService,
    ProcesosL02AjustarOfertaEstablecerEstrategiaService,
    ProcesosL02AjustarOfertaEstablecerEstrategiaCotizacionService,
    ProcesosL02AjustarOfertaMasivosService,
    ProcesosL03PromesaDeCompraService,
    ProcesosL03PromesaDeCompraDashboardService,
    ProcesosL03PromesaDeCompraEstanteService,
    ProcesosL04PretramitarPedidoService,
    ProcesosL04PretramitarPedidoCorreosService,
    ProcesosL04PretramitarPedidoCorreosGestionarIntramitablesService,
    ProcesosL04PretramitarPedidoCorreosOcNoAmparadaService,
    ProcesosL04PretramitarPedidoGestionarIntramitablesService,
    ProcesosL04PretramitarPedidoRecalcularService,
    ProcesosL05TramitarPedidoService,
    ProcesosL05TramitarPedidoCartaDeDisponibilidadService,
    ProcesosL05TramitarPedidoConfiguracionesService,
    ProcesosL05TramitarPedidoCorreosService,
    ProcesosL05TramitarPedidoDashboardService,
    ProcesosL05TramitarPedidoFacturasService,
    ProcesosL05TramitarPedidoFacturasSanofiService,
    ProcesosL05TramitarPedidoFletesService,
    ProcesosL05TramitarPedidoLiberarService,
    ProcesosL05TramitarPedidoModificacionService,
    ProcesosL05TramitarPedidoPartidasService,
    ProcesosL05TramitarPedidoSepararPedidoService,
    ProcesosL06OrdenDeCompraService,
    ProcesosL06OrdenDeCompraCargarFacturaService,
    ProcesosL06OrdenDeCompraCargarFacturaCalculosService,
    ProcesosL06OrdenDeCompraConfirmacionService,
    ProcesosL06OrdenDeCompraCorreosService,
    ProcesosL06OrdenDeCompraDashboardService,
    ProcesosL06OrdenDeCompraDeclararArribosService,
    ProcesosL06OrdenDeCompraDeclararArribosDashboardService,
    ProcesosL06OrdenDeCompraEnviosService,
    ProcesosL06OrdenDeCompraGestionarBackOrderService,
    ProcesosL06OrdenDeCompraPartidasService,
    ProcesosL06OrdenDeCompraPartidasModificacionesService,
    ProcesosL06OrdenDeCompraPendientesService,
    ProcesosL06OrdenDeCompraRegistrarArriboService,
    ProcesosL07ImportacionesService,
    ProcesosL07ImportacionesAsistenteImportacionesService,
    ProcesosL07ImportacionesConfirmarDespachoService,
    ProcesosL07ImportacionesMonitorearDespachoService,
    ProcesosL07ImportacionesPlanificarDespachoService,
    ProcesosL07ImportacionesRegistrarDespachoService,
    ProcesosL08InspeccionService,
    ProcesosL08InspeccionSeguridadService,
    ProcesosL09EmbalarService,
    ProcesosL09EmbalarArchivosDescargadosService,
    ProcesosL09EmbalarColectarService,
    ProcesosL09EmbalarDashboardService,
    ProcesosL09EmbalarPartidasService,
    ProcesosMailbotService,
    SistemaService
  ],
})
export class ApiLogisticaModule {
  static forRoot(customParams: ApiLogisticaConfigurationInterface): ModuleWithProviders<ApiLogisticaModule> {
    return {
      ngModule: ApiLogisticaModule,
      providers: [
        {
          provide: ApiLogisticaConfiguration,
          useValue: {rootUrl: customParams.rootUrl}
        }
      ]
    }
  }
}
