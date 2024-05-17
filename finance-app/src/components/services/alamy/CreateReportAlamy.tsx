import {
  Box,
  Divider,
  Typography,
  Stack,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Switch,
  FormControl,
  Select,
  MenuItem,
} from '@mui/material';
import React, { useEffect } from 'react';
import { pblntfTy, pblntfTyList } from '@/utils/DomainInfo';
import { ExpandMore } from '@mui/icons-material';
import styled from '@emotion/styled';
import { enqueueSnackbar } from 'notistack';
import { IReportAlarm } from '@/containers/services/ReportAlarmContainer';
import Config from '@/configs/config.export';
import { SimpleBackdrop } from '@/components/shared/SimpleBackdrop';

interface CreateReportAlamyProps {
  selectedReportAlarm: IReportAlarm;
  savedReportAlarmList: IReportAlarm[];
  setSavedReportAlarmList: (value: IReportAlarm[]) => void;
  handleChange: (value: string) => void;
}

const StyledAccordionSummary = styled(AccordionSummary)({
  '& .MuiAccordionSummary-content': {
    margin: '0px',
  },
  '& .Mui-expanded': {
    margin: '0px',
  },
});

export const CreateReportAlamy: React.FC<CreateReportAlamyProps> = ({
  selectedReportAlarm,
  savedReportAlarmList,
  setSavedReportAlarmList,
  handleChange,
}) => {
  const [checkedList, setCheckedList] = React.useState<string[]>([]);
  const [isActive, setIsActive] = React.useState<boolean>(false);
  const [fetchStart, setFetchStart] = React.useState<boolean>(false);

  const [isEditButtonClicked, setIsEditButtonClicked] =
    React.useState<boolean>(false);

  useEffect(() => {
    setCheckedList(selectedReportAlarm.reportTypeList);
    setIsActive(selectedReportAlarm.active);
  }, [selectedReportAlarm]);

  const handleSave = () => {
    if(isActive && checkedList.length === 0){
      alert('알림 활성화 상태에서는 최소 1개 이상의 알림을 선택해야 합니다.');
      return;
    }

    setFetchStart(true);
    fetch(`${Config().baseUrl}/api/alarm/report`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        saveCorpInfoId: selectedReportAlarm.saveCorpInfoId,
        reportTypeList: checkedList,
        active: isActive,
      }),
    })
      .then((response) => {
        if (response.ok) {
          enqueueSnackbar('알람이 저장되었습니다.', {
            variant: 'info',
          });
          handleSaveSuccess();
        } else {
          enqueueSnackbar('알람 저장에 실패했습니다.', {
            variant: 'error',
          });
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      })
      .finally(() => {
        setFetchStart(false);
        setIsEditButtonClicked(false);
      });
  };

  const handleSaveSuccess = () => {
    setSavedReportAlarmList(
      savedReportAlarmList.map((reportAlarm) => {
        if (reportAlarm.saveCorpInfoId === selectedReportAlarm.saveCorpInfoId) {
          return {
            ...reportAlarm,
            reportTypeList: checkedList,
            active: isActive,
          };
        }
        return reportAlarm;
      }),
    );
  };

  const isChecked = (value: string) => checkedList.indexOf(value) !== -1;

  const handleChecked = (value: string) => {
    const currentIndex = checkedList.indexOf(value);
    const newChecked = [...checkedList];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setCheckedList(newChecked);
  };

  const handleSelectAll = () => {
    const newChecked =
      checkedList.length === pblntfTyList.length
        ? []
        : pblntfTyList.map((item) => item.id);
    setCheckedList(newChecked);
  };

  const handleDeleteAll = () => {
    setCheckedList([]);
  };

  const handleToggleChange = () => {
    const updatedIsActived = !isActive;
    setIsActive(updatedIsActived);
    if (updatedIsActived) {
      enqueueSnackbar(`${selectedReportAlarm.stockName} 알람 활성화`, {
        variant: 'info',
      });
    } else {
      enqueueSnackbar(`${selectedReportAlarm.stockName} 알림 비활성화`, {
        variant: 'warning',
      });
    }
  };

  return (
    <Box>
      {fetchStart && <SimpleBackdrop />}
        <Stack direction="column">
          <Typography variant="h6" sx={{ marginBottom: '20px' }}>
            활성화 중인 종목
          </Typography>
          <Box>
            {
              savedReportAlarmList.map((reportAlarm: IReportAlarm) => {
                if (reportAlarm.active) {
                  return (
                    <Chip
                      key={reportAlarm.saveCorpInfoId}
                      label={reportAlarm.stockName}
                      color="primary"
                      sx={{ marginRight: '5px', marginBottom: '5px' }}
                    ></Chip>
                  );
                }
              })
            }
          </Box>
        </Stack>
      <Divider sx={{ marginY: '20px' }} />
      <Stack direction="row" justifyContent="space-between">
        <Stack direction="row" alignItems="center">
          <Typography variant="h6" mr="10px">
            종목 선택
          </Typography>
          <FormControl>
            <Select
              id="save-stock-select"
              value={selectedReportAlarm.stockName}
              onChange={(event) => handleChange(event.target.value)}
              size="small"
            >
              {savedReportAlarmList.map((reportAlarm: IReportAlarm) => {
                return (
                  <MenuItem
                    key={reportAlarm.saveCorpInfoId}
                    value={reportAlarm.stockName}
                  >
                    {reportAlarm.stockName}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Stack>
        <Stack direction="row" justifyContent="right" alignItems="center">
          <Switch
            disabled={!isEditButtonClicked}
            checked={isActive}
            onChange={handleToggleChange}
            color="primary"
          />

          {isEditButtonClicked ? (
            <Stack direction="row" justifyContent="right" alignItems="center">
              <Button
                variant="contained"
                sx={{
                  marginRight: '10px',
                }}
                onClick={() => {
                  if (checkedList.length === pblntfTyList.length) {
                    handleDeleteAll();
                  } else {
                    handleSelectAll();
                  }
                }}
              >
                {checkedList.length === pblntfTyList.length ? (
                  <Typography variant="body1">전체해제</Typography>
                ) : (
                  <Typography variant="body1">전체선택</Typography>
                )}
              </Button>
              <Button
                variant="contained"
                sx={{
                  marginRight: '20px',
                }}
                onClick={() => {
                  handleSave();
                }}
              >
                <Typography variant="body1">저장</Typography>
              </Button>
            </Stack>
          ) : (
            <Stack direction="row" justifyContent="right">
              <Button
                variant="contained"
                sx={{
                  marginRight: '20px',
                }}
                onClick={() => {
                  setIsEditButtonClicked(true);
                }}
              >
                <Typography variant="body1">수정</Typography>
              </Button>
            </Stack>
          )}
        </Stack>
      </Stack>
      <Divider sx={{ marginY: '20px' }} />
      <FormGroup>
        {pblntfTyList.map((item: pblntfTy) => {
          const checked = isChecked(item.id);

          return (
            <Accordion key={item.id}>
              <StyledAccordionSummary expandIcon={<ExpandMore />}>
                <FormControlLabel
                  control={
                    <Checkbox
                      disabled={!isEditButtonClicked}
                      checked={checked}
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                      onChange={(e) => {
                        e.stopPropagation();
                        handleChecked(item.id);
                      }}
                      sx={{
                        marginX: '5px',
                      }}
                    />
                  }
                  label={
                    <Typography variant="body1" noWrap>
                      {item.name}
                    </Typography>
                  }
                />
              </StyledAccordionSummary>
              <AccordionDetails
                sx={{
                  minHeight: '0px',
                }}
              >
                <Stack
                  direction="column"
                  spacing={1}
                  sx={{
                    marginBottom: '15px',
                  }}
                >
                  {item.descriptiion.map((description, index) => (
                    <Typography variant="body2" key={index} color="grey">
                      - {description}
                    </Typography>
                  ))}
                </Stack>

                {item.subType.map((subItem) => (
                  <Chip
                    variant="outlined"
                    key={subItem}
                    label={subItem}
                    color="info"
                    sx={{
                      marginRight: '5px',
                      marginBottom: '5px',
                    }}
                  ></Chip>
                ))}
              </AccordionDetails>
            </Accordion>
          );
        })}
      </FormGroup>
    </Box>
  );
};
