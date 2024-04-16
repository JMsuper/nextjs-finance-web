/* eslint-disable no-param-reassign */
import {
  Box,
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
  tableCellClasses,
  Zoom,
  Card,
  Typography,
} from '@mui/material';
import Config from '@/configs/config.export';
import React, { useEffect, useMemo, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { StockFinanceInfo } from '../../../app/(DashboardLayout)/screening/StockFinanceInfo';
import styled from '@emotion/styled';

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

  useEffect(() => {
    setIsCalculated(false);
  }, [rows]);

  const filteredRows = useMemo(
    () =>
      rows.filter(
        (row) => row.stockName.includes(filter) || row.stockCd.includes(filter),
      ),
    [rows, filter],
  );

  const visibleRows = useMemo(
    () =>
      filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [filteredRows, page, rowsPerPage],
  );

  const calculateExpectedReturn = (stock: StockFinanceInfo) => {
    const { openingPrice } = stock;

    if (openingPrice === undefined || openingPrice === 0) {
      return 0;
    }
    return (stock.tenYearFutureValue / openingPrice) ** (1 / 10) - 1;
  };

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

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const CustomTableCell = styled(TableCell)(() => ({
    [`&.${tableCellClasses.body}`]: {
      textAlign: 'center',
      paddingTop: '9px',
      paddingBottom: '9px',
    },
  }));

  return (
    <Box sx={{ width: '100%' }}>
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
            {visibleRows.map((row) => (
              <TableRow key={row.stockName}>
                <CustomTableCell>{row.stockName}</CustomTableCell>
                <CustomTableCell>{row.stockCd}</CustomTableCell>
                <CustomTableCell>
                  {row.threeYearROEAvg.toLocaleString()}
                </CustomTableCell>
                <CustomTableCell>{row.bps.toLocaleString()}</CustomTableCell>
                <CustomTableCell>
                  {row.tenYearFutureValue.toLocaleString()}
                </CustomTableCell>
                <CustomTableCell>
                  {row.openingPrice.toLocaleString()} 원
                </CustomTableCell>
                <CustomTableCell>
                  <Zoom in={isCalculated}>
                    <Card sx={{ py: '5px', my: '0' }}>
                      <Typography variant="subtitle1" color="blue">
                        {row.expectedReturn
                          ? (row.expectedReturn * 100).toFixed(2)
                          : 0}{' '}
                        %
                      </Typography>
                    </Card>
                  </Zoom>
                </CustomTableCell>
              </TableRow>
            ))}
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
        showFirstButton
        showLastButton
      />
    </Box>
  );
};

export default StepFive;
