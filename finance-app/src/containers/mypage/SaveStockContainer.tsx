import { Box, Divider, Stack, Typography } from '@mui/material';
import { SaveStockInfo } from '../../components/shared/StockInfo';
import { useEffect, useState } from 'react';
import { formatDate } from '@/utils/NumberUtil';
import InfoComponent from '@/components/mypage/save-stock/InfoComponent';
import MemoComponent from '@/components/mypage/save-stock/MemoComponent';
import ReportTable from '@/components/mypage/save-stock/ReportTable';
import Config from '@/configs/config.export';
import { StockSelector } from '@/components/shared/StockSelector';

export const SaveStockContainer: React.FC = () => {
  const [selectedStockName, setSelectedStockName] = useState<string>('');
  const [selectedStockInfo, setSelectedStockInfo] = useState<SaveStockInfo>();
  const [savedStockInfoList, setSavedStockInfoList] = useState<SaveStockInfo[]>(
    [],
  );
  const [savedStockInfoLength, setSavedStockInfoLength] = useState<number>(0);

  useEffect(() => {
    const requestUrl = `${Config().baseUrl}/api/corp-info/user`;
    fetch(requestUrl, {
      method: 'GET',
      credentials: 'include',
    })
      .then((response) => {
        if (response.ok) {
          response.json().then((data) => {
            setSavedStockInfoList(data);
          });
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  useEffect(() => {
    if (savedStockInfoList.length === savedStockInfoLength) {
      return;
    }

    setSavedStockInfoLength(savedStockInfoList.length);
    if (savedStockInfoList.length > 0) {
      handleChange(savedStockInfoList[0].name);
    } else {
      handleChange('');
    }
  }, [savedStockInfoList]);

  const handleChange = (value: string) => {
    setSelectedStockName(value);

    const stockInfo: SaveStockInfo | undefined = savedStockInfoList.find(
      (stockInfo) => stockInfo.name === value,
    );
    setSelectedStockInfo(stockInfo);
  };

  return (
    <Box minWidth="1000px">
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <StockSelector
          selectedStockName={selectedStockName}
          savedStockInfoList={savedStockInfoList}
          handleChange={handleChange}
        />
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
          <InfoComponent
            selectedStockInfo={selectedStockInfo}
            savedStockInfoList={savedStockInfoList}
            setSavedStockInfoList={setSavedStockInfoList}
          ></InfoComponent>
          <Divider sx={{ my: '20px' }} />
          <ReportTable reportList={selectedStockInfo.reportList} />
          <Divider sx={{ my: '20px' }} />
          <MemoComponent
            selectedStockInfo={selectedStockInfo}
            savedStockInfoList={savedStockInfoList}
            setSavedStockInfoList={setSavedStockInfoList}
          ></MemoComponent>
        </Box>
      )}
    </Box>
  );
};
