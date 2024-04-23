import {Component} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {inspectorSelectors} from '@appSelectors/pendings/storer/inspector';
import {Router} from '@angular/router';
import {appRoutes} from '@appHelpers/core/app-routes';

@Component({
  selector: 'app-inspector',
  templateUrl: './inspector.component.html',
  styleUrls: ['./inspector.component.scss'],
})
export class InspectorComponent {
  title$: Observable<string> = this.store.select(inspectorSelectors.selectTitle);
  detailsMode$: Observable<boolean> = this.store.select(inspectorSelectors.selectDetailsMode);

  constructor(private store: Store, private router: Router) {}

  goBack(): void {
    this.router.navigate([
      appRoutes.protected,
      appRoutes.pendings.pendings,
      appRoutes.inspector.inspector,
      appRoutes.inspector.dashboard,
    ]);
  }
}
