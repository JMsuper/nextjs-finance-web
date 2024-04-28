'use client';

import * as React from 'react';
import SearchBar from '@/components/SearchBar';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Container, List, ListItem, Typography } from '@mui/material';
import FinanceInfoDialog from './FinanceInfoDialog';
import { convertRiseAndFall, formatDate } from '@/utils/NumberUtil';
import { SaveStockButton } from '../shared/SaveStockButton';
import { StockInfo } from '../shared/StockInfo';

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
    id: 'corpCd',
    label: '전자공시 기업코드',
  },
  {
    id: 'market',
    label: '시장',
  },
  {
    id: 'difference',
    label: '전일대비',
  },
  {
    id: 'fluctuationRate',
    label: '등락률',
  },
  {
    id: 'yesterdayClosingPrice',
    label: '전일종가',
  },
  {
    id: 'openingPrice',
    label: '시가',
  },
  {
    id: 'currrentPrice',
    label: '현재가',
  },
  {
    id: 'saveStock',
    label: '관심종목 등록',
  },
];

interface StockInfoTableProps {
  rows: StockInfo[];
}

const StockInfoTable: React.FC<StockInfoTableProps> = ({ rows }) => {
  const [filterdRows, setFilteredRows] = React.useState<StockInfo[]>(rows);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  // const [searched, setSearched] = React.useState<string>('');
  const [open, setOpen] = React.useState(false);
  const [selectedStock, setSelectedStock] = React.useState<StockInfo | null>(
    null,
  );

  const handleClickOpen = (stockInfo: StockInfo) => {
    setSelectedStock(stockInfo);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    setFilteredRows(rows);
  }, [rows]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const requestSearch = (searchedVal: string): void => {
    const tempRows = rows.filter(
      (row) =>
        row.name.includes(searchedVal) ||
        row.stockCd.includes(searchedVal) ||
        row.corpCd.includes(searchedVal) ||
        row.market.includes(searchedVal),
    );
    setPage(0);
    setFilteredRows(tempRows);
  };

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const searchValue = event.target.value;
    requestSearch(searchValue);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filterdRows.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      filterdRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [filterdRows, page, rowsPerPage],
  );

  return (
    <Box sx={{ width: '100%' }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <SearchBar handleSearchInputChange={handleSearchInputChange} />
        <List>
          <ListItem>
            <Typography variant="body2" color="initial">
              종목을 클릭하여 재무정보를 확인하세요
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body2" color="initial">
              🕒 {rows[0]?.searchTime && formatDate(rows[0].searchTime)} 기준
            </Typography>
          </ListItem>
        </List>
      </Box>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <FinanceInfoDialog
          open={open}
          onClose={handleClose}
          corpCd={selectedStock?.corpCd}
          stockCd={selectedStock?.stockCd}
          stockName={selectedStock?.name}
          startYear={2021}
          endYear={2023}
        />

        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
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
                let textColor;

                if (row.stockPriceInfo.difference === 0) {
                  textColor = 'black';
                } else if (row.stockPriceInfo.difference > 0) {
                  textColor = 'red';
                } else {
                  textColor = 'blue';
                }

                return (
                  <TableRow
                    hover
                    key={row.stockCd}
                    sx={{ cursor: 'pointer' }}
                    onClick={() => handleClickOpen(row)}
                  >
                    <TableCell align="center">{row.name}</TableCell>
                    <TableCell align="center">{row.stockCd}</TableCell>
                    <TableCell align="center">{row.corpCd}</TableCell>
                    <TableCell align="center">{row.market}</TableCell>

                    {/* 거래중지 종목에 대해서는 주가를 제공하지 않음 */}
                    {row.stockPriceInfo.openingPrice === 0 ? (
                      <>
                        <TableCell align="center">-</TableCell>
                        <TableCell align="center">-</TableCell>
                        <TableCell align="center">-</TableCell>
                        <TableCell align="center">-</TableCell>
                        <TableCell align="center">-</TableCell>
                      </>
                    ) : (
                      <>
                        <TableCell style={{ color: textColor }} align="center">
                          {convertRiseAndFall(row.stockPriceInfo.difference)}
                        </TableCell>
                        <TableCell style={{ color: textColor }} align="center">
                          {convertRiseAndFall(
                            row.stockPriceInfo.fluctuationRate,
                          )}{' '}
                          %
                        </TableCell>
                        <TableCell align="center">
                          {(
                            row.stockPriceInfo.closingPrice -
                            row.stockPriceInfo.difference
                          ).toLocaleString()}{' '}
                          원
                        </TableCell>
                        <TableCell align="center">
                          {row.stockPriceInfo.openingPrice.toLocaleString()} 원
                        </TableCell>
                        <TableCell align="center">
                          {row.stockPriceInfo.closingPrice.toLocaleString()} 원
                        </TableCell>
                        <TableCell align="center">
                          <SaveStockButton
                            corpCode={row.corpCd}
                            stockName={row.name}
                          />
                        </TableCell>
                      </>
                    )}
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={7} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 50, 100]}
          component="div"
          count={filterdRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="페이지당 줄수"
          showFirstButton
          showLastButton
        />
      </Paper>
    </Box>
  );
};

export default StockInfoTable;
