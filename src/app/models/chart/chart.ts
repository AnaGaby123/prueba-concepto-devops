/*
export type CombineType = string | number;
*/

export interface IBarChart {
  labels: string[];
  values: number[];
  backgroundColor: string[];
  backgroundColorHover: string[];
  images: string[];
}

export const InitialIBarChart = (): IBarChart => ({
  labels: [],
  values: [],
  backgroundColor: [],
  backgroundColorHover: [],
  images: [],
});

export interface IDoughnutChart {
  labels: Array<string>;
  values: Array<number>;
}

export interface IDoughnutChartDetails {
  label: string;
  value: string;
}

export const initialIDoughnutChart = (): IDoughnutChart => ({
  labels: [],
  values: [],
});

export interface IChartSegmentClicked {
  label: string;
  active: boolean;
}

/* ******************************** Colors ******************************** */
export interface IColorRange {
  start: string;
  end: string;
}

export interface IColors {
  color: Array<IColorRange>;
  colorHover: Array<string>;
}

export interface IBackgroundColors {
  backgroundColor: Array<CanvasGradient>;
  hoverBackgroundColor: Array<string>;
}

export interface ISizesDoughnutChart {
  sizeMacTitle: number;
  sizeMediumTitle: number;
  sizeNormalTitle: number;
  sizeSmallTitle: number;
  sizeMacCenterText: number;
  sizeMediumCenterText: number;
  sizeNormalCenterText: number;
  sizeSmallCenterText: number;
}

export interface ISizesBarChart {
  sizeMacTitle: number;
  sizeMediumTitle: number;
  sizeNormalTitle: number;
  sizeSmallTitle: number;
  sizeMacLabels: number;
  sizeMediumLabels: number;
  sizeNormalLabels: number;
  sizeSmallLabels: number;
}

export const colorRangeGeneral: Array<IColorRange> = [
  {
    start: '#5DBEDD',
    end: '#14679C',
  },
  {
    start: '#DCA450',
    end: '#C16D15',
  },
  {
    start: '#77BFB2',
    end: '#008470',
  },
  {
    start: '#F27663',
    end: '#DE3228',
  },
  {
    start: '#E87BB7',
    end: '#C1046C',
  },
  {
    start: '#C7E271',
    end: '#90BA1E',
  },
  {
    start: '#7971B2',
    end: '#312783',
  },
  {
    start: '#F7DD8D',
    end: '#EBC000',
  },
  {
    start: '#6AD6DD',
    end: '#00A4AE',
  },
  {
    start: '#DD73A5',
    end: '#A11C55',
  },
  {
    start: '#C4AED6',
    end: '#82549E',
  },
  {
    start: '#77CE4E',
    end: '#37960B',
  },
  {
    start: '#78CCEF',
    end: '#0070A0',
  },
  {
    start: '#ED8EA0',
    end: '#CA4967',
  },
  {
    start: '#A7C699',
    end: '#6E915E',
  },
  {
    start: '#B76565',
    end: '#9F1F33',
  },
];

export const colorRangeGeneralHover: Array<string> = [
  '#5DBEDD',
  '#DCA450',
  '#77BFB2',
  '#F27663',
  '#E87BB7',
  '#C7E271',
  '#7971B2',
  '#F7DD8D',
  '#6AD6DD',
  '#DD73A5',
  '#C4AED6',
  '#77CE4E',
  '#78CCEF',
  '#ED8EA0',
  '#A7C699',
  '#B76565',
];

export const colorRangeGreenAndBlue: Array<IColorRange> = [
  {
    start: '#94BA13',
    end: '#94BA13',
  },
  {
    start: '#0098DA',
    end: '#0098DA',
  },
];

export const colorRangeGreenAndBlueHover: Array<string> = ['#94BA13', '#0098DA'];

export const colorRangeBlueAndYellow: Array<IColorRange> = [
  {
    start: '#1c5393',
    end: '#1c5393',
  },
  {
    start: '#f3b23f',
    end: '#f3b23f',
  },
];

export const colorRangeGreenAndBlueAndRedHover: Array<string> = [
  '#dd4543b3',
  '#4ba92bb3',
  '#5793f3b3',
];

export const colorRangeGreenAndBlueAndRed: Array<IColorRange> = [
  {
    start: '#dd4543',
    end: '#dd4543',
  },
  {
    start: '#4ba92b',
    end: '#4ba92b',
  },
  {
    start: '#5793f3',
    end: '#5793f3',
  },
];

