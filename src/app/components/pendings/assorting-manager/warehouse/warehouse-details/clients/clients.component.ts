/* Angular Imports */
import {Component} from '@angular/core';
import {Router} from '@angular/router';

/* Common Imports */
import {appRoutes} from '@appHelpers/core/app-routes';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss'],
})
export class ClientsComponent {
  totalColumn = 0;
  clients = [
    {
      Index: 1,
      client: 'CRUMAD DISTRIBUIDORES',
      piezas: 10,
      packingList: 3,
      p1: 2,
      p2: 3,
      p3: 0,
    },
    {
      Index: 2,
      client: 'CEPROLAB SA DE CV',
      piezas: 10,
      packingList: 3,
      p1: 2,
      p2: 3,
      p3: 0,
    },
    {
      Index: 3,
      client: 'COMERCIALIZADORA Y PRODUCTORA DE ESPECIALIDADES',
      piezas: 10,
      packingList: 3,
      p1: 2,
      p2: 3,
      p3: 0,
    },
    {
      Index: 4,
      client: 'COPISA',
      piezas: 10,
      packingList: 3,
      p1: 2,
      p2: 3,
      p3: 0,
    },
    {
      Index: 5,
      client: 'IMPORTADORA MAE LAB',
      piezas: 10,
      packingList: 3,
      p1: 2,
      p2: 3,
      p3: 0,
    },
    {
      Index: 6,
      client: 'JAXAQUIM S.A. DE C.V.',
      piezas: 10,
      packingList: 3,
      p1: 2,
      p2: 3,
      p3: 0,
    },
    {
      Index: 7,
      client: 'TECNICOS HAGAP',
      piezas: 10,
      packingList: 3,
      p1: 2,
      p2: 3,
      p3: 0,
    },
  ];

  constructor(private router: Router) {}

  seeClient(): void {
    this.router.navigate([
      appRoutes.protected,
      appRoutes.pendings.pendings,
      appRoutes.warehouse.warehouse,
      appRoutes.warehouse.details,
      appRoutes.warehouse.clientInfo,
    ]);
  }
}
