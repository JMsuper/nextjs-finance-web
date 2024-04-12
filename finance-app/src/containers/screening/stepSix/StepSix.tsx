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
  TextField,
  Select,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Radio,
  Grid,
  Stack,
  Divider,
  FormControl,
  InputLabel,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React, { useMemo, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import ConditionSwitchWithToggle from '@/containers/screening/stepSix/ConditionSwitchWithToggle';
import ConditionSwitch from '@/containers/screening/stepSix/ConditionSwitch';
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
  },
  {
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
  },
];

type PropriateFilterType = '없음' | '적합' | '부적합';

const filterOptions = [
  '목표수익률 이상 필터링',
  '금상첨화형 눈덩이주식',
  '벤저민 그레이엄형 눈덩이주식',
  '필립 피셔형 눈덩이주식',
  '직접 설정',
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
  const rowsPerPage = 6;

  const [conditionOne, setConditionOne] = useState('>');
  const [conditionTwo, setConditionTwo] = useState('>');

  // 토글 조건 스위칭 on/off 상태값
  const [toggleConditionOne, setToggleConditionOne] = useState(true);
  const [toggleConditionTwo, setToggleConditionTwo] = useState(false);
  const [toggleConditionThree, setToggleConditionThree] = useState(false);

  // 토글 고정 on/off 상태값
  const [toggleFix, setToggleFix] = useState(true);

  // 적합/부적합 필터링 상태값
  const [propriateFilter, setPropriateFilter] =
    useState<PropriateFilterType>('없음');

  const changeConditionOne = () => {
    if (conditionOne === '>') {
      setConditionOne('<');
    } else {
      setConditionOne('>');
    }
  };

  const changeConditionTwo = () => {
    if (conditionTwo === '>') {
      setConditionTwo('<');
    } else {
      setConditionTwo('>');
    }
  };

  const changeCondition = (option: number) => {
    setToggleFix(true);
    if (option === 1) {
      setToggleConditionOne(true);
      setToggleConditionTwo(false);
      setToggleConditionThree(false);
    } else {
      setToggleConditionOne(true);
      setToggleConditionTwo(true);
      setToggleConditionThree(true);
    }

    switch (option) {
      case 2:
        setConditionOne('>');
        setConditionTwo('>');
        break;
      case 3:
        setConditionOne('<');
        setConditionTwo('>');
        break;
      case 4:
        setConditionOne('>');
        setConditionTwo('<');
        break;
      case 5:
        setToggleFix(false);
        setConditionOne('>');
        setConditionTwo('>');
        break;
      default:
        break;
    }
  };

  const handleOptionChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const value = Number(event.target.value);
    setFilterOption(value);
    changeCondition(value);
  };

  const filteredRows = useMemo(() => {
    const filterdRows = rows.filter(
      (row) => row.stockName.includes(filter) || row.stockCd.includes(filter),
    );
    if (propriateFilter === '적합') {
      return filterdRows.filter((row) => row.isPropriate);
    }
    if (propriateFilter === '부적합') {
      return filterdRows.filter((row) => !row.isPropriate);
    }
    return filterdRows;
  }, [rows, propriateFilter, filter]);

  const visibleRows = useMemo(
    () =>
      filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [filteredRows, page, rowsPerPage],
  );

  const isSuitable = (row: StockFinanceInfo) => {
    const targetRateToFloating = targetRate / 100;
    if (toggleConditionOne && row.expectedReturn < targetRateToFloating) {
      return false;
    }
    if (toggleConditionTwo) {
      if (conditionOne === '>') {
        if (row.threeYearROEAvg < targetRateToFloating) {
          return false;
        }
      } else if (row.threeYearROEAvg > targetRateToFloating) {
        return false;
      }
    }
    if (toggleConditionThree) {
      if (conditionTwo === '>') {
        if (row.bps < row.openingPrice) {
          return false;
        }
      } else if (row.bps > row.openingPrice) {
        return false;
      }
    }
    return true;
  };

  const updateIsPropriate = () => {
    rows.forEach((row) => {
      // eslint-disable-next-line no-param-reassign
      row.isPropriate = isSuitable(row);
    });
  };

  const handleButtonClick = () => {
    setIsEditing(!isEditing);
    if (isEditing !== false) {
      updateIsPropriate();
    }
  };

  const handleTargetRateChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setTargetRate(Number(event.target.value));
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Accordion sx={{ width: '70%', minHeight: '40px' }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
          sx={{ m: 0 }}
        >
          <Typography variant="body1" color="primary">
            종목 선정 조건 설정
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2} sx={{ p: 2 }} direction="row">
            <Grid item xs={4}>
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={handleButtonClick}
                sx={{ p: '2px' }}
              >
                {isEditing ? '저장' : '수정'}
              </Button>
              <RadioGroup
                value={filterOption}
                onChange={handleOptionChange}
                sx={{ pt: '10px' }}
              >
                {filterOptions.map((optionString, index) => (
                  <FormControlLabel
                    key={optionString}
                    value={index + 1}
                    control={
                      <Radio
                        size="small"
                        disabled={!isEditing}
                        sx={{ p: '4px' }}
                      />
                    }
                    label={
                      <Typography sx={{ fontSize: '0.8rem' }}>
                        {optionString}
                      </Typography>
                    }
                  />
                ))}
              </RadioGroup>
            </Grid>
            <Divider flexItem orientation="vertical" />
            <Grid item xs={6}>
              <Stack spacing={2} height="100%" justifyContent="center">
                <ConditionSwitch
                  leftTitle="목표수익률"
                  disabled={!isEditing}
                  checked={toggleConditionOne}
                  onChange={() => setToggleConditionOne(!toggleConditionOne)}
                >
                  <TextField
                    id="outlined-number"
                    type="number"
                    value={targetRate}
                    onChange={handleTargetRateChange}
                    defaultValue={targetRate}
                    size="small"
                    disabled={!isEditing || !toggleConditionOne}
                    sx={{ width: '80px' }}
                  />
                </ConditionSwitch>
                <ConditionSwitchWithToggle
                  leftTitle="예상 ROE"
                  rightTitle="목표수익률"
                  disabled={toggleFix}
                  checked={toggleConditionTwo}
                  onChange={() => setToggleConditionTwo(!toggleConditionTwo)}
                  value={conditionOne}
                  onToggleChange={changeConditionOne}
                />
                <ConditionSwitchWithToggle
                  leftTitle="현 순자산가치"
                  rightTitle="현 가격"
                  disabled={toggleFix}
                  checked={toggleConditionThree}
                  onChange={() =>
                    setToggleConditionThree(!toggleConditionThree)
                  }
                  value={conditionTwo}
                  onToggleChange={changeConditionTwo}
                />
              </Stack>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>

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
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel id="demo-select-small-label">필터</InputLabel>
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            value={propriateFilter}
            label="필터"
            onChange={(value) =>
              setPropriateFilter(value.target.value as PropriateFilterType)
            }
          >
            <MenuItem value="없음">
              <em>없음</em>
            </MenuItem>
            <MenuItem value="적합">적합</MenuItem>
            <MenuItem value="부적합">부적합</MenuItem>
          </Select>
        </FormControl>
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
                <TableCell align="center" sx={{ p: '8px' }}>
                  {row.stockName}
                </TableCell>
                <TableCell align="center" sx={{ p: '8px' }}>
                  {row.stockCd}
                </TableCell>
                <TableCell align="center" sx={{ p: '8px' }}>
                  {row.threeYearROEAvg.toLocaleString()}
                </TableCell>
                <TableCell align="center" sx={{ p: '8px' }}>
                  {row.bps.toLocaleString()}
                </TableCell>
                <TableCell align="center" sx={{ p: '8px' }}>
                  {row.openingPrice.toLocaleString()} 원
                </TableCell>
                <TableCell align="center" sx={{ p: '8px' }}>
                  {(row.expectedReturn * 100).toFixed(2)} %
                </TableCell>
                <TableCell align="center" sx={{ p: '8px' }}>
                  {row.isPropriate ? '적합' : '부적합'}
                </TableCell>
                <TableCell align="center" sx={{ p: '8px' }}>
                  <Button
                    size="small"
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      /* Add your button logic here */
                    }}
                  >
                    저장
                  </Button>
                </TableCell>
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

export default StepSix;
