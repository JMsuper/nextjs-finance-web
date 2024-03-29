import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import FinanceInfoDialog from './FinanceInfoDialog';
import useFetch from '@/app/hooks/useFetch';
import { TextField, Container } from '@mui/material';

interface StockPriceInfo {
  closingPrice: number;
  difference: number;
  fluctuationRate: number;
  openingPrice: number;
}

interface StockInfo {
  searchTime: Date;
  name: string;
  stockCd: string;
  corpCd: string;
  market: string;
  stockPriceInfo: StockPriceInfo;
}

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
    id: 'closingPrice',
    label: '종가',
  }, {
    id: 'difference',
    label: '전일대비',
  }, {
    id: 'fluctuationRate',
    label: '등락률',
  }, {
    id: 'openingPrice',
    label: '시가',
  }
];


export default function StockInfoTable() {
  const rows: StockInfo[] = useFetch("/stockInfos")
  const [filterdRows, setFilteredRows] = React.useState<StockInfo[]>(rows);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [searched, setSearched] = React.useState<string>("");
  const [open, setOpen] = React.useState(false);
  const [selectedStock, setSelectedStock] = React.useState<StockInfo | null>(null);

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

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearched(event.target.value);
  }

  const requestSearch = (searchedVal: string): void => {
    const filterdRows = rows.filter((row) => {
      return row.name.includes(searchedVal) || row.stockCd.includes(searchedVal)
        || row.corpCd.includes(searchedVal) || row.market.includes(searchedVal);
    });
    setPage(0);
    setFilteredRows(filterdRows);
  };


  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filterdRows.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      filterdRows.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
      ),
    [filterdRows, page, rowsPerPage],
  );

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Paper
          component="form"
          sx={{ p: '2px 4px', mb: '10px', display: 'flex', alignItems: 'center', width: 300 }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="종목명 및 코드 검색"
            inputProps={{ 'aria-label': '종목명 및 코드 검색' }}
            onChange={handleSearchInputChange}
          />
          <IconButton onClick={() => requestSearch(searched)} type="button" sx={{ p: '10px' }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>


        <Container sx={{ textAlign: 'right', alignContent: 'space-evenly' }}>
          <span style={{fontSize: '12px'}}>조회 시점 : {rows[0]?.searchTime.toLocaleString()}</span>
        </Container>
      </Box>
      <Paper sx={{ width: '100%', mb: 2 }}>

        <FinanceInfoDialog open={open} onClose={handleClose} stockInfo={selectedStock} startYear={2021} endYear={2023} />

        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
          >
            <TableHead>
              <TableRow>
                {headCells.map((headCell) => (
                  <TableCell
                    key={headCell.id}
                    align='center'
                    padding='normal'
                  >
                    {headCell.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {visibleRows.map((row, index) => {
                var textColor = row.stockPriceInfo.difference > 0 ? 'red' : row.stockPriceInfo.difference === 0 ? 'black' : 'blue';
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
                    <TableCell align="center">{row.stockPriceInfo.closingPrice.toLocaleString()}</TableCell>
                    <TableCell style={{ color: textColor }} align="center">{row.stockPriceInfo.difference.toLocaleString()}</TableCell>
                    <TableCell style={{ color: textColor }} align="center">{row.stockPriceInfo.fluctuationRate}</TableCell>
                    <TableCell align="center">{row.stockPriceInfo.openingPrice.toLocaleString()}</TableCell>

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
          labelRowsPerPage='페이지당 줄수'
          showFirstButton={true}
          showLastButton={true}
        />
      </Paper>
    </Box>
  );
}