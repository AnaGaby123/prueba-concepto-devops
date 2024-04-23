export interface DropListOption {
  value: string;
  label: string;
  labelKey?: string;
  labelColor?: string;
  labelColors?: Array<string>;
  labelConcat?: string;
  labelConcatColor?: string;
  subtitle?: string;
  amount?: number;
  circleColor?: string;
  booleanValue?: boolean;
  isSelected?: boolean;
  reloadStates?: boolean;
  [key: string]: string | boolean | number | Array<string>;
}

export interface DropListOptionCustom {
  id?: string;
  key?: number;
  nombre?: string;
}

export interface IOptions {
  label: string;
  color?: string;
  size?: string;
  isShow?: boolean;
}

export interface IDropListMulti {
  value: string;
  labels: IOptions[];
  isSelected?: boolean;
}
