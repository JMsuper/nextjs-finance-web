'use client';

import { Box } from '@mui/material';
import useFetch from '@/hooks/useFetch';
import Config from '@/configs/config.export';
import StockInfoTable from '../../components/dashboard/StockInfoTable';
import apiEndPoints from '@/api/apiEndPoints';

const SearchPage: React.FC = () => {
  const rows = useFetch(apiEndPoints.getStocks());

  return (
    <Box>
      <StockInfoTable rows={rows} />
    </Box>
  );
};

export default SearchPage;
