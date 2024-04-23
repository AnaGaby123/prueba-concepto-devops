export interface DropListOptionPqf {
  id: string;
  label: string;
  color?: string;
  subLabel?: string;
  inActive?: boolean;
  isSelected?: boolean;
  labelKey?: string;
}

export type DropListOptionsPqf = Array<DropListOptionPqf>;
