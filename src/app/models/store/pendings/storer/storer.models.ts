import {
  IInspectorState,
  initialIInspectorState,
} from '@appModels/store/pendings/storer/inspector/inspector.models';

export interface IStorerState {
  inspector: IInspectorState;
}

export const initialIStorerState = (): IStorerState => ({
  inspector: initialIInspectorState(),
});
