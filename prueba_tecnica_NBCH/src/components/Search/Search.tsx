import { TextField } from '@mui/material';

interface SearchProps{
  search: string;
  searcher: (e: React.ChangeEvent<HTMLInputElement>) => void;
} 

export default function Search({ search, searcher }: SearchProps){
  return (
    <TextField
      className="bg-white border-2 rounded-lg"
      fullWidth
      label="Buscar por título"
      value={search}
      onChange={searcher}
      sx={{ marginBottom: 2, width: '100%' }}
    />
  );
}