export interface IShippingConsoleList {
  searchTerm: string;
}

export const initialIShippingConsoleList = (): IShippingConsoleList => ({
  searchTerm: '',
});
