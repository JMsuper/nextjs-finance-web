import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, DialogActions, Dialog, DialogTitle, DialogContent, DialogContentText, Button } from '@mui/material';
import { useState } from 'react';

interface IAlarmHistory {
  id: number;
  type: string;
  stockName: string;
  message: string;
  timestamp: string;
}

const dummyData: IAlarmHistory[] = [
  {
    id: 1,
    type: '공시알림',
    stockName: '삼성전자',
    message: '신규 공시가 등록되었습니다: 분기보고서',
    timestamp: '2024-01-15 09:30:00'
  },
  {
    id: 2, 
    type: '정기주가알림',
    stockName: 'LG전자',
    message: '현재 주가: 95,000원',
    timestamp: '2024-01-15 10:00:00'
  },
  {
    id: 3,
    type: '목표가알림',
    stockName: 'SK하이닉스',
    message: '목표가 도달: 130,000원',
    timestamp: '2024-01-15 11:15:00'
  },
  {
    id: 4,
    type: '공시알림',
    stockName: '현대자동차',
    message: '신규 공시가 등록되었습니다: 수시공시',
    timestamp: '2024-01-15 13:20:00'
  },
  {
    id: 5,
    type: '정기주가알림',
    stockName: '카카오',
    message: '현재 주가: 55,000원',
    timestamp: '2024-01-15 14:00:00'
  },
  {
    id: 6,
    type: '목표가알림',
    stockName: 'NAVER',
    message: '목표가 도달: 220,000원',
    timestamp: '2024-01-15 14:30:00'
  },
  {
    id: 7,
    type: '공시알림',
    stockName: '포스코',
    message: '신규 공시가 등록되었습니다: 실적공시',
    timestamp: '2024-01-15 15:10:00'
  },
  {
    id: 8,
    type: '정기주가알림',
    stockName: '삼성바이오로직스',
    message: '현재 주가: 850,000원',
    timestamp: '2024-01-16 09:00:00'
  },
  {
    id: 9,
    type: '목표가알림',
    stockName: '셀트리온',
    message: '목표가 도달: 180,000원',
    timestamp: '2024-01-16 10:20:00'
  },
  {
    id: 10,
    type: '공시알림',
    stockName: 'LG화학',
    message: '신규 공시가 등록되었습니다: 지분공시',
    timestamp: '2024-01-16 11:00:00'
  },
  {
    id: 11,
    type: '정기주가알림',
    stockName: '기아',
    message: '현재 주가: 85,000원',
    timestamp: '2024-01-16 13:00:00'
  },
  {
    id: 12,
    type: '목표가알림',
    stockName: '삼성SDI',
    message: '목표가 도달: 450,000원',
    timestamp: '2024-01-16 14:15:00'
  },
  {
    id: 13,
    type: '공시알림',
    stockName: 'SK이노베이션',
    message: '신규 공시가 등록되었습니다: 분기보고서',
    timestamp: '2024-01-16 15:30:00'
  },
  {
    id: 14,
    type: '정기주가알림',
    stockName: '현대모비스',
    message: '현재 주가: 220,000원',
    timestamp: '2024-01-17 09:30:00'
  },
  {
    id: 15,
    type: '목표가알림',
    stockName: 'KB금융',
    message: '목표가 도달: 65,000원',
    timestamp: '2024-01-17 10:45:00'
  },
  {
    id: 16,
    type: '공시알림',
    stockName: '신한지주',
    message: '신규 공시가 등록되었습니다: 수시공시',
    timestamp: '2024-01-17 11:20:00'
  },
  {
    id: 17,
    type: '정기주가알림',
    stockName: '하나금융지주',
    message: '현재 주가: 45,000원',
    timestamp: '2024-01-17 13:40:00'
  },
  {
    id: 18,
    type: '목표가알림',
    stockName: '삼성물산',
    message: '목표가 도달: 120,000원',
    timestamp: '2024-01-17 14:50:00'
  },
  {
    id: 19,
    type: '공시알림',
    stockName: 'SK텔레콤',
    message: '신규 공시가 등록되었습니다: 실적공시',
    timestamp: '2024-01-17 15:15:00'
  },
  {
    id: 20,
    type: '정기주가알림',
    stockName: 'KT',
    message: '현재 주가: 32,000원',
    timestamp: '2024-01-17 15:45:00'
  },
  {
    id: 21,
    type: '목표가알림',
    stockName: 'LG생활건강',
    message: '목표가 도달: 900,000원',
    timestamp: '2024-01-18 09:15:00'
  },
  {
    id: 22,
    type: '공시알림',
    stockName: '아모레퍼시픽',
    message: '신규 공시가 등록되었습니다: 지분공시',
    timestamp: '2024-01-18 10:30:00'
  },
  {
    id: 23,
    type: '정기주가알림',
    stockName: '한국전력',
    message: '현재 주가: 19,850원',
    timestamp: '2024-01-18 11:45:00'
  }
];

