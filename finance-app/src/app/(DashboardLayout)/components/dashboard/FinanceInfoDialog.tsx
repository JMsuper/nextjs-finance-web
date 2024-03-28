import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import useFetch from "@/app/hooks/useFetch";
import { useEffect, useState } from "react";

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


interface StockInfo {
  name: string;
  stockCd: string;
  corpCd: string;
  market: string;
}

interface DialogProps {
  open: boolean;
  onClose: () => void;
  stockInfo?: StockInfo | null;
  startYear?: number;
  endYear?: number;
}


export default function FinanceInfoDialog({ open, onClose, stockInfo, startYear, endYear }: DialogProps) {
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState<FinanceInfo[]>([]);

  useEffect(() => {
    let isMounted = true; // 마운트 상태 추적

    const url = `/financeInfo/${stockInfo?.corpCd}?startYear=${startYear}&endYear=${endYear}`;

    const fetchData = async () => {
      try {
        const res = await fetch(url);
        const data = await res.json();
        if (isMounted) {
          data.sort((a: FinanceInfo, b: FinanceInfo) => b.year - a.year);
          setRows(data);
        }
      } catch (error) {
        console.log(error);
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
  }, [open, stockInfo, startYear, endYear]); // 의존성 배열에 url 구성 요소 추가

  if (loading) {
    return (
      <CircularProgress style={{ position: 'absolute', top: '50%', left: '50%' }} />
    );
  }

  if (rows.length === 0) {
    return (<Dialog open={open} onClose={onClose} maxWidth="xl">
      <DialogTitle>{`${stockInfo?.name}`}</DialogTitle>
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
    </Dialog>)
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth='md'>
      <DialogTitle>{`${stockInfo?.name}`}</DialogTitle>
      <DialogContent>
        <TableContainer component={Paper}>
          <Table style={{ tableLayout: 'fixed' }}>
            <TableHead>
              <TableRow>
                <TableCell style={{ width: '100px' }} align="center"></TableCell>
                {rows.map((row, index) => (
                  <TableCell style={{ width: '110px' }} key={index} align="center">{row.year} 년도</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {headCells.map((headCell) => (
                <TableRow key={headCell.id}>
                  <TableCell align="center" >{headCell.label}</TableCell>
                  {rows.map((row, index) => (
                    <TableCell align="center"  key={index}>{(row[headCell.id as keyof FinanceInfo])?.toLocaleString() || '-'}</TableCell>
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
}