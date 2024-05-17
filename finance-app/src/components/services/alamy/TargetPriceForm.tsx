import { SaveStockInfo, StockInfo } from '@/components/shared/StockInfo';
import { StockSelector } from '@/components/shared/StockSelector';
import {
  FormControl,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
  Box,
  InputAdornment,
  Button,
} from '@mui/material';
import React, { useState } from 'react';
import SaveTargetPriceDialog from './SaveTargetPriceDialog';

const BuyOrSellList = [
  { id: 'buy', name: '매수' },
  {
    id: 'sell',
    name: '매도',
  },
];

interface TargetPriceFormProps {
  selectedStockName: string;
  savedStockInfoList: SaveStockInfo[];
  handleChange: (value: string) => void;
  checkedInfoList: number[];
}

export const TargetPriceForm: React.FC<TargetPriceFormProps> = ({
  selectedStockName,
  savedStockInfoList,
  handleChange,
  checkedInfoList,
}) => {
  const [buyOrSell, setBuyOrSell] = useState<string>('매수');
  const [targetPrice, setTargetPrice] = useState<string>('');

  const [saveButtonClick, setSaveButtonClick] = useState<boolean>(false);
  const [createTargetPriceAlarm, setCreateTargetPriceAlarm] =
    useState<ICreateTargetPriceAlarm>();

  const handlePriceChange = (inputVal: string) => {
    const value = inputVal.replace(/\D/g, '');
    const formattedValue = value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    setTargetPrice(formattedValue);
  };

  const linkSavedStockInfoTargetPrice = () => {
    const selectedStockInfo: SaveStockInfo | undefined =
      savedStockInfoList.find((stock) => stock.name === selectedStockName);
    if (!selectedStockInfo) {
      return;
    }
    const targetPrice = selectedStockInfo.targetPrice;

    handlePriceChange(targetPrice.toString());
  };

  return (
    <Box>
      {createTargetPriceAlarm && (
        <SaveTargetPriceDialog
          open={saveButtonClick}
          onClose={() => setSaveButtonClick(false)}
          prop={createTargetPriceAlarm}
        />
      )}
      <Stack direction="column" spacing="10px">
        <Stack direction="row" justifyContent="space-between">
          <StockSelector
            selectedStockName={selectedStockName}
            savedStockInfoList={savedStockInfoList}
            handleChange={handleChange}
          />
          <Button
            variant="contained"
            onClick={() => {
              if (!targetPrice) {
                alert('목표 주가를 입력해주세요.');
                return;
              }

              setSaveButtonClick(true);
              const saveCorpInfoId = savedStockInfoList.find(
                (stock) => stock.name === selectedStockName,
              )?.saveCorpInfoId;
              if (!saveCorpInfoId) {
                return;
              }
              const createTargetPriceAlarm: ICreateTargetPriceAlarm = {
                saveCorpInfoId: saveCorpInfoId,
                targetPrice: parseInt(targetPrice.replace(/,/g, '')),
                buyOrSell: buyOrSell,
                infoIndexList: checkedInfoList.sort(),
              };
              setCreateTargetPriceAlarm(createTargetPriceAlarm);
            }}
            sx={{
              marginRight: '20px',
            }}
          >
            <Typography variant="h6">등록</Typography>
          </Button>
        </Stack>

        <Stack direction="row" alignItems="center">
          <Typography variant="h6" mr="6px">
            매수/매도
          </Typography>
          <FormControl>
            <Select
              id="buy-or-sell-select"
              value={buyOrSell}
              onChange={(event) => setBuyOrSell(event.target.value as string)}
              size="small"
            >
              {BuyOrSellList.map((data) => {
                return (
                  <MenuItem key={data.id} value={data.name}>
                    {data.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Stack>
        <Typography variant="body2" color="grey">
          매수 알람 범위 : <strong>목표 주가 이하</strong>, 매도 알람 범위 :
          <strong>목표 주가 이상</strong>
        </Typography>
        <Stack direction="row" alignItems="center">
          <Typography variant="h6" mr="8px" noWrap>
            목표 주가
          </Typography>
          <TextField
            id="outlined-basic"
            value={targetPrice}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              handlePriceChange(event.target.value)
            }
            variant="outlined"
            size="small"
            InputProps={{
              endAdornment: <InputAdornment position="end">원</InputAdornment>,
            }}
          />
        </Stack>
        <Button variant="outlined" sx={{ maxWidth: '282px' }}>
          <Typography
            variant="body2"
            color="primary"
            onClick={linkSavedStockInfoTargetPrice}
          >
            관심종목 內 [투자기준가] 연동
          </Typography>
        </Button>
        <Typography variant="body2" color="grey">
          - 목표 주가 포착시, 최초 1회 알림 메일이 전송됩니다
          <br />
          (이후 동일 주가에 대한 알림은 전송되지 않습니다)
        </Typography>
      </Stack>
    </Box>
  );
};