export const HistoryContainer: React.FC = () => {
  const [filterType, setFilterType] = useState<string>('all');
  const [filteredData, setFilteredData] = useState<IAlarmHistory[]>(dummyData);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleFilterChange = (event: SelectChangeEvent) => {
    const selectedType = event.target.value;
    setFilterType(selectedType);
    setPage(0);
    
    if (selectedType === 'all') {
      setFilteredData(dummyData);
    } else {
      const filtered = dummyData.filter(item => item.type === selectedType);
      setFilteredData(filtered);
    }
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<IAlarmHistory | null>(null);

  const handleDelete = (row: IAlarmHistory) => {
    setSelectedRow(row);
    setDeleteDialogOpen(true);
  };

  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
  };

  const handleDeleteConfirm = () => {
    if (selectedRow) {
      // Here you can make a fake API call to delete the selected row
      // Once the deletion is successful, you can show a success notification
      // For now, let's just log the deletion
      console.log('Deleted row:', selectedRow);
      setDeleteDialogOpen(false);
    }
  };

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>알림 유형</InputLabel>
          <Select
            value={filterType}
            label="알림 유형"
            onChange={handleFilterChange}
          >
            <MenuItem value="all">전체</MenuItem>
            <MenuItem value="공시알림">공시알림</MenuItem>
            <MenuItem value="정기주가알림">정기주가알림</MenuItem>
            <MenuItem value="목표가알림">목표가알림</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box sx={{ width: '100%' }}>
        {filteredData.length > 0 ? (
          <Paper>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>알림 유형</TableCell>
                    <TableCell>종목명</TableCell>
                    <TableCell>알림 내용</TableCell>
                    <TableCell>발생 시간</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredData
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => (
                      <TableRow key={row.id}>
                        <TableCell sx={{ fontSize: '0.85em' }}>{row.type}</TableCell>
                        <TableCell sx={{ fontSize: '0.85em' }}>{row.stockName}</TableCell>
                        <TableCell sx={{ fontSize: '0.85em' }}>{row.message}</TableCell>
                        <TableCell sx={{ fontSize: '0.85em' }}>{row.timestamp}</TableCell>
                        <TableCell>
                          <Button onClick={() => handleDelete(row)}>삭제</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 20]}
              component="div"
              count={filteredData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              labelRowsPerPage="페이지당 행 수:"
            />
          </Paper>
        ) : (
          <Typography>알림 기록이 없습니다.</Typography>
        )}
      </Box>

      <Dialog open={deleteDialogOpen} onClose={handleDeleteDialogClose}>
        <DialogTitle>알림 삭제</DialogTitle>
        <DialogContent>
          <DialogContentText>
            선택한 알림을 삭제하시겠습니까?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose} color="primary">
            취소
          </Button>
          <Button onClick={handleDeleteConfirm} color="primary">
            삭제
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
