import { Button } from '@mui/material';

const DartDetailLinkButton = ({ stockCd }: { stockCd: string | undefined }) => {
  const handleClick = (stockCd: string | undefined) => {
    if (!stockCd) return;

    // Dart에서 종목코드 조회시 앞에 'A'는 제외하고 조회해야 함
    // EX) A005930 => 005930
    const parsedStockCd = stockCd?.substring(1);
    const url = `https://dart.fss.or.kr/dsab007/main.do?option=corp&textCrpNm=${parsedStockCd}&autoSearch=Y`;
    const encodedUri = encodeURI(url);

    window.open(encodedUri, '_blank');
  };

  return (
    <Button
      variant="outlined"
      color="primary"
      size="small"
      onClick={() => handleClick(stockCd)}
    >
      DART 전자공시에서 확인하기
    </Button>
  );
};

export default DartDetailLinkButton;
