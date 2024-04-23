export interface BotoneraOption {
  nombre: string;
  id: number | string;
  filter?: string;
}

export interface ITabOption {
  id: string;
  label: string;
  total?: number;
  activeSubtitle?: boolean;
  labelSubtitle?: string;
  totalSubtitle?: number | string;
  filter?: string;
  indicators?: IIndicators[];
  disable?: boolean;
  supValue?: string;
  route?: string;
}

export interface IIndicators {
  name: string;
  color: string;
}
