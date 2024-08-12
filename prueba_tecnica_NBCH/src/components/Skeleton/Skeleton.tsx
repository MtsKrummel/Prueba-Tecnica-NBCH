import { Box } from "@mui/material";
import { Skeleton } from '@mui/material';

export default function SkeletonComponent() {
  return (
    <Box
      sx={{
        bgcolor: '#242424',
        p: 8,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Skeleton
        variant="rectangular"
        width="100%"
        height={1000}
      />
    </Box>
  );
}
