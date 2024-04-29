import {
  Box,
  Divider,
  FormControl,
  MenuItem,
  Select,
  Stack,
  Typography,
} from '@mui/material';
import { SaveStockInfo } from '../../components/shared/StockInfo';
import { useEffect, useState } from 'react';
import { formatDate } from '@/utils/NumberUtil';
import InfoComponent from '@/components/mypage/save-stock/InfoComponent';
import MemoComponent, {
  IMemo,
} from '@/components/mypage/save-stock/MemoComponent';
import ReportTable from '@/components/mypage/save-stock/ReportTable';

interface ISaveStockContainer {
  savedStockInfoList: SaveStockInfo[];
}

const memoList: IMemo[] = [
  {
    id: 1,
    title: 'test',
    content: 'test content',
  },
  {
    id: 2,
    title: 'test2',
    content: 'test content2',
  },
];

export const SaveStockContainer: React.FC<ISaveStockContainer> = ({
  savedStockInfoList,
}) => {
  const [selectedStockName, setSelectedStockName] = useState<string>('');
  const [selectedStockInfo, setSelectedStockInfo] = useState<SaveStockInfo>();

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
    setSelectedStockInfo(stockInfo);
  };

  return (
    <Box minWidth="1000px">
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
              size="small"
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
      <Divider sx={{ mt: '10px', mb: '20px' }} />
      {!selectedStockInfo ? (
        <Typography variant="body1">
          저장된 종목이 없습니다. <br />
          '주식 상장사 검색'과 '종목 스크리닝' 에서 종목을 저장할 수 있습니다.
        </Typography>
      ) : (
        <Box>
          <InfoComponent selectedStockInfo={selectedStockInfo}></InfoComponent>
          <Divider sx={{ my: '20px' }} />
          <ReportTable reportList={selectedStockInfo.reportList} />
          <Divider sx={{ my: '20px' }} />
          {/* <MemoComponent
            memo={memoList[0]}
            onEdit={() => {}}
            onDelete={() => {}}
          ></MemoComponent> */}
        </Box>
      )}
    </Box>
  );
};
