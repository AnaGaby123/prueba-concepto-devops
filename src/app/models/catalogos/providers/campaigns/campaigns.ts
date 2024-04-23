export interface CampaignsViewConfigurations {
  id: number | string;
  titleListData: string;
  titleListItemsRelated: string;
  textNumberRegisterListData: string;
  text2NumberRegisterListData: string;
  textNumberRegisterListItemsRelated: string;
  fetchMoreConfiguration: FetchMoreConfiguration;
  searchConfiguration: string;
  withoutTextRelated: string;
  withoutTextItems: string;
}

export interface FetchMoreConfiguration {
  listName: string;
  idName: string;
  selectListName: string;
  selectCurrentPageName: string;
}
