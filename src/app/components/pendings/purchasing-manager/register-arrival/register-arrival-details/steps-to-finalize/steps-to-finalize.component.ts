/* Core Imports */
import {Component, HostListener, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {Router} from '@angular/router';

/* Models Imports */
import {IPopUpConfig} from '@appModels/popUp/pop-up.model';
import {BarActivityOption} from '@appModels/bar-activities/bar-activities';
import {IDispatchOder} from '@appModels/store/pendings/purchasing-manager/register-arrival/register-arrival-details/register-arrival-details.models';

/* Common Imports */
import {RESPONSIVE_MENU_WIDTH_LIMIT, VIEW_IPAD, VIEW_MACBOOKAIR} from '@appUtil/common.protocols';

/* Tools Imports */
/* Selectors Imports */
import {registerArrivalDetailsSelectors} from '@appSelectors/pendings/purchasing-manager/register-arrival';

/* Actions Imports */
import {registerArrivalDetailsActions} from '@appActions/pendings/purchasing-manager/register-arrival';
import {appRoutes} from '@appHelpers/core/app-routes';

@Component({
  selector: 'app-steps-to-finalize',
  templateUrl: './steps-to-finalize.component.html',
  styleUrls: ['./steps-to-finalize.component.scss'],
})
export class StepsToFinalizeComponent implements OnInit {
  steps$: Observable<Array<BarActivityOption>> = this.store.select(
    registerArrivalDetailsSelectors.selectSteps,
  );
  stepSelected$: Observable<number> = this.store.select(
    registerArrivalDetailsSelectors.selectStepSelected,
  );
  stepSelectedName$: Observable<string> = this.store.select(
    registerArrivalDetailsSelectors.selectCurrentStep,
  );
  advanceStep$: Observable<boolean> = this.store.select(
    registerArrivalDetailsSelectors.validateAdvanceNextStep,
  );
  dispatchOrderSelected$: Observable<IDispatchOder> = this.store.select(
    registerArrivalDetailsSelectors.selectDispatchOrderSelected,
  );
  codesAreValid$: Observable<boolean> = this.store.select(
    registerArrivalDetailsSelectors.selectCodesAreValid,
  );
  viewType: string;
  viewIpad = VIEW_IPAD;
  viewMacBookAir = VIEW_MACBOOKAIR;
  popUps: {
    cancel: IPopUpConfig;
  };
  readonly CANCEL_POP = 'cancel';

  constructor(private store: Store<AppState>, private router: Router) {
    this.popUps = {
      [this.CANCEL_POP]: {isOpen: false, target: null},
    };
  }

  ngOnInit(): void {
    this.onResize();
  }

  @HostListener('window:resize')
  onResize(): void {
    this.viewType =
      window.innerWidth < RESPONSIVE_MENU_WIDTH_LIMIT ? this.viewIpad : this.viewMacBookAir;
  }

  changeStep(barActivitySelected: number): void {
    this.store.dispatch(
      registerArrivalDetailsActions.SET_STEP_SELECTED({
        stepSelected: barActivitySelected,
      }),
    );
  }

  async handleCancelPop(pop: string, fromBtn: boolean, emit?: boolean): Promise<void> {
    if (fromBtn) {
      this.popUps = {
        ...this.popUps,
        [pop]: {
          isOpen: true,
        },
      };
    } else {
      if (emit) {
        await this.router.navigate([
          appRoutes.protected,
          appRoutes.pendings.pendings,
          appRoutes.registerArrival.registerArrival,
          appRoutes.registerArrival.details,
          appRoutes.registerArrival.barcode,
        ]);
      } else {
        this.popUps = {
          ...this.popUps,
          [pop]: {
            isOpen: false,
          },
        };
      }
    }
  }

  registerArrival(): void {
    this.store.dispatch(registerArrivalDetailsActions.REGISTER_ARRIVAL_LOAD());
  }
}
