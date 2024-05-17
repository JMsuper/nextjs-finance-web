import React from 'react';
import {
  Box,
  ToggleButtonGroup,
  ToggleButton,
} from '@mui/material';
import SearchTargetPriceAlarm from '@/components/services/alamy/SearchTargetPriceAlarm';
import SearchPriceAlarm from '@/components/services/alamy/SearchPriceAlarm';


const SearchAlamy: React.FC = () => {
  const [alarmType, setAlarmType] = React.useState('목표가 포착');

  const handleToggleChange = (
    event: React.MouseEvent<HTMLElement>,
    alarmType: string,
  ) => {
    if (alarmType === null) return;
    setAlarmType(alarmType);
  };

  return (
    <Box>
      <ToggleButtonGroup
        color="primary"
        value={alarmType}
        exclusive
        onChange={handleToggleChange}
        aria-label="Platform"
        sx={{ marginBottom: '20px' }}
      >
        <ToggleButton value="목표가 포착">목표가 포착</ToggleButton>
        <ToggleButton value="주가 정기 알림">주가 정기 알림</ToggleButton>
      </ToggleButtonGroup>
      {alarmType === '목표가 포착' ? (
        <SearchTargetPriceAlarm />
      ) : (
        <SearchPriceAlarm />
      )}
    </Box>
  );
};

export default SearchAlamy;
