export interface IImageItem {
  image?: string;
  imageHover?: string;
}

export interface IClientContact {
  assignedEsacName: string;
  category: string;
  clientName: string;
  contactName: string;
  hasCredit: boolean;
  image: string;
  incomeLevel?: string;
  mail: string;
  telephoneNumber: string;
  telephoneNumberExtension: string;
  position: string;
  department: string;
  decisionLevel: string;
  acceptsPartial?: boolean;
  sendGuide?: boolean;
  showSendGuide?: boolean;
}
