import useFetch from '@/app/hooks/useFetch';
import { Box, Checkbox, IconButton, InputBase, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Button } from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { FinanceInfo, StockFinanceInfo } from './StockFinanceInfo';

interface HeadCell {
    id: string;
    label: string;
}

const beforeCalculatedHeadCells: readonly HeadCell[] = [
    {
        id: 'name',
        label: '종목명',
    },
    {
        id: 'stockCd',
        label: '종목코드',
    }, {
        id: '2023-netIncome',
        label: '당기순이익(2023)',
    }, {
        id: '2022-totalCapital',
        label: '자본총계(2022)',
    }, {
        id: '2022-netIncome',
        label: '당기순이익(2022)',
    }, {
        id: '2021-totalCapital',
        label: '자본총계(2021)',
    }, {
        id: '2021-netIncome',
        label: '당기순이익(2021)',
    }, {
        id: '2020-totalCapital',
        label: '자본총계(2020)',
    }
];

const afterCalculatedHeadCells: readonly HeadCell[] = [
    {
        id: 'name',
        label: '종목명',
    },
    {
        id: 'stockCd',
        label: '종목코드',
    }, {
        id: '2023-ROE',
        label: 'ROE(2023)',
    }, {
        id: '2022-ROE',
        label: 'ROE(2022)',
    }, {
        id: '2021-ROE',
        label: 'ROE(2021)',
    }, {
        id: 'Avg-ROE',
        label: '3개년 ROE 평균'
    }
];

interface StepThreeProps {
    rows: StockFinanceInfo[];
}

const StepThree: React.FC<StepThreeProps> = ({ rows }) => {

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

    const calculateAllROE = () => {
        if (isCalculated) {
            alert('이미 계산되었습니다.');
            return;
        }
        alert('3개년 ROE를 계산합니다.');
        rows.forEach((stock) => {
            var threeYearROEAvg = 0;
            for (let i = 0; i < 3; i++) {
                const thisYearfinaneInfo = stock.financeInfoList[i];
                const beforeYearfinaneInfo = stock.financeInfoList[i + 1];

                const netIncome = thisYearfinaneInfo.netIncome;
                const totalCapital = beforeYearfinaneInfo.totalCapital;

                const roe = netIncome / totalCapital;
                thisYearfinaneInfo.roe = roe;
                threeYearROEAvg += roe;
            }
            threeYearROEAvg = threeYearROEAvg / 3;
            stock.threeYearROEAvg = threeYearROEAvg;
        });
        setIsCalculated(true);
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
                    onClick={() => calculateAllROE()}
                >
                    ROE 계산하기
                </Button>
            </Box>
            <TableContainer>
                <Table
                    sx={{ minWidth: 1000 }}
                    aria-labelledby="tableTitle"
                >
                    {
                        isCalculated === false ? (
                            <TableHead>
                                <TableRow>
                                    {beforeCalculatedHeadCells.map((headCell) => (
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
                        ) : (
                            <TableHead>
                                <TableRow>
                                    {afterCalculatedHeadCells.map((headCell) => (
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
                        )
                    }
                    <TableBody>
                        {visibleRows.map((row, index) => {
                            if (isCalculated === false) {
                                const netIncome_2023 = row.financeInfoList.filter((financeInfo) => financeInfo.year === 2023)[0].netIncome;
                                const totalCapital_2022 = row.financeInfoList.filter((financeInfo) => financeInfo.year === 2022)[0].totalCapital;
                                const netIncome_2022 = row.financeInfoList.filter((financeInfo) => financeInfo.year === 2022)[0].netIncome;
                                const totalCapital_2021 = row.financeInfoList.filter((financeInfo) => financeInfo.year === 2021)[0].totalCapital;
                                const netIncome_2021 = row.financeInfoList.filter((financeInfo) => financeInfo.year === 2021)[0].netIncome;
                                const totalCapital_2020 = row.financeInfoList.filter((financeInfo) => financeInfo.year === 2020)[0].totalCapital;

                                return (
                                    <TableRow
                                        key={row.stockName}
                                    >

                                        <TableCell align="center">{row.stockName}</TableCell>
                                        <TableCell align="center">{row.stockCd}</TableCell>
                                        <TableCell align="center">{netIncome_2023.toLocaleString().slice(0, -4)} 천원</TableCell>
                                        <TableCell align="center">{totalCapital_2022.toLocaleString().slice(0, -4)} 천원</TableCell>
                                        <TableCell align="center">{netIncome_2022.toLocaleString().slice(0, -4)} 천원</TableCell>
                                        <TableCell align="center">{totalCapital_2021.toLocaleString().slice(0, -4)} 천원</TableCell>
                                        <TableCell align="center">{netIncome_2021.toLocaleString().slice(0, -4)} 천원</TableCell>
                                        <TableCell align="center">{totalCapital_2020.toLocaleString().slice(0, -4)} 천원</TableCell>
                                    </TableRow>
                                );
                            } else {
                                const roe_2023 = row.financeInfoList.filter((financeInfo) => financeInfo.year === 2023)[0].roe;
                                const roe_2022 = row.financeInfoList.filter((financeInfo) => financeInfo.year === 2022)[0].roe;
                                const roe_2021 = row.financeInfoList.filter((financeInfo) => financeInfo.year === 2021)[0].roe;

                                return (
                                    <TableRow
                                        key={row.stockName}
                                    >   
                                    
                                        <TableCell align="center">{row.stockName}</TableCell>
                                        <TableCell align="center">{row.stockCd}</TableCell>
                                        
                                        <TableCell align="center">{roe_2023.toLocaleString()}</TableCell>
                                        <TableCell align="center">{roe_2022.toLocaleString()}</TableCell>
                                        <TableCell align="center">{roe_2021.toLocaleString()}</TableCell>
                                        <TableCell align="center">{row.threeYearROEAvg.toLocaleString()}</TableCell>
                                    </TableRow>
                                );
                            }
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

export default StepThree;