// ConditionSwitchWithToggle.tsx
import React from 'react';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import ConditionSwitch from './ConditionSwitch';

interface ConditionSwitchWithToggleProps {
  leftTitle: string;
  rightTitle: string;
  disabled: boolean;
  checked: boolean;
  onChange: () => void;
  value: string;
  onToggleChange: (
    event: React.MouseEvent<HTMLElement>,
    newValue: string,
  ) => void;
}

const ConditionSwitchWithToggle: React.FC<ConditionSwitchWithToggleProps> = ({
  leftTitle,
  rightTitle,
  disabled,
  checked,
  onChange,
  value,
  onToggleChange,
}) => (
  <ConditionSwitch
    leftTitle={leftTitle}
    rightTitle={rightTitle}
    disabled={disabled}
    checked={checked}
    onChange={onChange}
  >
    <ToggleButtonGroup
      size="small"
      color="primary"
      value={value}
      exclusive
      onChange={onToggleChange}
      disabled={disabled}
    >
      <ToggleButton value=">"> &gt;</ToggleButton>
      <ToggleButton value="<">&lt;</ToggleButton>
    </ToggleButtonGroup>
  </ConditionSwitch>
);

export default ConditionSwitchWithToggle;
