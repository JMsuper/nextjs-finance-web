import { AuthState } from '@/app/authentication/auth/AuthState';
import Config from '@/configs/config.export';
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { RequestResultAlert } from './RequestResultAlert';

export interface ISaveStockButton {
  stockName: string;
  corpCode: string;
}

export const SaveStockButton: React.FC<ISaveStockButton> = ({
  stockName,
  corpCode,
}) => {
  const [isSaveDialogOpen, setIsSaveDialogOpen] = useState(false);
  const [authState] = useRecoilState(AuthState);

  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [isResultArrived, setIsResultArrived] = useState(false);
  const [isResultFail, setIsResultFail] = useState(false);

  const successMessage = '관심종목으로 등록되었습니다.';
  const [errorMessage, setErrorMessage] =
    useState('관심종목 등록에 실패하였습니다.');

  const handleSave = () => {
    setIsButtonClicked(true);
    const requestUrl = `${Config().baseUrl}/api/corp-info/user`;

    fetch(requestUrl, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      },
      body: JSON.stringify({
        corpCode,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          setIsResultFail(true);
          response.json().then((data) => {
            setErrorMessage(data.message);
          });
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        setIsResultFail(true);
      })
      .finally(() => {
        setIsResultArrived(true);
      });
  };

  return (
    <Box>
      {authState.isLogin ? (
        <Dialog
          open={isSaveDialogOpen}
          onClose={() => setIsSaveDialogOpen(false)}
          onClick={(event) => event.stopPropagation()}
        >
          <DialogTitle id="alert-dialog-title">{stockName}</DialogTitle>
          {!isResultArrived ? (
            <>
              {!isButtonClicked ? (
                <>
                  <DialogContent>
                    <Box>관심종목으로 등록하시겠습니까?</Box>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleSave} autoFocus>
                      네
                    </Button>
                    <Button onClick={() => setIsSaveDialogOpen(false)}>
                      아니요
                    </Button>
                  </DialogActions>
                </>
              ) : (
                <Box
                  width="100%"
                  height="100px"
                  display="flex"
                  alignContent="center"
                  justifyContent="center"
                >
                  <CircularProgress />
                </Box>
              )}
            </>
          ) : (
            <>
              <RequestResultAlert
                isButtonClicked={isButtonClicked}
                isResultFail={isResultFail}
                successMessage={successMessage}
                failMessage={errorMessage}
              />
              <DialogActions>
                <Button onClick={() => setIsSaveDialogOpen(false)}>닫기</Button>
              </DialogActions>
            </>
          )}
        </Dialog>
      ) : (
        <Dialog
          open={isSaveDialogOpen}
          onClose={() => setIsSaveDialogOpen(false)}
          onClick={(event) => event.stopPropagation()}
        >
          <DialogTitle id="alert-dialog-title">{stockName}</DialogTitle>
          <DialogContent>
            <Box>로그인 이후 관심종목을 등록할 수 있습니다.</Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setIsSaveDialogOpen(false)}>닫기</Button>
          </DialogActions>
        </Dialog>
      )}

      <Button
        size="small"
        variant="contained"
        color="primary"
        onClick={(event) => {
          event.stopPropagation();
          setIsSaveDialogOpen(true);
        }}
      >
        저장
      </Button>
    </Box>
  );
};
