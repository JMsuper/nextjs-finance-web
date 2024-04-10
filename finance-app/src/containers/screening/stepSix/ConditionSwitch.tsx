import { Paper, Switch, Typography } from '@mui/material';

interface ConditionSwitchProps {
  children: React.ReactNode;
  leftTitle: string;
  rightTitle?: string;
  disabled: boolean;
  checked: boolean;
  onChange: () => void;
}

const ConditionSwitch: React.FC<ConditionSwitchProps> = ({
  children,
  leftTitle,
  rightTitle,
  disabled,
  checked,
  onChange,
}) => (
  <Paper
    sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-start',
      width: '100%',
    }}
  >
    <Switch
      disabled={disabled}
      checked={checked}
      onChange={onChange}
      size="small"
    />
    <Typography sx={{ fontSize: '0.75rem', mr: '10px' }}>
      {leftTitle}
    </Typography>
    {children}
    {rightTitle && (
      <Typography sx={{ fontSize: '0.75rem', ml: '10px' }}>
        {rightTitle}
      </Typography>
    )}
  </Paper>
);

export default ConditionSwitch;
