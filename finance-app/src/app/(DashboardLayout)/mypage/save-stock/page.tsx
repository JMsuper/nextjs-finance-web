'use client';

import PageContainer from '@/containers/PageContainer';
import DashboardCard from '../../../../components/shared/DashboardCard';
import { SaveStockContainer } from '@/containers/mypage/SaveStockContainer';
const SearchSaveStockPage: React.FC = () => {
  return (
    <PageContainer title="관심종목" description="관심종목">
      <DashboardCard>
        <SaveStockContainer />
      </DashboardCard>
    </PageContainer>
  );
};

export default SearchSaveStockPage;
