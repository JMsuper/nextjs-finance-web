'use client';

import { Box } from '@mui/material';
import useFetch from '@/hooks/useFetch';
import Config from '@/configs/config.export';
import StockInfoTable from '../../components/dashboard/StockInfoTable';

const SearchPage: React.FC = () => {
  const rows = useFetch(`${Config().baseUrl}/stockInfos`);

  return (
    <Box>
      <StockInfoTable rows={rows} />
    </Box>
  );
};

export default SearchPage;
