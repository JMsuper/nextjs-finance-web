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
} from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { StockFinanceInfo } from './StockFinanceInfo';

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
    id: 'BPS',
    label: '주당순자산 (BPS)',
  },

  {
    id: '2023-ROE',
    label: 'ROE(2023)',
  },
  {
    id: '2022-ROE',
    label: 'ROE(2022)',
  },
  {
    id: '2021-ROE',
    label: 'ROE(2021)',
  },
  {
    id: 'Avg-ROE',
    label: '3개년 ROE 평균',
  },
  {
    id: '10Yr-Future-Value',
    label: '10년 후 주당순자산 가치',
  },
];

interface StepFourProps {
  rows: StockFinanceInfo[];
}

const StepFour: React.FC<StepFourProps> = ({ rows }) => {
  const [filter, setFilter] = useState('');
  const [page, setPage] = useState(0);
  const [isCalculated, setIsCalculated] = useState(false);
  const rowsPerPage = 8;

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

  const calculateFutureValue = (stock: StockFinanceInfo) =>
    Math.round(stock.bps * (1 + stock.threeYearROEAvg) ** 10);

  const calculateAllFutureValue = () => {
    if (isCalculated) {
      alert('이미 계산되었습니다.');
      return;
    }
    alert('10년 후 주당순자산 가치를 계산합니다.');
    rows.forEach((stock: StockFinanceInfo) => {
      stock.tenYearFutureValue = calculateFutureValue(stock);
    });
    setIsCalculated(true);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <div>
        현재 주당순자산가치에서 예상 ROE를 적용해 미래 주당순자산가치를
        산정한다.
        <br />
        10년 후 주당순자산가치 = 현재 주당순자산가치 * (1 + 예상 ROE)^10
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
          10년 후 미래가치 계산하기
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
            {visibleRows.map((row) => {
              const roe2023 = row.financeInfoList.filter(
                (financeInfo) => financeInfo.year === 2023,
              )[0].roe;
              const roe2022 = row.financeInfoList.filter(
                (financeInfo) => financeInfo.year === 2022,
              )[0].roe;
              const roe2021 = row.financeInfoList.filter(
                (financeInfo) => financeInfo.year === 2021,
              )[0].roe;

              const getDifference = (roe_x: number, roe_y: number) => {
                const difference = roe_x - roe_y;
                if (difference > 0) {
                  return (
                    <span style={{ color: 'red' }}>
                      (+{difference.toLocaleString()})
                    </span>
                  );
                }
                return (
                  <span style={{ color: 'blue' }}>
                    ({difference.toLocaleString()})
                  </span>
                );
              };

              return (
                <TableRow key={row.stockName}>
                  <TableCell align="center">{row.stockName}</TableCell>
                  <TableCell align="center">{row.stockCd}</TableCell>
                  <TableCell align="center">{row.bps}</TableCell>
                  <TableCell align="center">
                    {roe2023.toLocaleString()} {getDifference(roe2023, roe2022)}
                  </TableCell>
                  <TableCell align="center">
                    {roe2022.toLocaleString()} {getDifference(roe2022, roe2021)}
                  </TableCell>
                  <TableCell align="center">
                    {roe2021.toLocaleString()}
                  </TableCell>
                  <TableCell align="center">
                    {row.threeYearROEAvg.toLocaleString()}
                  </TableCell>
                  <TableCell align="center">
                    {row.tenYearFutureValue
                      ? row.tenYearFutureValue.toLocaleString()
                      : '?'}
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
        showFirstButton
        showLastButton
      />
    </Box>
  );
};

export default StepFour;
