import useFetch from '@/app/hooks/useFetch';
import { Box, Checkbox, Container, IconButton, InputBase, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from '@mui/material';
import React, { useMemo, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { StockFinanceInfo } from './StockFinanceInfo';

// interface FinanceInfo {
//     year: number;
//     fsDiv: string;
//     totalAsset: number;
//     totalLiabilities: number;
//     totalCapital: number;
//     netIncome: number;
// }

// interface StockFinanceInfo {
//     stockName: string
//     stockCd: string;
//     shares: number;
//     financeInfoList: FinanceInfo[];
// }

interface HeadCell {
    id: string;
    label: string;
}

const headCells: readonly HeadCell[] = [
    {
        id: 'name',
        label: '종목명',
    }, {
        id: 'stockCd',
        label: '종목코드',
    }, {
        id: '2023-totalAsset',
        label: '총자산(2023)',
    }, {
        id: '2023-totalLiabilities',
        label: '총부채(2023)',
    }, {
        id: '2023-totalCapital',
        label: '자본총계(2023)',
    }, {
        id: '2023-netIncome',
        label: '당기순이익(2023)',
    }, {
        id: 'fsDiv',
        label: '재무제표 구분',
    }
];

interface StepZeroProps {
    rows: StockFinanceInfo[];
    selected: string[];
    setSelected: React.Dispatch<React.SetStateAction<string[]>>;
}

const StepZero: React.FC<StepZeroProps> = ({ rows, selected, setSelected }) => {

    // State for selected rows, filter, page, and rows per page

    const [filter, setFilter] = useState('');
    const [page, setPage] = useState(0);
    const rowsPerPage = 6;

    const selectedRowsCount = useMemo(() => {
        return selected.length;
    }, [selected]);

    const filteredRows = useMemo(() => {
        return rows.filter(row => row.stockName.includes(filter) || row.stockCd.includes(filter));
    }, [rows, filter]);

    const visibleRows = useMemo(() => {
        return filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    }, [filteredRows, page, rowsPerPage]);


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
            <Typography variant="h6" sx={{ color: (theme) => theme.palette.primary.main }}>스크리닝 대상 종목 선정</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Paper
                    component="form"
                    sx={{ p: '2px 4px', mb: '2px', display: 'flex', alignItems: 'center', width: 300 }}
                >
                    <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="종목명 및 코드 검색"
                        inputProps={{ 'aria-label': '종목명 및 코드 검색' }}
                        onChange={event => setFilter(event.target.value)}
                    />
                    <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                        <SearchIcon />
                    </IconButton>
                </Paper>

                <Container sx={{ textAlign: 'right', alignContent: 'space-evenly' }}>
                    <Typography variant="body1" sx={{ color: (theme) => theme.palette.primary.main }}>선택된 종목 수 : {selected.length}</Typography>
                </Container>
            </Box>
            <TableContainer>
                <Table
                    sx={{ minWidth: 1000 }}
                    aria-labelledby="tableTitle"
                >
                    <TableHead>
                        <TableRow>
                            <TableCell padding="checkbox">
                                <Checkbox
                                    indeterminate={selected.length > 0 && selected.length < rows.length}
                                    checked={rows.length > 0 && selected.length === rows.length}
                                    onChange={handleSelectAllClick}
                                />
                            </TableCell>
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
                                    <TableCell align="center">{row.financeInfoList.filter((financeInfo) => financeInfo.year === 2023)[0].totalAsset.toLocaleString()} 원</TableCell>
                                    <TableCell align="center">{row.financeInfoList.filter((financeInfo) => financeInfo.year === 2023)[0].totalLiabilities.toLocaleString()} 원</TableCell>
                                    <TableCell align="center">{row.financeInfoList.filter((financeInfo) => financeInfo.year === 2023)[0].totalCapital.toLocaleString()} 원</TableCell>
                                    <TableCell align="center">{row.financeInfoList.filter((financeInfo) => financeInfo.year === 2023)[0].netIncome.toLocaleString()} 원</TableCell>
                                    <TableCell align="center">{row.financeInfoList[0].fsDiv}</TableCell>
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
                showFirstButton={true}
                showLastButton={true}
            />
        </Box>
    );
};

export default StepZero;