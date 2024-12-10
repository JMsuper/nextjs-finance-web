'use client';

import PageContainer from '@/containers/PageContainer';
import DashboardCard from '../../../../components/shared/DashboardCard';  
import { HistoryContainer } from '@/containers/services/HistoryContainer';
const HistoryPage: React.FC = () => {
  return (
    <PageContainer title="알림 기록 조회" description="알림 기록 조회">
      <DashboardCard title="알림 기록 조회">
        <HistoryContainer />
      </DashboardCard>
    </PageContainer>
  );
};

export default HistoryPage;
