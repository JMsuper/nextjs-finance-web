import React from 'react';
import {
  Card,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Tooltip,
  Chip,
  Typography,
  Box,
} from '@mui/material';
import { DisclosureReport } from '@/components/shared/StockInfo';
import styled from '@emotion/styled';

interface ReportTableProps {
  reportList: DisclosureReport[];
}

const HeadCell = styled(TableCell)`
  background-color: rgb(93, 135, 255);
  color: white;
`;

const BodyCell = styled(TableCell)`
  font-size: 13px;
`;

const getTooltipText = (commentName: string) => {
  switch (commentName) {
    case '유':
      return '본 공시사항은 한국거래소 유가증권시장본부 소관임';
    case '코':
      return '본 공시사항은 한국거래소 코스닥시장본부 소관임';
    case '채':
      return '본 문서는 한국거래소 채권상장법인 공시사항임';
    case '넥':
      return '본 문서는 한국거래소 코넥스시장 소관임';
    case '공':
      return '본 공시사항은 공정거래위원회 소관임';
    case '연':
      return '본 보고서는 연결부분을 포함한 것임';
    case '정':
      return '본 보고서 제출 후 정정신고가 있으니 관련 보고서를 참조하시기 바람';
    case '철':
      return '본 보고서는 철회(간주)되었으니 관련 철회신고서(철회간주안내)를 참고하시기 바람';
    default:
      return '';
  }
};

const ReportTable: React.FC<ReportTableProps> = ({ reportList }) => {
  return (
    <Box>
      <Typography variant="h6" color="initial" marginBottom="15px">
        최근 공시
      </Typography>
      <Card>
        <Table size="small">
          <TableHead>
            <TableRow>
              <HeadCell>번호</HeadCell>
              <HeadCell>보고서명</HeadCell>
              <HeadCell>제출인명</HeadCell>
              <HeadCell>접수일자</HeadCell>
              <HeadCell>비고</HeadCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reportList.map((report, index) => {
              return (
                <TableRow
                  key={index}
                  hover
                  sx={{ cursor: 'pointer' }}
                  onClick={() => {
                    const reportUrl = `http://dart.fss.or.kr/dsaf001/main.do?rcpNo=${report.rceptNo}`;
                    window.open(reportUrl, '_blank');
                  }}
                >
                  <BodyCell>{index + 1}</BodyCell>
                  <BodyCell>{report.reportNm}</BodyCell>
                  <BodyCell>{report.flrNm}</BodyCell>
                  <BodyCell>{report.rceptDt}</BodyCell>

                  <BodyCell>
                    {report.rm !== '' ? (
                      <Tooltip title={getTooltipText(report.rm)}>
                        <Chip
                          label={report.rm}
                          size="small"
                          variant="outlined"
                          sx={{
                            maxHeight: '16px',
                          }}
                        />
                      </Tooltip>
                    ) : (
                      ''
                    )}
                  </BodyCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Card>
    </Box>
  );
};

export default ReportTable;
