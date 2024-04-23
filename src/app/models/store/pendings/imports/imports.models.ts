/* Models Imports */
import {
  initialIPlanDispatchState,
  IPlanDispatchState,
} from '@appModels/store/pendings/imports/plan-dispatch/plan-dispatch.models';
import {
  ILoadMissingState,
  initialILoadMissing,
} from '@appModels/store/pendings/imports/load-missing/load-missing.models';
import {
  initialIRegisterDispatchState,
  IRegisterDispatchState,
} from '@appModels/store/pendings/imports/register-dispatch/register-dispatch.models';

export interface IImportsState {
  planDispatch: IPlanDispatchState;
  loadMissing: ILoadMissingState;
  registerDispatch: IRegisterDispatchState;
}

export const initialIImportsState = (): IImportsState => ({
  planDispatch: initialIPlanDispatchState(),
  loadMissing: initialILoadMissing(),
  registerDispatch: initialIRegisterDispatchState(),
});
