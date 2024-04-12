import {
  Box,
  Checkbox,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';
import React, { useMemo, useState } from 'react';
import SearchBar from '@/components/SearchBar';
import { StockFinanceInfo } from '../../../app/(DashboardLayout)/screening/StockFinanceInfo';

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
    id: '2023-totalAsset',
    label: '총자산(2023)',
  },
  {
    id: '2023-totalLiabilities',
    label: '총부채(2023)',
  },
  {
    id: '2023-totalCapital',
    label: '자본총계(2023)',
  },
  {
    id: '2023-netIncome',
    label: '당기순이익(2023)',
  },
  {
    id: 'fsDiv',
    label: '재무제표 구분',
  },
];

interface StepOneProps {
  rows: StockFinanceInfo[];
  selected: string[];
  setSelected: React.Dispatch<React.SetStateAction<string[]>>;
}

const StepOne: React.FC<StepOneProps> = ({ rows, selected, setSelected }) => {
  const [filter, setFilter] = useState('');
  const [page, setPage] = useState(0);
  const rowsPerPage = 6;

  useMemo(() => selected.length, [selected]);

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

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.stockName);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <SearchBar
          handleSearchInputChange={(event) => setFilter(event.target.value)}
        />

        <Container sx={{ textAlign: 'right', alignContent: 'space-evenly' }}>
          <Typography
            variant="body1"
            sx={{ color: (theme) => theme.palette.primary.main }}
          >
            선택된 종목 수 : {selected.length}
          </Typography>
        </Container>
      </Box>
      <TableContainer>
        <Table sx={{ minWidth: 1000 }} aria-labelledby="tableTitle">
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  indeterminate={
                    selected.length > 0 && selected.length < rows.length
                  }
                  checked={rows.length > 0 && selected.length === rows.length}
                  onChange={handleSelectAllClick}
                />
              </TableCell>
              {headCells.map((headCell) => (
                <TableCell key={headCell.id} align="center" padding="normal">
                  {headCell.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {visibleRows.map((row) => {
              const isItemSelected = selected.indexOf(row.stockName) !== -1;
              return (
                <TableRow
                  key={row.stockName}
                  selected={isItemSelected}
                  onClick={(event) => handleClick(event, row.stockName)}
                >
                  <TableCell padding="checkbox">
                    <Checkbox checked={isItemSelected} />
                  </TableCell>
                  <TableCell align="center">{row.stockName}</TableCell>
                  <TableCell align="center">{row.stockCd}</TableCell>
                  <TableCell align="center">
                    {row.financeInfoList
                      .filter((financeInfo) => financeInfo.year === 2023)[0]
                      .totalAsset.toLocaleString()}{' '}
                    원
                  </TableCell>
                  <TableCell align="center">
                    {row.financeInfoList
                      .filter((financeInfo) => financeInfo.year === 2023)[0]
                      .totalLiabilities.toLocaleString()}{' '}
                    원
                  </TableCell>
                  <TableCell align="center">
                    {row.financeInfoList
                      .filter((financeInfo) => financeInfo.year === 2023)[0]
                      .totalCapital.toLocaleString()}{' '}
                    원
                  </TableCell>
                  <TableCell align="center">
                    {row.financeInfoList
                      .filter((financeInfo) => financeInfo.year === 2023)[0]
                      .netIncome.toLocaleString()}{' '}
                    원
                  </TableCell>
                  <TableCell align="center">
                    {row.financeInfoList[0].fsDiv}
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
        rowsPerPageOptions={[]}
        showFirstButton
        showLastButton
      />
    </Box>
  );
};

export default StepOne;
