import { CreateAlamy } from '@/containers/services/CreateAlamy';
import SearchAlamy from '@/containers/services/SearchAlamy';
import { SaveStockInfo } from '@/components/shared/StockInfo';
import Config from '@/configs/config.export';
import { Box, Tab, Tabs, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import apiEndPoints from '@/api/apiEndPoints';
import { useRecoilState } from 'recoil';
import { AuthState } from '@/app/authentication/auth/AuthState';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index } = props;

  return (
    <Box role="tabpanel" hidden={value !== index} sx={{ p: 3 }}>
      {value === index && children}
    </Box>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export const AlamyContainer: React.FC = () => {
  const [value, setValue] = useState(0);
  const [authState] = useRecoilState(AuthState);
  const [selectedStockName, setSelectedStockName] = useState<string>('');
  const [selectedStockInfo, setSelectedStockInfo] = useState<SaveStockInfo>();
  const [savedStockInfoList, setSavedStockInfoList] = useState<SaveStockInfo[]>(
    [],
  );
  const [savedStockInfoLength, setSavedStockInfoLength] = useState<number>(0);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    if(!authState.isLogin) return;

    const requestUrl = apiEndPoints.getSavedCorps(authState.id);
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
    setMounted(true);
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleTabChange} aria-label="basic tabs">
          <Tab label="신규 등록" {...a11yProps(0)} />
          <Tab label="등록 현황" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        {mounted ? (
          <CreateAlamy
            selectedStockName={selectedStockName}
            savedStockInfoList={savedStockInfoList}
            handleChange={handleChange}
          ></CreateAlamy>
        ) : (
          authState.isLogin ?
          <Typography>관심 종목을 등록해주세요</Typography>
          :
          <Typography>로그인 이후 사용 가능합니다</Typography>
        )}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <SearchAlamy></SearchAlamy>
      </CustomTabPanel>
    </Box>
  );
};
