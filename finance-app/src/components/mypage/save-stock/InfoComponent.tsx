import {
  Button,
  Card,
  Grid,
  List,
  ListItem,
  Stack,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { convertRiseAndFall } from '@/utils/NumberUtil';
import { SaveStockInfo, StockPriceInfo } from '@/components/shared/StockInfo';
import FinanceInfoDialog from '@/components/dashboard/FinanceInfoDialog';
import { TargetRateIUpdateDialog } from './TargetRateUpdateDialog';
import {
  calculateExpectedRate,
  calculateFutureValue,
  calculateTargetPrice,
} from '@/utils/FinanceCalculator';
import { ExpectedROEUpdateDialog } from './ExpectedROEUpdateDialog';
import { Delete } from '@mui/icons-material';
import { DeleteSaveStockDialog } from './DeleteSaveStockDialog';

interface InfoComponentProps {
  selectedStockInfo: SaveStockInfo;
  savedStockInfoList: SaveStockInfo[];
  setSavedStockInfoList: React.Dispatch<React.SetStateAction<SaveStockInfo[]>>;
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
    <ListItem sx={{ py: '4px' }}>
      <Typography variant="body2" mr="10px">
        {label} :
      </Typography>
      <Typography variant="body2" color={contentColor}>
        {value}
      </Typography>
    </ListItem>
  );
};

