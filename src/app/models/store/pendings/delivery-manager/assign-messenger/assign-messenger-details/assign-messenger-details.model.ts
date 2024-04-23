export interface IAssignMessengerDetails {
  packingList: Packing[];
  packing: Packing;
  messengers: Messenger[];
  messenger: Messenger;
}

export interface Packing {
  client: string;
  zone: string;
  fee: string;
  clientDate: string;
  events: number;
  amount: number;
}

export interface Messenger {
  name: string;
  zone: string;
  route: number;
  totalClients: number;
  totalEvents: number;
  totalAmount: number;
  packingList: Array<Packing>;
}

export const initialIAssignMessengerDetails = (): IAssignMessengerDetails => ({
  packingList: [],
  packing: {
    client: '',
    zone: '',
    fee: '',
    clientDate: '',
    events: 0,
    amount: 0,
  },
  messengers: [],
  messenger: {
    name: '',
    zone: '',
    route: 0,
    totalClients: 0,
    totalEvents: 0,
    totalAmount: 0,
    packingList: [],
  },
});
