import { StockSelector } from '@/components/shared/StockSelector';

import {
  Checkbox,
  FormControl,
  FormControlLabel,
  Box,
  Stack,
  Typography,
  Button,
} from '@mui/material';
import { TimePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { useState } from 'react';
import SavePriceAlarmDialog from './SavePriceAlarmDialog';

const weekdayList = [
  { id: 0, name: '월' },
  { id: 1, name: '화' },
  { id: 2, name: '수' },
  { id: 3, name: '목' },
  { id: 4, name: '금' },
  { id: 5, name: '토' },
  { id: 6, name: '일' },
];

interface PriceAlarmFormProps {
  selectedStockName: string;
  savedStockInfoList: any[];
  handleChange: (value: string) => void;
  checkedInfoList: number[];
}

export const PriceAlarmForm: React.FC<PriceAlarmFormProps> = ({
  selectedStockName,
  savedStockInfoList,
  handleChange,
  checkedInfoList,
}) => {
  const [weekDayList, setWeekDayList] = useState<number[]>([]);
  const [timeValue, setTimeValue] = useState<Dayjs | null>(
    dayjs('2022-04-17T09:00'),
  );

  const [saveButtonClick, setSaveButtonClick] = useState<boolean>(false);
  const [createPriceAlarm, setCreatePriceAlarm] = useState<ICreatePriceAlarm>();

  const handleWeekdayChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = event.target;
    const parsedName = parseInt(name);

    if (!weekDayList.includes(parsedName)) {
      setWeekDayList([...weekDayList, parsedName]);
    } else {
      setWeekDayList(weekDayList.filter((item) => item !== parsedName));
    }
  };

  const handleChecked = (name: number) => {
    return weekDayList.includes(name);
  };

  return (
    <Box>
      {createPriceAlarm && (
        <SavePriceAlarmDialog
          open={saveButtonClick}
          onClose={() => setSaveButtonClick(false)}
          prop={createPriceAlarm}
        />
      )}
      <Stack direction="column" spacing="10px">
        <Stack direction="row" justifyContent="space-between">
          <StockSelector
            selectedStockName={selectedStockName}
            savedStockInfoList={savedStockInfoList}
            handleChange={handleChange}
          ></StockSelector>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              if (weekDayList.length === 0) {
                alert('요일을 선택해주세요.');
                return;
              }

              setSaveButtonClick(true);
              const saveCorpInfoId = savedStockInfoList.find(
                (stock) => stock.name === selectedStockName,
              )?.saveCorpInfoId;
              if (!saveCorpInfoId) {
                return;
              }

              const createPriceAlarm: ICreatePriceAlarm = {
                saveCorpInfoId: saveCorpInfoId,
                weekDayList: weekDayList.sort(),
                time: timeValue?.format('HH:mm') || '09:00',
                infoIndexList: checkedInfoList.sort(),
              };
              setCreatePriceAlarm(createPriceAlarm);
            }}
            sx={{
              marginRight: '20px',
            }}
          >
            <Typography variant="h6">등록</Typography>
          </Button>
        </Stack>

        <FormControl>
          <Typography variant="h6">요일 선택</Typography>
          <Stack direction="row">
            {weekdayList.map((option) => (
              <FormControlLabel
                key={option.id}
                control={
                  <Checkbox
                    checked={handleChecked(option.id)}
                    onChange={handleWeekdayChange}
                    name={option.id.toString()}
                    sx={{
                      paddingX: '0px',
                    }}
                  />
                }
                label={option.name}
                sx={{
                  marginLeft: '0px',
                }}
              />
            ))}
          </Stack>
        </FormControl>
        <Typography variant="h6">알람시간 설정</Typography>
        <TimePicker
          value={timeValue}
          onChange={(newValue) => setTimeValue(newValue)}
          minTime={dayjs('2022-04-17T09:00')}
          maxTime={dayjs('2022-04-17T18:00')}
          minutesStep={10}
          ampm={false}
          skipDisabled={true}
          sx={{
            maxWidth: '200px',
          }}
        />
        <Typography variant="body2" color="grey">
          - 알람은 09:00 ~ 18:00 사이에만 설정 가능합니다.
        </Typography>
      </Stack>
    </Box>
  );
};
