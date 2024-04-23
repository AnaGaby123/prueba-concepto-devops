export interface ICard {
  value: string;
  active: boolean;
  labels: Array<ILabels>;
  image?: string;
}

export interface ILabels {
  label: string;
  className?: string;
  fontSize?: string;
  fontWeight?: string | number;
  textTransform?: string;
  family?: string;
  color?: string;
  subLabel?: string;
  subColor?: string;
  indicators?: IIndicators[];
}

export interface IIndicators {
  name: string;
  color: string;
}
