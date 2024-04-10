import { IconButton, InputBase, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface SearchBarProps {
  handleSearchInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ handleSearchInputChange }) => (
  <Paper
    component="form"
    sx={{
      p: '2px 4px',
      mb: '10px',
      display: 'flex',
      alignItems: 'center',
      width: 300,
    }}
  >
    <InputBase
      sx={{ ml: 1, flex: 1 }}
      placeholder="종목명 및 코드 검색"
      inputProps={{ 'aria-label': '종목명 및 코드 검색' }}
      onChange={handleSearchInputChange}
    />
    <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
      <SearchIcon />
    </IconButton>
  </Paper>
);

export default SearchBar;
