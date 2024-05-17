'use client';

import PageContainer from '@/containers/PageContainer';
import DashboardCard from '../../../../components/shared/DashboardCard';
import { AlamyContainer } from '@/containers/services/AlamyContainer';
const AlamyPage: React.FC = () => {
  return (
    <PageContainer title="주가 알리미" description="주가 알리미">
      <DashboardCard title="주가 알리미">
        <AlamyContainer></AlamyContainer>
      </DashboardCard>
    </PageContainer>
  );
};

export default AlamyPage;
