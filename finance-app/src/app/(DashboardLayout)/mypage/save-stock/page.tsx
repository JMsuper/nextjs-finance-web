'use client';

import PageContainer from '@/containers/PageContainer';
import Typography from '@mui/material/Typography';
import DashboardCard from '../../components/shared/DashboardCard';
import { SaveStockPage } from '@/components/mypage/SaveStockPage';
import useFetch from '@/hooks/useFetch';
import Config from '@/configs/config.export';
import { StockInfo } from '@/components/shared/StockInfo';
import { useEffect, useState } from 'react';
const SearchSaveStockPage: React.FC = () => {
  const [savedStockInfoList, setSavedStockInfoList] = useState<StockInfo[]>([]);

  useEffect(() => {
    console.log('useEffect');
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

  return (
    <PageContainer title="관심종목" description="관심종목">
      <DashboardCard title="관심종목">
        <SaveStockPage savedStockInfoList={savedStockInfoList} />
      </DashboardCard>
    </PageContainer>
  );
};

export default SearchSaveStockPage;
