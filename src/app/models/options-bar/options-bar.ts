export interface OptionBar {
  id: number | string;
  label: string;
  isEnable: boolean;
  isSelected: boolean;
  number?: number;
  showIcon?: boolean;
  icon?: string;
}
