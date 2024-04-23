export interface IToggleSwitch {
  leftOptionText: string;
  leftOptionValue?: string;
  rightOptionText: string;
  rightOptionValue?: string;
  selected: string;
  fontSize?: string;
}

export interface IToggleSwitchOption {
  value: string;
  label: string;
}
