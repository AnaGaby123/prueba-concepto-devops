import {Component} from '@angular/core';
import {Store} from '@ngrx/store';
import {inspectorDetailsActions} from '@appActions/pendings/storer/inspector';
import {Router} from '@angular/router';
import {appRoutes} from '@appHelpers/core/app-routes';

@Component({
  selector: 'app-step0',
  templateUrl: './step0.component.html',
  styleUrls: ['./step0.component.scss'],
})
export class Step0Component {
  constructor(private store: Store, private router: Router) {}

  goToNextStep(step: number): void {
    this.store.dispatch(inspectorDetailsActions.SET_STEP({step}));
    this.router.navigate([
      appRoutes.protected,
      appRoutes.pendings.pendings,
      appRoutes.inspector.inspector,
      appRoutes.inspector.details,
      appRoutes.inspector.steps,
      'step' + step,
    ]);
  }
}
