'use client';

import PageContainer from '@/containers/PageContainer';
import Typography from '@mui/material/Typography';
import DashboardCard from '../../components/shared/DashboardCard';
import { SaveStockContainer } from '@/containers/mypage/SaveStockContainer';
import Config from '@/configs/config.export';
import { SaveStockInfo } from '@/components/shared/StockInfo';
import { useEffect, useState } from 'react';
const SearchSaveStockPage: React.FC = () => {
  const [savedStockInfoList, setSavedStockInfoList] = useState<SaveStockInfo[]>(
    [],
  );

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
      <DashboardCard>
        <SaveStockContainer savedStockInfoList={savedStockInfoList} />
      </DashboardCard>
    </PageContainer>
  );
};

export default SearchSaveStockPage;
