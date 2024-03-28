import useFetch from '@/app/hooks/useFetch';
import { Box, Checkbox, IconButton, InputBase, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Button } from '@mui/material';
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
    }, {
        id: '2023-BPS',
        label: 'BPS(2023)',
    }, {
        id: '2023-netIncome',
        label: '당기순이익(2023)',
    },{
        id: '2023-totalCapital',
        label: '자본총계(2023)',
    }, {
        id: '2022-netIncome',
        label: '당기순이익(2022)',
    },{
        id: '2022-totalCapital',
        label: '자본총계(2022)',
    }, {
        id: '2021-netIncome',
        label: '당기순이익(2021)',
    },{
        id: '2021-totalCapital',
        label: '자본총계(2021)',
    }
];

interface StepTwoProps {
    rows: StockFinanceInfo[];
}

const StepOne: React.FC<StepTwoProps> = ({ rows }) => {

    const [filter, setFilter] = useState('');
    const [page, setPage] = useState(0);
    const [isCalculated, setIsCalculated] = useState(false);
    const rowsPerPage = 8;

    useEffect(() => {
        setIsCalculated(false);
    }, [rows]);

    const filteredRows = useMemo(() => {
        return rows.filter(row => row.stockName.includes(filter) || row.stockCd.includes(filter));
    }, [rows, filter]);

    const visibleRows = useMemo(() => {
        return filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    }, [filteredRows, page, rowsPerPage]);

    const calculateAllBPS = () => {
        if (isCalculated) {
            alert('이미 계산되었습니다.');
            return;
        }
        alert('3개년 ROE를 계산합니다.');
        rows.forEach((stock) => {
            stock.bps = calculateBPS(stock);
        });
        setIsCalculated(true);
    }

    const calculateBPS = (stock: StockFinanceInfo) => {
        const totalCapital = stock.financeInfoList.filter((financeInfo) => financeInfo.year === 2023)[0].totalCapital;
        const shares = stock.shares;
        return Math.round(totalCapital / shares);
    }


    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <div>
            미래가치를 측정하기 위한 ROE수익률을 예측한다<br></br>
            ROE = 금년 순이익 / 전년도 순자산<br></br>
            최근 3개년 ROE 평균을 향후 10년간의 예상 ROE 수치의 기준으로 사용한다.<br></br>
            </div>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Paper
                    component="form"
                    sx={{ p: '2px 4px', mb: '10px', display: 'flex', alignItems: 'center', width: 300 }}
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
                <Button
                    color="primary"
                    variant="contained"
                    onClick={() => calculateAllBPS()}
                >
                    BPS 계산하기
                </Button>
            </Box>
            <TableContainer>
                <Table
                    sx={{ minWidth: 1000 }}
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
                                    key={row.stockName}
                                >
                                    <TableCell align="center">{row.stockName}</TableCell>
                                    <TableCell align="center">{row.stockCd}</TableCell>
                                    <TableCell align="center">{row.financeInfoList.filter((financeInfo) => financeInfo.year === 2023)[0].totalCapital.toLocaleString()} 원</TableCell>
                                    <TableCell align="center">{row.shares.toLocaleString()} 주</TableCell>
                                    <TableCell align="center">{row.bps ? row.bps : "?"}</TableCell>

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
                labelRowsPerPage='페이지당 줄수'
                showFirstButton={true}
                showLastButton={true}
            />
        </Box>
    );
};

export default StepOne;