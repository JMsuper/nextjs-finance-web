import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';

export interface IMemo {
  id: number;
  title: string;
  content: string;
}

interface MemoComponentProps {
  memo: IMemo;
  onEdit: (id: number, updatedMemo: IMemo) => void;
  onDelete: (id: number) => void;
}

const MemoComponent: React.FC<MemoComponentProps> = ({
  memo,
  onEdit,
  onDelete,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState(memo.title);
  const [updatedContent, setUpdatedContent] = useState(memo.content);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    const updatedMemo: IMemo = {
      id: memo.id,
      title: updatedTitle,
      content: updatedContent,
    };
    onEdit(memo.id, updatedMemo);
    setIsEditing(false);
  };

  const handleDelete = () => {
    onDelete(memo.id);
  };

  return (
    <Box sx={{ marginBottom: '1rem' }}>
      {isEditing ? (
        <>
          <TextField
            label="Title"
            value={updatedTitle}
            onChange={(e) => setUpdatedTitle(e.target.value)}
            fullWidth
            sx={{ marginBottom: '0.5rem' }}
          />
          <TextField
            label="Content"
            value={updatedContent}
            onChange={(e) => setUpdatedContent(e.target.value)}
            multiline
            fullWidth
            rows={4}
            sx={{ marginBottom: '0.5rem' }}
          />
          <Button
            variant="contained"
            onClick={handleSave}
            sx={{ marginRight: '0.5rem' }}
          >
            Save
          </Button>
          <Button variant="contained" onClick={() => setIsEditing(false)}>
            Cancel
          </Button>
        </>
      ) : (
        <>
          <Typography variant="h6" sx={{ marginBottom: '0.5rem' }}>
            {memo.title}
          </Typography>
          <Typography>{memo.content}</Typography>
          <Button
            variant="contained"
            onClick={handleEdit}
            sx={{ marginRight: '0.5rem' }}
          >
            Edit
          </Button>
          <Button variant="contained" onClick={handleDelete}>
            Delete
          </Button>
        </>
      )}
    </Box>
  );
};

export default MemoComponent;
