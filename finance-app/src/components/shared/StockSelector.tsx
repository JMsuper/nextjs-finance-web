import {
  FormControl,
  MenuItem,
  Select,
  Stack,
  Typography,
} from '@mui/material';

interface StockSelectorProps {
  selectedStockName: string;
  savedStockInfoList: any[];
  handleChange: (value: string) => void;
}

export const StockSelector: React.FC<StockSelectorProps> = ({
  selectedStockName,
  savedStockInfoList,
  handleChange,
}) => {
  return (
    <Stack direction="row" alignItems="center">
      <Typography variant="h6" mr="10px">
        종목 선택
      </Typography>
      <FormControl>
        <Select
          id="save-stock-select"
          value={selectedStockName}
          onChange={(event) => handleChange(event.target.value)}
          size="small"
        >
          {savedStockInfoList.map((stockInfo) => {
            return (
              <MenuItem key={stockInfo.corpCd} value={stockInfo.name}>
                {stockInfo.name}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Stack>
  );
};
