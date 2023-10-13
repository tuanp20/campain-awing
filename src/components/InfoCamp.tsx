import { Box, TextField } from '@mui/material';

const InfoCamp = () => {
  return (
    <Box>
      <TextField required label='Tên chiến dịch' variant='standard' fullWidth />
      <TextField label='Mô tả' variant='standard' fullWidth />
    </Box>
  );
};

export default InfoCamp;
