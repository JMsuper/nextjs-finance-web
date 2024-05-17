import React, { useEffect } from 'react';
import Config from '@/configs/config.export';
import { enqueueSnackbar } from 'notistack';
import styled from '@emotion/styled';
import { Button, Chip, Paper, Stack, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { AlarmInfoListForShow } from '@/utils/DomainInfo';
import dayjs, { Dayjs } from 'dayjs';

const TableCells = [
    { id: 'stockName', name: '종목명' },
    { id: 'stockCode', name: '종목코드' },
    { id: 'weekDayList', name: '지정요일' },
    { id: 'time', name: '알람시간' },
    { id: 'infoIndexList', name: '메일 첨부 정보' },
    { id: 'active', name: '상태' },
    { id: 'delete', name: '' },
];


const week = ['월','화','수','목','금','토','일'];
  
  interface PriceAlarm {
    id: number;
    stockName: string;
    stockCode: string;
    weekDayList: number[]
    time: Dayjs,
    infoIndexList: number[];
    active: boolean;
  }
  
  const TableHeadCell = styled(TableCell)`
    font-weight: bold;
    border-bottom: 1px solid #e0e0e0;
  `;

const SearchPriceAlarm: React.FC = () => {
    const [alamyData, setAlamyData] = React.useState<PriceAlarm[]>([]);
  
    useEffect(() => {
      fetch(`${Config().baseUrl}/api/alarm/price`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          if (response.ok) {
            response.json().then((data : PriceAlarm[]) => {
              data.forEach((element) => {
                element.time = dayjs(element.time,"HH:mm:ss")
                element.weekDayList = element.weekDayList.sort();
                element.infoIndexList = element.infoIndexList.sort();
              });
              setAlamyData(data);
            });
          } else {
            console.error('Error:', response);
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }, []);


    const handleStatusToggleChange = (
        id: number,
        active: boolean,
        stockName: string,
      ) => {
        fetch(`${Config().baseUrl}/api/alarm/price/status`, {
          method: 'PUT',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            priceAlarmId: id,
            active: active,
          }),
        })
          .then((response) => {
            if (response.ok) {
              if (active) {
                enqueueSnackbar(`[${stockName}]의 알림이 활성화되었습니다`, {
                  variant: 'info',
                });
              } else {
                enqueueSnackbar(`[${stockName}]의 알림이 비활성화되었습니다`, {
                  variant: 'info',
                });
              }
    
              const newAlamyData = alamyData.map((data) => {
                if (data.id === id) {
                  return { ...data, active: !data.active };
                }
                return data;
              });
              setAlamyData(newAlamyData);
            } else {
              enqueueSnackbar('알림 상태 변경에 실패하였습니다', {
                variant: 'error',
              });
            }
          })
          .catch((error) => {
            enqueueSnackbar('알림 상태 변경에 실패하였습니다', {
              variant: 'error',
            });
          });
      };

      const handleDeleteButtonClick = (id: number, stockName: string) => {
        fetch(`${Config().baseUrl}/api/alarm/price`, {
          method: 'DELETE',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ priceAlarmId: id }),
        })
          .then((response) => {
            if (response.ok) {
              alamyData.map((data, index) => {
                if (data.id === id) {
                  alamyData.splice(index, 1);
                  setAlamyData([...alamyData]);
                }
              });
              enqueueSnackbar(`[ ${stockName} ] 알림이 삭제되었습니다`, {
                variant: 'info',
              });
            } else {
              enqueueSnackbar(`[ ${stockName} ] 알림 삭제에 실패하였습니다`, {
                variant: 'error',
              });
            }
          })
          .catch((error) => {
            enqueueSnackbar(`[ ${stockName} ] 알림 삭제에 실패하였습니다`, {
              variant: 'error',
            });
          });
      };


    return (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                {TableCells.map((cell) => (
                  <TableHeadCell key={cell.id}>{cell.name}</TableHeadCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {alamyData.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.stockName}</TableCell>
                  <TableCell>{row.stockCode}</TableCell>
                  <TableCell>
                    {
                        row.weekDayList.map((data) => {
                            return week[data]
                        }).join(', ')
                    }
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" 
                    >
                        {
                          row.time.format('HH시mm분')
                        }
                    </Typography>
                        
                    
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1}>
                      {
                        row.infoIndexList.length === 0 ?
                        <Typography variant="body2" color="initial">
                          X
                        </Typography> :
                      row.infoIndexList.map((value) => {
                        const name = AlarmInfoListForShow[value];
                        return (
                          <Chip
                            key={value}
                            label={name}
                            size="small"
                            variant="outlined"
                          />
                        );
                      })}
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Switch
                      checked={row.active}
                      color="primary"
                      size="small"
                      onChange={() =>
                        handleStatusToggleChange(
                          row.id,
                          !row.active,
                          row.stockName,
                        )
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={() => {
                        handleDeleteButtonClick(row.id, row.stockName);
                      }}
                    >
                      <Typography variant="body1">삭제</Typography>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
    );
};

export default SearchPriceAlarm;