import useFetch from '@/app/hooks/useFetch';
import { Box, Checkbox, IconButton, InputBase, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Button, TextField, Select, MenuItem, RadioGroup, FormControlLabel, Radio, Grid, Stack, Switch, Typography, ToggleButtonGroup, ToggleButton } from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { StockFinanceInfo } from './StockFinanceInfo';
import styled from '@emotion/styled';

// 1. 목표수익률 설정
// 목표수익률 설정 시, 그 이상의 기대수익률을 가지는 종목을 필터링하여 보여줌

// 2. 금상첨화형 눈덩이주식 필터링
// 예상 ROE > 목표수익률, 현 순자산가치 > 현 가격

// 3. 벤저민 그레이엄형 눈덩이주식 필터링
// 예상 ROE < 목표수익률, 현 순자산가치 > 현 가격

// 4. 필립 피셔형 눈덩이주식 필터링
// 예상 ROE > 목표수익률, 현 순자산가치 < 현 가격


interface HeadCell {
    id: string;
    label: string;
}

interface OpeningPriceMap {
    [key: string]: number;
}

interface ResponseData {
    searchTime: string;
    openingPriceMap: OpeningPriceMap;
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
        id: 'threeYearROEAvg',
        label: '예상 ROE (3개년 ROE 평균)',
    },
    {
        id: 'BPS',
        label: '주당순자산 (BPS)',
    },
    {
        id: 'openingPrice',
        label: '시가',
    }, {
        id: 'Expected-Return',
        label: '기대수익률',
    },
    {
        id: 'isPropriate',
        label: '필터링 결과',
    },
    {
        id: 'save',
        label: '관심종목 등록',
    }
];

interface StepSixProps {
    rows: StockFinanceInfo[];
}

const StepSix: React.FC<StepSixProps> = ({ rows }) => {
    const [filter, setFilter] = useState('');
    const [page, setPage] = useState(0);
    const [isEditing, setIsEditing] = useState(false);
    const [targetRate, setTargetRate] = useState(15);
    const [filterOption, setFilterOption] = useState(1);
    const rowsPerPage = 8;

    const [conditionOne, setConditionOne] = useState(">");
    const [conditionTwo, setConditionTwo] = useState(">");

    const changeConditionOne = () => {
        if(conditionOne === ">"){
            setConditionOne("<");
        }else{
            setConditionOne(">");
        }
    };

    const changeConditionTwo = () => {
        if(conditionTwo === ">"){
            setConditionTwo("<");
        }else{
            setConditionTwo(">");
        }
    };

    const handleFilterChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setFilterOption(event.target.value as number);
        filterRows(rows);
    };

    const filterRows = (rows: StockFinanceInfo[]) => {
        switch (filterOption) {
            case 1:
                return rows.filter(row => row.threeYearROEAvg > targetRate && row.bps > row.openingPrice);
            case 2:
                return rows.filter(row => row.threeYearROEAvg < targetRate && row.bps > row.openingPrice);
            case 3:
                return rows.filter(row => row.threeYearROEAvg > targetRate && row.bps < row.openingPrice);
            // Add more cases if needed
            default:
                return rows;
        }
    };

    const filteredRows = useMemo(() => {
        return rows.filter(row => row.stockName.includes(filter) || row.stockCd.includes(filter));
    }, [rows, filter]);

    const visibleRows = useMemo(() => {
        return filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    }, [filteredRows, page, rowsPerPage]);

    const handleButtonClick = () => {
        setIsEditing(!isEditing);
    };

    const handleTargetRateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTargetRate(Number(event.target.value));
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };


    return (

        <Box sx={{ width: '100%' }}>
            <Grid container spacing={2}>
                <Grid xl={3}>
                    <Button variant="contained" color="primary" onClick={handleButtonClick}>
                        {isEditing ? 'Save' : 'Modify'}
                    </Button>
                    <RadioGroup value={filterOption} onChange={handleFilterChange}>
                        <FormControlLabel value={1} control={<Radio disabled={!isEditing} />} label="목표수익률 이상 필터링" />
                        <FormControlLabel value={2} control={<Radio disabled={!isEditing} />} label="금상첨화형 눈덩이주식" />
                        <FormControlLabel value={3} control={<Radio disabled={!isEditing} />} label="벤저민 그레이엄형 눈덩이주식" />
                        <FormControlLabel value={4} control={<Radio disabled={!isEditing} />} label="필립 피셔형 눈덩이주식" />
                        <FormControlLabel value={5} control={<Radio disabled={!isEditing} />} label="직접 설정" />
                        {/* Add more FormControlLabels if needed */}
                    </RadioGroup>
                </Grid>
                <Grid xl={9} container direction="column" justifyContent="center">
                    <Stack spacing={2}>
                        <Paper>
                            <Switch></Switch>
                            <span>목표수익률</span>
                            <TextField
                                id="outlined-number"
                                type="number"
                                defaultValue={targetRate}
                                size='small'
                            />
                        </Paper>
                        <Paper>
                            <Switch></Switch>
                            <span>예상 ROE</span>
                            <ToggleButtonGroup
                                size='small'
                                color="primary"
                                value={conditionOne}
                                exclusive
                                onChange={changeConditionOne}
                            >
                                <ToggleButton value=">"> &gt;</ToggleButton>
                                <ToggleButton value="<">&lt;</ToggleButton>
                            </ToggleButtonGroup>
                            <span>목표수익률</span>
                        </Paper>
                        <Paper>
                            <Switch></Switch>
                            <span>현 순자산가치</span>
                            <ToggleButtonGroup
                                size='small'
                                color="primary"
                                value={conditionTwo}
                                exclusive
                                onChange={changeConditionTwo}
                            >
                                <ToggleButton value=">"> &gt;</ToggleButton>
                                <ToggleButton value="<">&lt;</ToggleButton>
                            </ToggleButtonGroup>
                            <span>현 가격</span>
                        </Paper>
                    </Stack>
                </Grid>
            </Grid>


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
                                    <TableCell align="center">{row.threeYearROEAvg.toLocaleString()}</TableCell>
                                    <TableCell align="center">{row.bps.toLocaleString()}</TableCell>
                                    <TableCell align="center">{row.openingPrice.toLocaleString()} 원</TableCell>
                                    <TableCell align="center">{(row.expectedReturn * 100).toFixed(2)} %</TableCell>
                                    <TableCell align="center">{row.isPropriate ? "적합" : "부적합"}</TableCell>
                                    <TableCell align="center">
                                        <Button variant="contained" color="primary" onClick={() => {/* Add your button logic here */ }}>
                                            저장
                                        </Button>
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
                labelRowsPerPage='페이지당 줄수'
                rowsPerPageOptions={[]}
                showFirstButton={true}
                showLastButton={true}
            />
        </Box>
    );
};

export default StepSix;