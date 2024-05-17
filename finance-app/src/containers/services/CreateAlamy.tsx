import {
  Box,
  TextField,
  ToggleButtonGroup,
  ToggleButton,
  Divider,
  Grid,
  useTheme,
  useMediaQuery,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Checkbox,
  ListItemText,
  Stack,
  Button,
} from '@mui/material';
import React from 'react';
import { TargetPriceForm } from '../../components/services/alamy/TargetPriceForm';
import { PriceAlarmForm } from '../../components/services/alamy/PriceAlarmForm';
import { AlarmInfoList } from '@/utils/DomainInfo';

interface CreateAlamyProps {
  selectedStockName: string;
  savedStockInfoList: any[];
  handleChange: (value: string) => void;
}

const CustomTextField: React.FC = () => {
  return (
    <TextField
      id="outlined-basic"
      value={123}
      onChange={() => {}}
      variant="outlined"
      size="small"
    />
  );
};

export const CreateAlamy: React.FC<CreateAlamyProps> = ({
  selectedStockName,
  savedStockInfoList,
  handleChange,
}) => {
  const [alarmType, setAlarmType] = React.useState('목표가 포착');
  const theme = useTheme();
  const matchesMD = useMediaQuery(theme.breakpoints.up('md'));
  const [checkedInfo, setCheckedInfo] = React.useState([0]);

  const handleToggle = (value: number) => () => {
    const currentIndex = checkedInfo.indexOf(value);
    const newChecked = [...checkedInfo];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setCheckedInfo(newChecked);
  };

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

      <Grid container spacing={3}>
        <Grid item xs={12} md={5.9}>
          {alarmType === '목표가 포착' ? (
            <TargetPriceForm
              selectedStockName={selectedStockName}
              savedStockInfoList={savedStockInfoList}
              handleChange={handleChange}
              checkedInfoList={checkedInfo}
            />
          ) : (
            <PriceAlarmForm
              selectedStockName={selectedStockName}
              savedStockInfoList={savedStockInfoList}
              handleChange={handleChange}
              checkedInfoList={checkedInfo}
            />
          )}
        </Grid>
        {matchesMD ? (
          <Divider orientation="vertical" flexItem />
        ) : (
          <Grid item xs={12}>
            <Divider orientation="horizontal" flexItem />
          </Grid>
        )}

        <Grid item xs={12} md={5.9}>
          <Box>
            <Typography variant="h6">메일 첨부 정보</Typography>
            <List sx={{ width: '100%' }}>
              {[0, 1, 2].map((value) => {
                const labelId = `checkbox-list-label-${value}`;

                return (
                  <ListItem key={value} disablePadding>
                    <ListItemButton
                      role={undefined}
                      onClick={handleToggle(value)}
                      dense
                    >
                      <ListItemIcon>
                        <Checkbox
                          edge="start"
                          checked={checkedInfo.indexOf(value) !== -1}
                          tabIndex={-1}
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </ListItemIcon>
                      <ListItemText
                        id={labelId}
                        primary={`${AlarmInfoList[value]}`}
                      />
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
