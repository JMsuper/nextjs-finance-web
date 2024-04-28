import Config from '@/configs/config.export';
import useFetch from '@/hooks/useFetch';
import {
  Box,
  Card,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  List,
  ListItem,
  MenuItem,
  Select,
  Stack,
  Typography,
  Button,
  TextField,
  InputAdornment,
  OutlinedInput,
  FormHelperText,
} from '@mui/material';
import { SaveStockInfo, StockInfo, StockPriceInfo } from '../shared/StockInfo';
import { useEffect, useState } from 'react';
import { convertRiseAndFall, formatDate } from '@/utils/NumberUtil';
import FinanceInfoDialog from '../dashboard/FinanceInfoDialog';
import {
  calculateExpectedRate,
  calculateFutureValue,
  calculateTargetPrice,
} from '@/utils/FinanceCalculator';

interface ISaveStockPage {
  savedStockInfoList: SaveStockInfo[];
}

interface ICustomListItem {
  label: string;
  contentColor?: string;
  value: string | undefined;
}

const CustomListItem: React.FC<ICustomListItem> = ({
  label,
  value,
  contentColor,
}) => {
  return (
    <ListItem sx={{ py: '6px' }}>
      <Typography variant="subtitle2" mr="10px">
        {label} :
      </Typography>
      <Typography variant="body1" color={contentColor}>
        {value}
      </Typography>
    </ListItem>
  );
};

interface PriceInfo {
  difference: number;
  fluctuationRate: number;
  closingPrice: number;
  openingPrice: number;
  currentPrice: number;
}

