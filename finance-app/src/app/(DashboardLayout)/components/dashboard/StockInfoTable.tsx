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
import { IconButton, InputBase, TextField } from '@mui/material';
import useFetch from '@/app/hooks/useFetch';


interface StockInfo {
  id: number;
  name: string;
  stockCd: string;
  corpCd: string;
  market: string;
}

interface HeadCell {
  id: keyof StockInfo;
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
    label: '기업코드',
  },
  {
    id: 'market',
    label: '시장',
  }
];


export default function StockInfoTable() {
  const rows: StockInfo[] = useFetch("http://localhost:3001/stockInfos")
  const [filterdRows, setFilteredRows] = React.useState<StockInfo[]>(rows);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [searched, setSearched] = React.useState<string>("");

  React.useEffect(() => {
    setFilteredRows(rows);
  },[rows]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchInputChange = (event : React.ChangeEvent<HTMLInputElement>) => {
    setSearched(event.target.value);
  }

  const requestSearch = (searchedVal: string): void => {
    console.log(searchedVal)
    const filterdRows = rows.filter((row) => {
      return row.name.includes(searchedVal) || row.stockCd.includes(searchedVal)
        || row.corpCd.includes(searchedVal) || row.market.includes(searchedVal);
    });
    console.log(filterdRows);
    setFilteredRows(filterdRows);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

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
      <Paper
        component="form"
        sx={{ p: '2px 4px', mb: '10px', display: 'flex', alignItems: 'center', width: 300 }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="종목명 및 코드 검색"
          inputProps={{ 'aria-label': '목명 및 코드 검색' }}
          onChange={handleSearchInputChange}
        />
        <IconButton onClick={() => requestSearch(searched)} type="button" sx={{ p: '10px' }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>
      <Paper sx={{ width: '100%', mb: 2 }}>

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
                return (
                  <TableRow
                    hover
                    key={row.id}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell align="center">{row.name}</TableCell>
                    <TableCell align="center">{row.stockCd}</TableCell>
                    <TableCell align="center">{row.corpCd}</TableCell>
                    <TableCell align="center">{row.market}</TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 50, 100]}
          component="div"
          count={rows.length}
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