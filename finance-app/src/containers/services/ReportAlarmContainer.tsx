import Config from '@/configs/config.export';
import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { CreateReportAlamy } from '@/components/services/alamy/CreateReportAlamy';

export interface IReportAlarm{
  stockName: string,
  saveCorpInfoId: number,
  reportTypeList: string[]
  active: boolean
}

export const ReportAlarmContainer: React.FC = () => {
  const [selectedReportAlarm, setSelectedReportAlarm] = useState<IReportAlarm>();
  const [savedReportAlarmList, setSavedReportAlarmList] = useState<IReportAlarm[]>([]);

  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    const requestUrl = `${Config().baseUrl}/api/alarm/report`;
    fetch(requestUrl, {
      method: 'GET',
      credentials: 'include',
    })
      .then((response) => {
        if (response.ok) {
          response.json().then((data: IReportAlarm[]) => {
            setSavedReportAlarmList(data);
            setSelectedReportAlarm(data[0]);
            setMounted(true);
          });
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      })
  }, []);

  const handleChange = (value: string) => {
    const foundReportAlarm : IReportAlarm | undefined = savedReportAlarmList.find(
      (reportAlarm) => reportAlarm.stockName === value,
    );
    if (foundReportAlarm === undefined) {
      return;
    }

    setSelectedReportAlarm(foundReportAlarm);
    setMounted(true);
  };

  return (
    <Box>
        {mounted && selectedReportAlarm ? (
          <CreateReportAlamy
            selectedReportAlarm={selectedReportAlarm}
            savedReportAlarmList={savedReportAlarmList}
            setSavedReportAlarmList={setSavedReportAlarmList}
            handleChange={handleChange}
          ></CreateReportAlamy>
        ) : (
          <Typography>관심 종목을 등록해주세요</Typography>
        )}
    </Box>
  );
};
