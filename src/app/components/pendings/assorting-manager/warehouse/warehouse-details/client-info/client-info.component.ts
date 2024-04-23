/* Angular Imports */
import {Component} from '@angular/core';
import {Router} from '@angular/router';

/* Common Imports */
import {appRoutes} from '@appHelpers/core/app-routes';

@Component({
  selector: 'app-client-info',
  templateUrl: './client-info.component.html',
  styleUrls: ['./client-info.component.scss'],
})
export class ClientInfoComponent {
  constructor(private router: Router) {}

  returnClientsView(): void {
    this.router.navigate([
      appRoutes.protected,
      appRoutes.pendings.pendings,
      appRoutes.warehouse.warehouse,
      appRoutes.warehouse.details,
      appRoutes.warehouse.clients,
    ]);
  }
}