export const SaveStockPage: React.FC<ISaveStockPage> = ({
  savedStockInfoList,
}) => {
  const [selectedStockName, setSelectedStockName] = useState<string>('');
  const [selectedStockInfo, setSelectedStockInfo] = useState<SaveStockInfo>();

  const [priceInfo, setPriceInfo] = useState<PriceInfo>();
  const [priceColor, setPriceColor] = useState<string>('black');

  const [expectedRate, setExpectedRate] = useState<number>(0);
  const [targetRate, setTargetRate] = useState<number>(0);
  const [targetPrice, setTargetPrice] = useState<number>(0);
  const [afterTenYearsAverageROE, setAfterTenYearsAverageROE] =
    useState<number>(0);

  const [financeDialogOpen, setFinanceDialogOpen] = useState(false);
  const [isUpdateButtonClick, setIsUpdateButtonClick] = useState(false);

  const infoCardHeight = '300px';

  useEffect(() => {
    if (savedStockInfoList.length > 0) {
      handleChange(savedStockInfoList[0].name);
    }
  }, [savedStockInfoList]);

  const handleChange = (value: string) => {
    setSelectedStockName(value);

    const stockInfo: SaveStockInfo | undefined = savedStockInfoList.find(
      (stockInfo) => stockInfo.name === value,
    );

    if (!stockInfo) return;

    setTargetRate(stockInfo.targetRate);
    setExpectedRate(stockInfo.expectedRate);
    setTargetPrice(stockInfo.targetPrice);
    setAfterTenYearsAverageROE(stockInfo.afterTenYearsAverageROE);

    setSelectedStockInfo(stockInfo);
    changePriceColor(stockInfo.stockPriceInfo.difference ?? 0);
    changePriceInfo(stockInfo.stockPriceInfo);
  };

  const changePriceColor = (difference: number) => {
    if (difference === 0) {
      setPriceColor('black');
    } else if (difference > 0) {
      setPriceColor('red');
    } else {
      setPriceColor('blue');
    }
  };

  const changePriceInfo = (stockPriceInfo: StockPriceInfo) => {
    const newPriceInfo = {
      difference: stockPriceInfo.difference,
      fluctuationRate: stockPriceInfo.fluctuationRate,
      closingPrice: stockPriceInfo.closingPrice - stockPriceInfo.difference,
      openingPrice: stockPriceInfo.openingPrice,
      currentPrice: stockPriceInfo.closingPrice,
    };
    setPriceInfo(newPriceInfo);
  };

  const handleFinanceDialogClose = () => {
    setFinanceDialogOpen(false);
  };

  return (
    <Box>
      <FinanceInfoDialog
        open={financeDialogOpen}
        onClose={handleFinanceDialogClose}
        stockCd={selectedStockInfo?.stockCd}
        corpCd={selectedStockInfo?.corpCd}
        stockName={selectedStockInfo?.name}
        startYear={2021}
        endYear={2023}
      />
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Stack direction="row" alignItems="center">
          <Typography variant="h6" mr="10px">
            종목 선택 :
          </Typography>
          <FormControl>
            <Select
              id="save-stock-select"
              value={selectedStockName}
              onChange={(event) => handleChange(event.target.value)}
            >
              {savedStockInfoList.map((stockInfo) => {
                return (
                  <MenuItem key={stockInfo.corpCd} value={stockInfo.name}>
                    {stockInfo.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Stack>

        <Typography variant="body2" color="initial" align="right">
          🕒{' '}
          {selectedStockInfo?.searchTime &&
            formatDate(selectedStockInfo?.searchTime)}{' '}
          기준
        </Typography>
      </Stack>
      <Divider sx={{ my: '20px' }} />
      <Grid container spacing="15">
        <Grid item xs={4}>
          <Card sx={{ height: infoCardHeight }}>
            <List>
              <Typography variant="h6" align="center" sx={{ pb: '10px' }}>
                종목정보
              </Typography>
              <CustomListItem
                label="종목코드"
                value={selectedStockInfo?.stockCd}
              />
              <CustomListItem
                label="전자공시코드"
                value={selectedStockInfo?.corpCd}
              />
              <CustomListItem label="시장" value={selectedStockInfo?.market} />
              <CustomListItem
                label="상태"
                value={
                  priceInfo?.openingPrice === 0 ? '거래중지(추정)' : '거래중'
                }
              />
              <CustomListItem
                label="BPS(23년말 기준)"
                value={
                  selectedStockInfo?.bps
                    ? selectedStockInfo.bps.toLocaleString()
                    : '미지원'
                }
              />
            </List>
            <Box
              display="flex"
              width="100%"
              alignItems="center"
              justifyContent="center"
            >
              <Button
                color="primary"
                variant="contained"
                onClick={() => setFinanceDialogOpen(true)}
              >
                재무정보 조회
              </Button>
            </Box>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card sx={{ height: infoCardHeight }}>
            <List>
              <Typography variant="h6" align="center" sx={{ pb: '10px' }}>
                주가정보
              </Typography>
              <CustomListItem
                label="전일대비"
                contentColor={priceColor}
                value={convertRiseAndFall(priceInfo?.difference ?? 0)}
              />
              <CustomListItem
                label="등락률"
                contentColor={priceColor}
                value={
                  convertRiseAndFall(priceInfo?.fluctuationRate ?? 0) + ' %'
                }
              />
              <CustomListItem
                label="전일종가"
                value={(priceInfo?.closingPrice ?? 0).toLocaleString() + ' 원'}
              />
              <CustomListItem
                label="시가"
                value={(priceInfo?.openingPrice ?? 0).toLocaleString() + ' 원'}
              />
              <CustomListItem
                label="현재가"
                value={(priceInfo?.currentPrice ?? 0).toLocaleString() + ' 원'}
              />
            </List>
          </Card>
        </Grid>
        <Grid item xs={4} height="100%">
          <Card sx={{ height: infoCardHeight }}>
            <List>
              <Typography
                variant="h6"
                align="center"
                sx={{
                  pb: '10px',
                }}
              >
                투자정보
              </Typography>

              <CustomListItem
                label="기대수익률"
                value={expectedRate ? `${expectedRate} %` : '미지원'}
              />
              <CustomListItem
                label="투자기준가"
                value={
                  targetPrice ? `${targetPrice.toLocaleString()} 원` : '미지원'
                }
              />
              <CustomListItem
                label="목표수익률"
                value={targetRate ? `${targetRate} %` : '미지원'}
              />
              <CustomListItem
                label="10년 후 예상 ROE"
                value={
                  selectedStockInfo?.afterTenYearsAverageROE
                    ? `${selectedStockInfo.afterTenYearsAverageROE}`
                    : '미지원'
                }
              />
            </List>
            <Box
              display="flex"
              width="100%"
              alignItems="center"
              justifyContent="center"
            >
              <Button
                color="primary"
                variant="contained"
                onClick={() => {
                  setIsUpdateButtonClick(!isUpdateButtonClick);
                }}
              >
                투자정보 수정
              </Button>
            </Box>
          </Card>
        </Grid>
        <Box
          display="flex"
          width="100%"
          alignItems="center"
          justifyContent="flex-end"
          marginTop="15px"
        >
          <Button color="primary" variant="contained" sx={{ mr: '15px' }}>
            종목 삭제
          </Button>
        </Box>
      </Grid>
    </Box>
  );
};
