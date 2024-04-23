/* Models Imports */
import {DropListOption} from '@appModels/drop-list/drop-list-option';

export interface IContentStrategyState {
  optionsStrategy: Array<DropListOption>;
  optionStrategySelected: DropListOption;
}

export const initialContentStrategyState = (): IContentStrategyState => ({
  optionsStrategy: [],
  optionStrategySelected: {} as DropListOption,
});
