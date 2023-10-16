import { Box, TextField } from '@mui/material';

interface IInfoCamp {
  inputs: {
    name: string;
    describe: string;
  };
  handleChangeInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error: boolean;
}

const InfoCamp = ({ inputs, handleChangeInput, error }: IInfoCamp) => {
  return (
    <Box>
      <TextField
        // {...register('name', { required: 'Dữ liệu không hợp lệ' })}
        label='Tên chiến dịch'
        variant='standard'
        fullWidth
        value={inputs.name}
        onChange={handleChangeInput}
        name='name'
        error={error}
        helperText={error ? 'Dữ liệu không hợp lệ' : ''}
        required
      />
      <TextField
        label='Mô tả'
        variant='standard'
        fullWidth
        value={inputs.describe}
        onChange={handleChangeInput}
        name='describe'
      />
    </Box>
  );
};

export default InfoCamp;
