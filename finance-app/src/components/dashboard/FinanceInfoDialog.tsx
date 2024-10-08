import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import Config from '@/configs/config.export';
import FinanceInfoDialogToolTip from './FinanceInfoDialogToolTip';
import DartDetailLinkButton from '../shared/DartDetailLinkButton';
import {
  CurrencyScaleOption,
  convertNumberScaleWithCurrency,
} from '@/utils/NumberUtil';
import { on } from 'events';
import apiEndPoints from '@/api/apiEndPoints';

interface FinanceInfo {
  year: number;
  fsDiv: string;
  currentAsset: number;
  nonCurrentAsset: number;
  totalAsset: number;
  currentLiabilities: number;
  nonLiabilities: number;
  totalLiabilities: number;
  capital: number;
  retainedEarnings: number;
  totalCapital: number;
  revenue: number;
  operatingProfit: number;
  earningsBeforeTax: number;
  netIncome: number;
  netLoss: number;
}

const headCells = [
  { id: 'fsDiv', label: '구분' },
  { id: 'currentAsset', label: '유동자산' },
  { id: 'nonCurrentAsset', label: '비유동자산' },
  { id: 'totalAsset', label: '자산총계' },
  { id: 'currentLiabilities', label: '유동부채' },
  { id: 'nonLiabilities', label: '비유동부채' },
  { id: 'totalLiabilities', label: '부채총계' },
  { id: 'capital', label: '자본' },
  { id: 'retainedEarnings', label: '이익잉여금' },
  { id: 'totalCapital', label: '자본총계' },
  { id: 'revenue', label: '매출액' },
  { id: 'operatingProfit', label: '영업이익' },
  { id: 'earningsBeforeTax', label: '법인세차감전 순이익' },
  { id: 'netIncome', label: '당기순이익' },
  { id: 'netLoss', label: '당기순이익(손실)' },
];

interface DialogProps {
  open: boolean;
  onClose: () => void;
  stockCd?: string;
  corpCd?: string;
  stockName?: string;
  startYear: number;
  endYear: number;
}

const FinanceInfoDialog: React.FC<DialogProps> = ({
  open,
  onClose,
  stockCd,
  corpCd,
  stockName,
  startYear,
  endYear,
}: DialogProps) => {
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState<FinanceInfo[]>([]);

  useEffect(() => {
    let isMounted = true; // 마운트 상태 추적

    const url = apiEndPoints.getFinanceData(corpCd,startYear,endYear);

    const fetchData = async () => {
      try {
        const res = await fetch(url);
        const data = await res.json();
        if (isMounted) {
          data.sort((a: FinanceInfo, b: FinanceInfo) => b.year - a.year);
          setRows(data);
        }
      } catch (error) {
        setRows([]);
      } finally {
        setLoading(false);
      }
    };

    if (open) {
      setLoading(true);
      fetchData();
    }

    return () => {
      isMounted = false; // 컴포넌트 언마운트 시 상태 업데이트 방지
    };
  }, [open, startYear, endYear]); // 의존성 배열에 url 구성 요소 추가

  if (loading) {
    return (
      <CircularProgress
        style={{ position: 'absolute', top: '50%', left: '50%' }}
      />
    );
  }

  if (rows.length === 0) {
    return (
      <Dialog open={open} onClose={onClose} maxWidth="xl">
        <DialogTitle>{`${stockName}`}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            재무정보를 지원하지 않는 종목입니다.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            닫기
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle marginY="6px">
        <Stack
          direction="row"
          spacing={2}
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h6" color="initial">
            {stockName}
          </Typography>

          <DartDetailLinkButton stockCd={stockCd} />
        </Stack>
      </DialogTitle>
      <DialogContent>
        <TableContainer component={Paper}>
          <Table style={{ tableLayout: 'fixed' }}>
            <TableHead>
              <TableRow>
                <TableCell style={{ width: '100px' }} align="center" />
                {rows.map((row) => (
                  <TableCell
                    style={{ width: '110px' }}
                    key={row.year}
                    align="center"
                  >
                    {row.year} 년도
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {headCells.map((headCell) => (
                <TableRow key={headCell.id}>
                  <TableCell align="center">
                    <Tooltip title={FinanceInfoDialogToolTip[headCell.id]}>
                      <Typography variant="body2" color="Highlight">
                        {headCell.label}{' '}
                      </Typography>
                    </Tooltip>
                  </TableCell>
                  {rows.map((row) => (
                    <TableCell align="center" key={row.year + headCell.id}>
                      {headCell.id === 'fsDiv'
                        ? row[headCell.id]
                        : convertNumberScaleWithCurrency(
                            Number(row[headCell.id as keyof FinanceInfo]),
                            CurrencyScaleOption.Thousand,
                          )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          닫기
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FinanceInfoDialog;
