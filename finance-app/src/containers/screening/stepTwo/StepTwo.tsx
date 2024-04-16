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
  Zoom,
  Typography,
  Card,
  tableCellClasses,
} from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { StockFinanceInfo } from '../../../app/(DashboardLayout)/screening/StockFinanceInfo';
import styled from '@emotion/styled';

interface HeadCell {
  id: string;
  label: string;
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
    id: '2023-totalCapital',
    label: '자본총계(2023)',
  },
  {
    id: 'shares',
    label: '(현시점) 총 주식수',
  },
  {
    id: 'BPS',
    label: '주당순자산 (BPS)',
  },
];

interface StepTwoProps {
  rows: StockFinanceInfo[];
}

const StepTwo: React.FC<StepTwoProps> = ({ rows }) => {
  // const rows: StockFinanceInfo[] = useFetch('/screening/step1');

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

  const calculateBPS = (stock: StockFinanceInfo) => {
    const { totalCapital } = stock.financeInfoList.filter(
      (financeInfo) => financeInfo.year === 2023,
    )[0];
    const { shares } = stock;
    return Math.round(totalCapital / shares);
  };

  const calculateAllBPS = () => {
    if (isCalculated) {
      alert('이미 계산되었습니다.');
      return;
    }
    alert('선택된 종목들의 BPS를 계산합니다.');
    rows.forEach((stock) => {
      stock.bps = calculateBPS(stock);
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
          onClick={() => calculateAllBPS()}
        >
          BPS 계산하기
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
                <CustomTableCell>
                  <Typography variant="body2" color="initial">
                    {row.stockName}
                  </Typography>
                </CustomTableCell>
                <CustomTableCell>
                  <Typography variant="body2" color="initial">
                    {row.stockCd}
                  </Typography>
                </CustomTableCell>
                <CustomTableCell>
                  <Typography variant="body2" color="initial">
                    {row.financeInfoList
                      .filter((financeInfo) => financeInfo.year === 2023)[0]
                      .totalCapital.toLocaleString()}{' '}
                    원
                  </Typography>
                </CustomTableCell>
                <CustomTableCell>
                  <Typography variant="body2" color="initial"></Typography>
                  {row.shares.toLocaleString()} 주
                </CustomTableCell>
                <CustomTableCell>
                  <Zoom in={isCalculated}>
                    <Card sx={{ py: '5px', my: '0' }}>
                      <Typography variant="subtitle1" color="blue">
                        {row.bps ? row.bps.toLocaleString() : '?'}
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

export default StepTwo;
