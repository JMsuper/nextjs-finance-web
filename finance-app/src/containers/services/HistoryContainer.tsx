import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Chip } from '@mui/material';
import { useState, useEffect } from 'react';
import apiEndPoints from '@/api/apiEndPoints';
import { useSnackbar } from 'notistack';

interface IAlarmHistory {
  id: number;
  accountId: string;
  type: string;
  subject: string;
  createdAt: string;
}

export const HistoryContainer: React.FC = () => {
  const [filterType, setFilterType] = useState<string>('all');
  const [notifications, setNotifications] = useState<IAlarmHistory[]>([]);
  const [filteredData, setFilteredData] = useState<IAlarmHistory[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState<IAlarmHistory | null>(null);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const requestUrl = apiEndPoints.getNotifications();
    fetch(requestUrl, {
        method: 'GET',
        credentials: 'include',
    })
        .then((response) => {
            if (response.ok) {
                response.json().then((data: IAlarmHistory[]) => {
                    setNotifications(data);
                    setFilteredData(data);
                    setLoading(false);
                });
            } else {
                throw new Error('Failed to fetch notifications');
            }
        })
        .catch((error) => {
            console.error('Failed to fetch notifications:', error);
            setLoading(false);
        });
  }, []);

  const handleFilterChange = (event: SelectChangeEvent) => {
    const selectedType = event.target.value;
    setFilterType(selectedType);
    setPage(0);
    
    if (selectedType === 'all') {
      setFilteredData(notifications);
    } else {
      const filtered = notifications.filter(item => item.type === selectedType);
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('ko-KR');
  };

  const getTypeChip = (type: string) => {
    switch (type) {
      case 'reportalarm':
        return (
          <Chip 
            label="공시" 
            color="primary"
            size="small"
            sx={{ minWidth: 80 }}
          />
        );
      case 'pricealarm':
        return (
          <Chip 
            label="정기주가" 
            color="success"
            size="small"
            sx={{ minWidth: 80 }}
          />
        );
      case 'targetpricealarm':
        return (
          <Chip 
            label="목표가" 
            color="warning"
            size="small"
            sx={{ minWidth: 80 }}
          />
        );
      default:
        return (
          <Chip 
            label={type} 
            color="default"
            size="small"
            sx={{ minWidth: 80 }}
          />
        );
    }
  };

  const handleDeleteClick = (notification: IAlarmHistory) => {
    setSelectedNotification(notification);
    setDeleteDialogOpen(true);
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setSelectedNotification(null);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedNotification) return;

    try {
      const response = await fetch(
        apiEndPoints.deleteNotification(selectedNotification.id),
        { 
          method: 'DELETE',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to delete notification');
      }

      enqueueSnackbar(`[${selectedNotification.subject}] 알림이 삭제되었습니다`, {
        variant: 'info',
      });
      
      // Refresh notifications list
      const requestUrl = apiEndPoints.getNotifications();
      const getResponse = await fetch(requestUrl, {
        method: 'GET',
        credentials: 'include',
      });
      if (getResponse.ok) {
        const data = await getResponse.json();
        setNotifications(data);
        setFilteredData(data);
      }
    } catch (error) {
      console.error('Failed to delete notification:', error);
      enqueueSnackbar('알림 삭제에 실패하였습니다', {
        variant: 'error',
      });
    } finally {
      setDeleteDialogOpen(false);
      setSelectedNotification(null);
    }
  };

  if (loading) {
    return <Typography>로딩 중...</Typography>;
  }

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
            <MenuItem value="reportalarm">공시알림</MenuItem>
            <MenuItem value="pricealarm">정기주가알림</MenuItem>
            <MenuItem value="targetpricealarm">목표가알림</MenuItem>
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
                    <TableCell>제목</TableCell>
                    <TableCell>발생 시간</TableCell>
                    <TableCell>작업</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredData
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => (
                      <TableRow key={row.id}>
                        <TableCell>{getTypeChip(row.type)}</TableCell>
                        <TableCell>{row.subject}</TableCell>
                        <TableCell>{formatDate(row.createdAt)}</TableCell>
                        <TableCell>
                          <Button 
                            variant="outlined" 
                            color="error" 
                            size="small"
                            onClick={() => handleDeleteClick(row)}
                          >
                            삭제
                          </Button>
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
              showFirstButton
              showLastButton
            />
          </Paper>
        ) : (
          <Typography>알림 기록이 없습니다.</Typography>
        )}
      </Box>

      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
      >
        <DialogTitle>알림 삭제</DialogTitle>
        <DialogContent>
          <DialogContentText>
            이 알림을 삭제하시겠습니까?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel}>취소</Button>
          <Button onClick={handleDeleteConfirm} color="error">
            삭제
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