export const InfoComponent: React.FC<InfoComponentProps> = ({
  selectedStockInfo,
  savedStockInfoList,
  setSavedStockInfoList,
}) => {
  const [priceInfo, setPriceInfo] = useState<StockPriceInfo>(
    selectedStockInfo.stockPriceInfo,
  );
  const [priceColor, setPriceColor] = useState<string>('black');

  const [expectedRate, setExpectedRate] = useState<number | null>(null);
  const [targetRate, setTargetRate] = useState<number>(0);
  const [targetPrice, setTargetPrice] = useState<number | null>(null);
  const [expectedAfterROE, setExpectedAfterROE] = useState<number | null>(null);

  const [financeDialogOpen, setFinanceDialogOpen] = useState(false);
  const [isUpdateTargetRateButtonClick, setIsUpdateTargetRateButtonClick] =
    useState(false);
  const [isUpdateROEButtonClick, setIsUpdateROEButtonClick] = useState(false);
  const [isDeleteButtonClick, setIsDeleteButtonClick] = useState(false);

  const infoCardHeight = '170px';

  const changePriceColor = (difference: number) => {
    if (difference === 0) {
      setPriceColor('black');
    } else if (difference > 0) {
      setPriceColor('red');
    } else {
      setPriceColor('blue');
    }
  };

  const handleFinanceDialogClose = () => {
    setFinanceDialogOpen(false);
  };

  useEffect(() => {
    console.log(selectedStockInfo.targetRate);
    setPriceInfo(selectedStockInfo.stockPriceInfo);
    changePriceColor(selectedStockInfo.stockPriceInfo.difference);
    setExpectedRate(selectedStockInfo.expectedRate);
    setTargetRate(selectedStockInfo.targetRate);
    setTargetPrice(selectedStockInfo.targetPrice);
    setExpectedAfterROE(selectedStockInfo.afterTenYearsAverageROE);
  }, [selectedStockInfo]);

  const handleTargetRateChange = (updatedTargetRate: number) => {
    selectedStockInfo.targetRate = updatedTargetRate;
    if (expectedAfterROE !== null) {
      const afterTenYearBPS = calculateFutureValue(
        selectedStockInfo.bps,
        expectedAfterROE,
      );
      const calculatedTargetPrice = calculateTargetPrice(
        updatedTargetRate / 100,
        afterTenYearBPS,
      );
      setTargetPrice(calculatedTargetPrice);
      selectedStockInfo.targetPrice = calculatedTargetPrice;
    }
  };

  const handleExpectedROEChange = (updatedExpectedROE: number) => {
    if (updatedExpectedROE !== null) {
      selectedStockInfo.afterTenYearsAverageROE = updatedExpectedROE;

      if (priceInfo.openingPrice !== 0) {
        const afterTenYearBPS = calculateFutureValue(
          selectedStockInfo.bps,
          updatedExpectedROE,
        );
        const calculatedExpectedRate = calculateExpectedRate(
          afterTenYearBPS,
          priceInfo.openingPrice,
        );
        const calculatedTargetPrice = calculateTargetPrice(
          targetRate / 100,
          afterTenYearBPS,
        );
        setExpectedRate(calculatedExpectedRate);
        setTargetPrice(calculatedTargetPrice);
        selectedStockInfo.targetPrice = calculatedTargetPrice;
        selectedStockInfo.expectedRate = calculatedExpectedRate;
      }
    }
  };

  return (
    <Grid container spacing="15">
      <FinanceInfoDialog
        open={financeDialogOpen}
        onClose={handleFinanceDialogClose}
        stockCd={selectedStockInfo?.stockCd}
        corpCd={selectedStockInfo?.corpCd}
        stockName={selectedStockInfo?.name}
        startYear={2021}
        endYear={2023}
      />
      <TargetRateIUpdateDialog
        open={isUpdateTargetRateButtonClick}
        setOpen={setIsUpdateTargetRateButtonClick}
        targetRate={targetRate}
        setTargetRate={setTargetRate}
        corpCode={selectedStockInfo.corpCd}
        expectedROE={selectedStockInfo.afterTenYearsAverageROE}
        handleChange={handleTargetRateChange}
      />
      <ExpectedROEUpdateDialog
        open={isUpdateROEButtonClick}
        setOpen={setIsUpdateROEButtonClick}
        expectedROE={expectedAfterROE ?? 0}
        setExpectedROE={setExpectedAfterROE}
        corpCode={selectedStockInfo.corpCd}
        targetRate={selectedStockInfo.targetRate}
        handleChange={handleExpectedROEChange}
      />
      <DeleteSaveStockDialog
        open={isDeleteButtonClick}
        setOpen={setIsDeleteButtonClick}
        corpCode={selectedStockInfo.corpCd}
        savedStockInfoList={savedStockInfoList}
        setSavedStockInfoList={setSavedStockInfoList}
      />

      <Grid item xs={3}>
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
        </Card>
      </Grid>
      <Grid item xs={3}>
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
              value={convertRiseAndFall(priceInfo?.fluctuationRate ?? 0) + ' %'}
            />
            <CustomListItem
              label="전일종가"
              value={
                (priceInfo?.closingPrice
                  ? priceInfo.closingPrice - priceInfo.difference
                  : 0
                ).toLocaleString() + ' 원'
              }
            />
            <CustomListItem
              label="시가"
              value={(priceInfo?.openingPrice ?? 0).toLocaleString() + ' 원'}
            />
            <CustomListItem
              label="현재가"
              value={(priceInfo?.closingPrice ?? 0).toLocaleString() + ' 원'}
            />
          </List>
        </Card>
      </Grid>
      <Grid item xs={3} height="100%">
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
              label="예상 ROE"
              value={
                selectedStockInfo?.afterTenYearsAverageROE
                  ? `${selectedStockInfo.afterTenYearsAverageROE}`
                  : '미지원'
              }
            />
          </List>
        </Card>
      </Grid>
      <Grid item xs={3} alignContent="center">
        <Stack direction="column" spacing="10px">
          <Button
            size="small"
            color="primary"
            variant="outlined"
            onClick={() => {
              setIsUpdateTargetRateButtonClick(true);
            }}
          >
            목표수익률 변경
          </Button>
          <Button
            size="small"
            color="primary"
            variant="outlined"
            onClick={() => {
              setIsUpdateROEButtonClick(true);
            }}
          >
            예상 ROE 변경
          </Button>
          <Button
            size="small"
            color="primary"
            variant="outlined"
            onClick={() => setFinanceDialogOpen(true)}
          >
            재무정보 조회
          </Button>
          <Button
            size="small"
            color="error"
            variant="outlined"
            onClick={() => setIsDeleteButtonClick(true)}
          >
            종목 삭제
          </Button>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default InfoComponent;
