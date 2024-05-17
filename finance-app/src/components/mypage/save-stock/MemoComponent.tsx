import React, { useEffect, useState } from 'react';
import {
  Typography,
  Box,
  Stack,
  IconButton,
  Card,
  Button,
  TextField,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import PostAddIcon from '@mui/icons-material/PostAdd';
import { enqueueSnackbar } from 'notistack';
import { IMemo, SaveStockInfo } from '@/components/shared/StockInfo';
import Config from '@/configs/config.export';

const convertHtmlBreaksToNewline = (str: string) => {
  return str.replace(/<br\s*\/?>/gm, '\r\n');
};

const saveMemo = (
  saveCorpInfoId: number,
  memoList: IMemo[],
  setMemoList: React.Dispatch<React.SetStateAction<IMemo[]>>,
  content: string,
) => {
  const requestUrl = `${Config().baseUrl}/api/memo`;

  fetch(requestUrl, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    },
    body: JSON.stringify({
      saveCorpInfoId: saveCorpInfoId,
      content: content,
    }),
  })
    .then((response) => {
      if (response.ok) {
        response.json().then((data: IMemo) => {
          let newMemo: IMemo = {
            memoId: data.memoId,
            content: data.content,
            createdAt: new Date(data.createdAt),
          };
          setMemoList([newMemo, ...memoList]);
          enqueueSnackbar('메모가 저장되었습니다.', {
            variant: 'info',
          });
        });
      } else {
        enqueueSnackbar('메모 저장에 실패하였습니다.', {
          variant: 'error',
        });
      }
    })
    .catch((error) => {
      enqueueSnackbar('메모 저장에 실패하였습니다.', {
        variant: 'error',
      });
    });
};

const updateMemo = (
  memoList: IMemo[],
  setMemoList: React.Dispatch<React.SetStateAction<IMemo[]>>,
  memoId: number,
  content: string,
) => {
  const requestUrl = `${Config().baseUrl}/api/memo`;

  fetch(requestUrl, {
    method: 'PUT',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    },
    body: JSON.stringify({
      memoId: memoId,
      content: content,
    }),
  })
    .then((response) => {
      if (response.ok) {
        response.json().then((data: IMemo) => {
          let updatedMemo: IMemo = {
            memoId: data.memoId,
            content: data.content,
            createdAt: new Date(data.createdAt),
          };

          const updatedMemoList = memoList.map((memo) => {
            if (memo.memoId === memoId) {
              return updatedMemo;
            }
            return memo;
          });
          setMemoList(updatedMemoList);

          enqueueSnackbar('메모가 수정되었습니다.', {
            variant: 'info',
          });
        });
      } else {
        enqueueSnackbar('메모 수정에 실패하였습니다.', {
          variant: 'error',
        });
      }
    })
    .catch((error) => {
      enqueueSnackbar('메모 수정에 실패하였습니다.', {
        variant: 'error',
      });
    });
};

const deleteMemo = (
  memoList: IMemo[],
  setMemoList: React.Dispatch<React.SetStateAction<IMemo[]>>,
  memoId: number,
) => {
  const requestUrl = `${Config().baseUrl}/api/memo`;

  fetch(requestUrl, {
    method: 'DELETE',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    },
    body: JSON.stringify({
      memoId: memoId,
    }),
  })
    .then((response) => {
      if (response.ok) {
        const updatedMemoList = memoList.filter(
          (memo) => memo.memoId !== memoId,
        );
        setMemoList(updatedMemoList);

        enqueueSnackbar('메모가 삭제되었습니다.', {
          variant: 'info',
        });
      } else {
        enqueueSnackbar('메모 삭제에 실패하였습니다.', {
          variant: 'error',
        });
      }
    })
    .catch((error) => {
      enqueueSnackbar('메모 삭제에 실패하였습니다.', {
        variant: 'error',
      });
    });
};

interface CreateMemoCardProps {
  saveCorpInfoId: number;
  memoId?: number;
  content?: string;
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
  memoList: IMemo[];
  setMemoList: React.Dispatch<React.SetStateAction<IMemo[]>>;
}

const CreateMemoCard: React.FC<CreateMemoCardProps> = ({
  saveCorpInfoId,
  memoId,
  content,
  onClose,
  memoList,
  setMemoList,
}) => {
  const [updatedContent, setUpdatedContent] = useState<string>('');
  const [isContentLengthZero, setIsContentLengthZero] = useState<boolean>(true);
  const [isMaxed, setIsMaxed] = useState<boolean>(false);
  const CHARACTER_LIMIT = 500;

  useEffect(() => {
    if (memoId && content) {
      handleEdit(content);
    }
  }, []);

  const handleEdit = (value: string) => {
    if (value.length === 0) {
      setIsContentLengthZero(true);
      setUpdatedContent(value);
      return;
    }

    if (value.length > CHARACTER_LIMIT) {
      setIsContentLengthZero(false);
      setIsMaxed(true);
      setUpdatedContent(value.slice(0, CHARACTER_LIMIT));
      return;
    }
    setIsContentLengthZero(false);
    setIsMaxed(false);
    setUpdatedContent(value);
  };

  const handleClose = () => {
    onClose(false);
  };

  return (
    <Card sx={{ p: '20px' }}>
      <Stack direction="row" justifyContent="space-between">
        <TextField
          label="메모 내용"
          multiline
          fullWidth
          value={updatedContent}
          error={isMaxed}
          onChange={(e) => handleEdit(e.target.value)}
          helperText={`${updatedContent.length}/${CHARACTER_LIMIT}`}
          sx={{ marginRight: '10px' }}
        />
        <Stack direction="column" justifyContent="start" spacing="7px">
          <Button
            size="small"
            variant="outlined"
            onClick={() => {
              if (isContentLengthZero || isMaxed) return;

              let parsedContent = convertHtmlBreaksToNewline(updatedContent);

              if (memoId) {
                updateMemo(memoList, setMemoList, memoId, parsedContent);
              } else {
                saveMemo(saveCorpInfoId, memoList, setMemoList, parsedContent);
              }

              handleClose();
            }}
          >
            <Typography>저장</Typography>
          </Button>
          <Button
            size="small"
            variant="outlined"
            color="error"
            onClick={handleClose}
          >
            <Typography>취소</Typography>
          </Button>
        </Stack>
      </Stack>
    </Card>
  );
};

