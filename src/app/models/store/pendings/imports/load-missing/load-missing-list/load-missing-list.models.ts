/* Models Imports */

export interface ILoadMissingList {
  searchTerm: string;
}

export const initialILoadMissingList = (): ILoadMissingList => ({
  searchTerm: '',
});