export const colorRangeGreensHover: Array<string> = [
  '#039245b1',
  '#25b96cb1',
  '#33cf7cb1',
  '#5ac68db1',
  '#9bddbab1',
  '#a3cbb6b1',
];
export const colorRangeGreensDull: Array<IColorRange> = [
  {
    start: '#496a1c',
    end: '#496a1c',
  },
  {
    start: '#598322',
    end: '#598322',
  },
  {
    start: '#6fa02b',
    end: '#6fa02b',
  },
  {
    start: '#7db62f',
    end: '#7db62f',
  },
  {
    start: '#8cc63e',
    end: '#8cc63e',
  },
  {
    start: '#a0d25c',
    end: '#a0d25c',
  },
];

export const colorRangeGreensDullHover: Array<string> = [
  '#496a1cb1',
  '#598322b1',
  '#6fa02bb1',
  '#7db62fb1',
  '#8cc63eb1',
  '#a0d25cb1',
];

export const colorRangeGreens: Array<IColorRange> = [
  {
    start: '#039245',
    end: '#039245',
  },
  {
    start: '#25b96c',
    end: '#25b96c',
  },
  {
    start: '#33cf7c',
    end: '#33cf7c',
  },
  {
    start: '#5ac68d',
    end: '#5ac68d',
  },
  {
    start: '#9bddba',
    end: '#9bddba',
  },
  {
    start: '#a3cbb6',
    end: '#a3cbb6',
  },
];

export const colorRangeGreenAndPinksHover: Array<string> = [
  '#4ba92b',
  '#d73655',
  '#d85971',
  '#df6c82',
  '#e87f92',
  '#f095a5',
  '#f5abba',
];

export const colorRangeGreenAndPinks: Array<IColorRange> = [
  {
    start: '#4ba92b',
    end: '#4ba92b',
  },
  {
    start: '#d73655',
    end: '#d73655',
  },
  {
    start: '#d85971',
    end: '#d85971',
  },
  {
    start: '#df6c82',
    end: '#df6c82',
  },
  {
    start: '#e87f92',
    end: '#e87f92',
  },
  {
    start: '#f095a5',
    end: '#f095a5',
  },
  {
    start: '#f5abba',
    end: '#f5abba',
  },
];

export const colorRangeBlueAndYellowHover: Array<string> = ['#1c5393', '#f3b23f'];

export const colorRangeRedPriority: Array<IColorRange> = [
  {
    start: '#c2333f',
    end: '#c2333f',
  },
  {
    start: '#c43e4f',
    end: '#c43e4f',
  },
  {
    start: '#c74a60',
    end: '#c74a60',
  },
  {
    start: '#ca556c',
    end: '#ca556c',
  },
  {
    start: '#cf627d',
    end: '#cf627d',
  },
  {
    start: '#d16d89',
    end: '#d16d89',
  },
  {
    start: '#d47995',
    end: '#d47995',
  },
  {
    start: '#d685a3',
    end: '#d685a3',
  },
  {
    start: '#dc93b1',
    end: '#dc93b1',
  },
  {
    start: '#e1a2bf',
    end: '#e1a2bf',
  },
  {
    start: '#e7b2cd',
    end: '#e7b2cd',
  },
  {
    start: '#e9bfd6',
    end: '#e9bfd6',
  },
];

export const colorRangeRedPriorityHover: Array<string> = [
  '#c2333f',
  '#c43e4f',
  '#c74a60',
  '#ca556c',
  '#cf627d',
  '#d16d89',
  '#d47995',
  '#d685a3',
  '#dc93b1',
  '#e1a2bf',
  '#e7b2cd',
  '#e9bfd6',
];

export const colorRangeOrangePriority: Array<IColorRange> = [
  {
    start: '#f5ab54',
    end: '#f5ab54',
  },
  {
    start: '#f5aa60',
    end: '#f5aa60',
  },
  {
    start: '#f5ae6f',
    end: '#f5ae6f',
  },
  {
    start: '#f6b17c',
    end: '#f6b17c',
  },
  {
    start: '#f7b88b',
    end: '#f7b88b',
  },
  {
    start: '#f3ba95',
    end: '#f3ba95',
  },
  {
    start: '#f8c4a2',
    end: '#f8c4a2',
  },
  {
    start: '#f8cdb1',
    end: '#f8cdb1',
  },
  {
    start: '#f8d4bd',
    end: '#f8d4bd',
  },
  {
    start: '#f6dbca',
    end: '#f6dbca',
  },
  {
    start: '#f7e3d8',
    end: '#f7e3d8',
  },
  {
    start: '#f4e8e1',
    end: '#f4e8e1',
  },
];

