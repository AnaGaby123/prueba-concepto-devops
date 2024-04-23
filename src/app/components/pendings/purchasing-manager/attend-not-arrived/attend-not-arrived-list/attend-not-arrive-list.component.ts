import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {appRoutes} from '@appHelpers/core/app-routes';

@Component({
  selector: 'app-attend-not-arrive-list',
  templateUrl: './attend-not-arrive-list.component.html',
  styleUrls: ['./attend-not-arrive-list.component.scss'],
})
export class AttendNotArriveListComponent {
  constructor(private router: Router) {}

  redirectToDetails(): void {
    this.router.navigate([
      appRoutes.protected,
      appRoutes.pendings.pendings,
      appRoutes.attendNotArrived.attendNotArrived,
      appRoutes.attendNotArrived.details,
    ]);
  }
}
