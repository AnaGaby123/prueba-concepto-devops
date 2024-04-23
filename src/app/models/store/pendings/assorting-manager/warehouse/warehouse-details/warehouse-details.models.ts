export interface IWareHouseDetails {
  searchTerm: string;
}

export const initialIWareHouseDetails = (): IWareHouseDetails => ({
  searchTerm: '',
});
