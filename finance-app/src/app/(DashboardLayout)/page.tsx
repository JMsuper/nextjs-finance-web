import { Box } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import StockInfoTable from './components/dashboard/StockInfoTable';

const Dashboard = () => (
  <PageContainer title="Dashboard" description="this is Dashboard">
    <Box>
      <StockInfoTable />
    </Box>
  </PageContainer>
);

export default Dashboard;
