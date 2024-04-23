import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {appRoutes} from '@appHelpers/core/app-routes';

@Component({
  selector: 'app-catalogos-home',
  templateUrl: './catalogos-home.component.html',
  styleUrls: ['./catalogos-home.component.scss'],
})
export class CatalogosHomeComponent {
  constructor(private router: Router) {}

  clientsRoute = appRoutes.catalogs.clients.clients;

  redirectTo(url: string): void {
    this.router.navigate(['/protected/catalogs/', url]);
  }
}