export const colorRangeOrangePriorityHover: Array<string> = [
  '#f5ab54',
  '#f5aa60',
  '#f5ae6f',
  '#f6b17c',
  '#f7b88b',
  '#f3ba95',
  '#f8c4a2',
  '#f8cdb1',
  '#f8d4bd',
  '#f6dbca',
  '#f7e3d8',
  '#f4e8e1',
];

export const colorRangeGreenPriority: Array<IColorRange> = [
  {
    start: '#37b02f',
    end: '#37b02f',
  },
  {
    start: '#44b537',
    end: '#44b537',
  },
  {
    start: '#51b841',
    end: '#51b841',
  },
  {
    start: '#5cba4b',
    end: '#5cba4b',
  },
  {
    start: '#6bbf58',
    end: '#6bbf58',
  },
  {
    start: '#76c361',
    end: '#76c361',
  },
  {
    start: '#82c76c',
    end: '#82c76c',
  },
  {
    start: '#8ccb75',
    end: '#8ccb75',
  },
  {
    start: '#97CE95',
    end: '#97CE95',
  },
  {
    start: '#a4d78e',
    end: '#a4d78e',
  },
  {
    start: '#b1dc9c',
    end: '#b1dc9c',
  },
  {
    start: '#c0e4ac',
    end: '#c0e4ac',
  },
];

export const colorRangeGreenPriorityHover: Array<string> = [
  '#37b02f',
  '#44b537',
  '#51b841',
  '#5cba4b',
  '#6bbf58',
  '#76c361',
  '#82c76c',
  '#8ccb75',
  '#99d28',
  '#a4d78e',
  '#b1dc9c',
  '#c0e4ac',
];

export const colorRangePriority: Array<IColorRange> = [
  {
    start: '#bf2932',
    end: '#bf2932',
  },
  {
    start: '#f9af48',
    end: '#f9af48',
  },
  {
    start: '#2eac28',
    end: '#2eac28',
  },
];

export const colorRangePriorityHover: Array<string> = ['#bf2932', '#f9af48', '#2eac28'];

export const colorRangeVersus: Array<IColorRange> = [
  {
    start: '#A7C16C',
    end: '#6F9133',
  },
  {
    start: '#C06163',
    end: '#831C1F',
  },
];

export const colorRangeVersusHover = ['#A7C16C', '#C06163'];

export const colorRangeGray: Array<IColorRange> = [
  {
    start: '#BCBCBC',
    end: '#D6D6D6',
  },
];

export const colorRangeGrayHover: Array<string> = ['#BCBCBC'];

export interface ChartTextSizes {
  chartWidth: number;
  chartHeight: number;
  centerTextSize: string;
  titleTextSize: number;
  centerTextLineHeight: number;
}

export interface BarChartTextSizes {
  chartWidth: number;
  chartHeight: number;
  titleTextSize: number;
  labelsTextSize: number;
}

export interface ChartTextStyle {
  textSize: string;
  doughnutCenterPoint: number;
  textLineHeight: number;
}

export const sizesWidthAndHeightBar: Array<BarChartTextSizes> = [
  {
    chartWidth: 700,
    chartHeight: 300,
    titleTextSize: 28,
    labelsTextSize: 16,
  },
  {
    chartWidth: 400,
    chartHeight: 200,
    titleTextSize: 26,
    labelsTextSize: 14,
  },
];

export const sizesWidthAndHeightDoughnutMac: Array<ChartTextSizes> = [
  {
    chartWidth: 500,
    chartHeight: 600,
    centerTextSize: '20px',
    titleTextSize: 28,
    centerTextLineHeight: 23,
  },
  {
    chartWidth: 300,
    chartHeight: 500,
    centerTextSize: '16px',
    titleTextSize: 26,
    centerTextLineHeight: 23,
  },
  {
    chartWidth: 200,
    chartHeight: 400,
    centerTextSize: '14px',
    titleTextSize: 24,
    centerTextLineHeight: 18,
  },
  {
    chartWidth: 100,
    chartHeight: 100,
    centerTextSize: '12px',
    titleTextSize: 22,
    centerTextLineHeight: 18,
  },
];

export const sizesWidthAndHeightDoughnutLap = [
  {
    width: 500,
    height: 300,
    sizeCenterText: 14,
    sizeTextTitle: 22,
  },
  {
    width: 100,
    height: 100,
    sizeCenterText: 10,
    sizeTextTitle: 20,
  },
];
