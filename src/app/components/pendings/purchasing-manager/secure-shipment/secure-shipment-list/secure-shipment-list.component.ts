/*Core imports*/
import {Component} from '@angular/core';
import {Router} from '@angular/router';

/*Models imports*/
import {IProvider} from '@appModels/store/pendings/purchasing-manager/register-confirmation/register-confirmation-list/register-confirmation-list.models';

/*Utils imports*/
import {DEFAULT_DATE, DEFAULT_UUID} from '@appUtil/common.protocols';
import {appRoutes} from '@appHelpers/core/app-routes';

@Component({
  selector: 'app-secure-shipment-list',
  templateUrl: './secure-shipment-list.component.html',
  styleUrls: ['./secure-shipment-list.component.scss'],
})
export class SecureShipmentListComponent {
  listProvidersScrollItems: Array<IProvider> = [
    {
      A1Dia: 1,
      A2Dias: 2,
      A3Dias: 3,
      AMasDe3Dias: 5,
      FechaOCMasAntigua: DEFAULT_DATE,
      FechaOCMasReciente: DEFAULT_DATE,
      IdProveedor: DEFAULT_UUID,
      Index: 1,
      MontoTotal: 50255,
      Nombre: 'TLC Pharmaceutical',
      TieneBackOrder: true,
      TieneBackOrderPorGestionar: true,
      TotalBackOrderPorCancelar: 852,
      TotalBackOrderPorGestionar: 5420,
      TotalFleteExpress: 20,
      TotalFleteNormal: 20,
      TotalOC: 6542,
      TotalPartidas: 62,
      TotalPiezas: 2,
      TotalProductos: 2,
      TotalProgramadas: 6,
      Unica: 10,
    },
  ];

  constructor(private router: Router) {}

  setProviderShpiment(): void {
    this.router.navigate([
      appRoutes.protected,
      appRoutes.pendings.pendings,
      appRoutes.secureShipment.secureShipment,
      appRoutes.secureShipment.details,
    ]);
  }
}
