import {
  Box,
  Checkbox,
  IconButton,
  InputBase,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Button,
} from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { StockFinanceInfo } from '../../../app/(DashboardLayout)/screening/StockFinanceInfo';

interface HeadCell {
  id: string;
  label: string;
}

interface ResponseData {
  searchTime: string;
  openingPriceMap: Map<string, number>;
}

const headCells: readonly HeadCell[] = [
  {
    id: 'name',
    label: '종목명',
  },
  {
    id: 'stockCd',
    label: '종목코드',
  },
  {
    id: 'threeYearROEAvg',
    label: '3개년 ROE 평균',
  },
  {
    id: 'BPS',
    label: '주당순자산 (BPS)',
  },
  {
    id: '10Yr-Future-Value',
    label: '10년 후 주당순자산 가치',
  },
  {
    id: 'openingPrice',
    label: '시가',
  },
  {
    id: 'Expected-Return',
    label: '기대수익률',
  },
];

interface StepFiveProps {
  rows: StockFinanceInfo[];
}

const StepFive: React.FC<StepFiveProps> = ({ rows }) => {
  const [filter, setFilter] = useState('');
  const [page, setPage] = useState(0);
  const [isCalculated, setIsCalculated] = useState(false);
  const rowsPerPage = 6;

  const [searchTime, setSearchTime] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    const stockCodeList = rows.map((row) => row.stockCd);

    const url = '/screening/step5';
    const body = JSON.stringify({ stockCodeList });
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body,
    };

    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: ResponseData = await response.json();
    data.openingPriceMap = new Map(Object.entries(data.openingPriceMap));
    setSearchTime(data.searchTime);

    rows.forEach((stock) => {
      const openingPrice: number | undefined = data.openingPriceMap.get(
        stock.stockCd,
      );
      if (openingPrice !== undefined) {
        stock.openingPrice = openingPrice;
      }
    });

    setIsLoading(false);
  };

  useEffect(() => {
    if (rows[0].openingPrice === undefined) {
      fetchData().catch((error) => console.error(error));
    } else {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    setIsCalculated(false);
  }, [rows]);

  const filteredRows = useMemo(() => {
    return rows.filter(
      (row) => row.stockName.includes(filter) || row.stockCd.includes(filter),
    );
  }, [rows, filter]);

  const visibleRows = useMemo(() => {
    return filteredRows.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage,
    );
  }, [filteredRows, page, rowsPerPage]);

  const calculateAllFutureValue = () => {
    if (isCalculated) {
      alert('이미 계산되었습니다.');
      return;
    }
    alert('기대수익률을 계산합니다.');
    rows.forEach((stock) => {
      stock.expectedReturn = calculateExpectedReturn(stock);
    });
    setIsCalculated(true);
  };

  const calculateExpectedReturn = (stock: StockFinanceInfo) => {
    const openingPrice = stock.openingPrice;

    if (openingPrice === undefined || openingPrice === 0) {
      return 0;
    }
    return (stock.tenYearFutureValue / openingPrice) ** (1 / 10) - 1;
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <Box sx={{ width: '100%' }}>
      <div>
        - 현재의 주가를 대입해 기대수익률을 산정한다.<br></br>- 기대수익률 =
        (10√(‘10년 후 주당순자산가치’ / ‘현재의 주가’)) - 1<br></br>- 산정된
        기대수익률이 연 목표수익률을 초과하면 매수한다
      </div>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Paper
          component="form"
          sx={{
            p: '2px 4px',
            mb: '10px',
            display: 'flex',
            alignItems: 'center',
            width: 300,
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="종목명 및 코드 검색"
            inputProps={{ 'aria-label': '종목명 및 코드 검색' }}
            onChange={(event) => setFilter(event.target.value)}
          />
          <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>
        <Button
          color="primary"
          variant="contained"
          onClick={() => calculateAllFutureValue()}
        >
          기대수익률 계산
        </Button>
      </Box>
      조회시점 : {searchTime}
      <TableContainer>
        <Table sx={{ minWidth: 1000 }} aria-labelledby="tableTitle">
          <TableHead>
            <TableRow>
              {headCells.map((headCell) => (
                <TableCell key={headCell.id} align="center" padding="normal">
                  {headCell.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {visibleRows.map((row, index) => {
              return (
                <TableRow key={row.stockName}>
                  <TableCell align="center">{row.stockName}</TableCell>
                  <TableCell align="center">{row.stockCd}</TableCell>
                  <TableCell align="center">
                    {row.threeYearROEAvg.toLocaleString()}
                  </TableCell>
                  <TableCell align="center">
                    {row.bps.toLocaleString()}
                  </TableCell>
                  <TableCell align="center">
                    {row.tenYearFutureValue.toLocaleString()}
                  </TableCell>
                  <TableCell align="center">
                    {row.openingPrice.toLocaleString()} 원
                  </TableCell>
                  <TableCell align="center">
                    {row.expectedReturn
                      ? (row.expectedReturn * 100).toFixed(2)
                      : 0}{' '}
                    %
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={filteredRows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        labelRowsPerPage="페이지당 줄수"
        rowsPerPageOptions={[]}
        showFirstButton={true}
        showLastButton={true}
      />
    </Box>
  );
};

export default StepFive;
