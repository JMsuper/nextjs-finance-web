import { Alert, Typography } from '@mui/material';

interface IRequestResultAlertProps {
  isButtonClicked: boolean;
  isResultFail: boolean;
  successMessage: string;
  failMessage: string;
}

export const RequestResultAlert: React.FC<IRequestResultAlertProps> = ({
  isButtonClicked,
  isResultFail,
  successMessage,
  failMessage,
}) => {
  return !isButtonClicked ? null : isResultFail ? (
    <Alert variant="outlined" severity="error" sx={{ mb: '15px' }}>
      <Typography variant="body2" fontWeight="600">
        {failMessage}
      </Typography>
    </Alert>
  ) : (
    <Alert variant="outlined" severity="success" sx={{ mb: '15px' }}>
      <Typography variant="body2" fontWeight="600">
        {successMessage}
      </Typography>
    </Alert>
  );
};
