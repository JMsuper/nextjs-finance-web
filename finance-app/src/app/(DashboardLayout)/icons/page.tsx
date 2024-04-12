'use client';

import PageContainer from '@/containers/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';

const Icons = () => (
  <PageContainer title="Icons" description="this is Icons">
    <DashboardCard title="Icons">
      <iframe
        src="https://tabler-icons.io/"
        title="Inline Frame Example"
        frameBorder={0}
        width="100%"
        height="650"
      />
    </DashboardCard>
  </PageContainer>
);

export default Icons;
