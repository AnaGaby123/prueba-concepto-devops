export const TITLE_DECLARE_ARRIVAL_GUIDE = 'DECLARAR ARRIBO DE GUÍA';

export interface IDeclareArrivalGuide {
  title: string;
  detailsMode: boolean;
}

export const initialIDeclareArrivalGuide = (): IDeclareArrivalGuide => ({
  title: TITLE_DECLARE_ARRIVAL_GUIDE,
  detailsMode: false,
});
