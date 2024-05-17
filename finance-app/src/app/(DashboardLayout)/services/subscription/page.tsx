'use client';

import PageContainer from '@/containers/PageContainer';
import DashboardCard from '../../../../components/shared/DashboardCard';
import { ReportAlarmContainer } from '@/containers/services/ReportAlarmContainer';
const SubscriptionPage: React.FC = () => {
  return (
    <PageContainer title="신규 공시 구독" description="신규 공시 구독">
      <DashboardCard title="신규 공시 구독">
        <ReportAlarmContainer />
      </DashboardCard>
    </PageContainer>
  );
};

export default SubscriptionPage;