interface MemoCardProps {
  saveCorpInfoId: number;
  memoId: number;
  content: string;
  createdAt: Date;
  setMemoList: React.Dispatch<React.SetStateAction<IMemo[]>>;
  memoList: IMemo[];
}

const MemoCard: React.FC<MemoCardProps> = ({
  saveCorpInfoId,
  memoId,
  content,
  createdAt,
  setMemoList,
  memoList,
}) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isDelete, setIsDelete] = useState<boolean>(false);

  return (
    <>
      {isEdit ? (
        <CreateMemoCard
          saveCorpInfoId={saveCorpInfoId}
          setMemoList={setMemoList}
          memoId={memoId}
          content={content}
          memoList={memoList}
          onClose={setIsEdit}
        />
      ) : (
        <Card sx={{ p: '20px' }}>
          <Stack direction="row" justifyContent="space-between">
            <Box>
              <Typography variant="body1" component="pre">
                {content}
              </Typography>
              <Typography variant="caption">
                {createdAt.toLocaleDateString()}{' '}
                {createdAt.toLocaleTimeString()}
              </Typography>
            </Box>
            <Stack direction="column" justifyContent="start">
              <Box>
                <IconButton aria-label="edit" onClick={() => setIsEdit(true)}>
                  <EditIcon fontSize="small" />
                </IconButton>
                <IconButton
                  aria-label="delete"
                  onClick={() => {
                    setIsDelete(true);
                    deleteMemo(memoList, setMemoList, memoId);
                  }}
                >
                  <DeleteForeverIcon fontSize="small" />
                </IconButton>
              </Box>
            </Stack>
          </Stack>
        </Card>
      )}
    </>
  );
};

interface MemoComponentProps {
  selectedStockInfo: SaveStockInfo;
  savedStockInfoList: SaveStockInfo[];
  setSavedStockInfoList: React.Dispatch<React.SetStateAction<SaveStockInfo[]>>;
}

const MemoComponent: React.FC<MemoComponentProps> = ({
  selectedStockInfo,
  savedStockInfoList,
  setSavedStockInfoList,
}) => {
  const [memoList, setMemoList] = useState<IMemo[]>(
    selectedStockInfo.memoList ?? [],
  );
  const [saveCorpInfoId, setSaveCorpInfoId] = useState<number>(0);
  const [openCreateBox, setOpenCreateBox] = useState<boolean>(false);

  useEffect(() => {
    setSaveCorpInfoId(selectedStockInfo.saveCorpInfoId);
    if (selectedStockInfo.memoList) {
      setMemoList(selectedStockInfo.memoList);
    }
  }, [selectedStockInfo]);

  useEffect(() => {
    const updatedSavedStockInfoList = savedStockInfoList.map((stockInfo) => {
      if (stockInfo.saveCorpInfoId === saveCorpInfoId) {
        stockInfo.memoList = memoList;
      }
      return stockInfo;
    });

    setSavedStockInfoList(updatedSavedStockInfoList);
  }, [memoList]);

  return (
    <Box sx={{ marginBottom: '1rem' }}>
      <Stack
        direction="row"
        justifyContent="start"
        alignItems="center"
        sx={{ mb: '5px' }}
      >
        <Typography variant="h6" color="initial">
          메모장
        </Typography>
        <IconButton
          aria-label=""
          onClick={() => {
            setOpenCreateBox(true);
          }}
        >
          <PostAddIcon />
        </IconButton>
      </Stack>

      <Stack direction="column" spacing="10px">
        {openCreateBox && (
          <CreateMemoCard
            saveCorpInfoId={saveCorpInfoId}
            setMemoList={setMemoList}
            onClose={setOpenCreateBox}
            memoList={memoList}
          />
        )}
        {memoList.map((memo, index) => (
          <MemoCard
            key={index}
            setMemoList={setMemoList}
            saveCorpInfoId={saveCorpInfoId}
            memoId={memo.memoId}
            content={memo.content}
            createdAt={new Date(memo.createdAt)}
            memoList={memoList}
          />
        ))}
      </Stack>
    </Box>
  );
};

export default MemoComponent;
