import { Box, TextField } from '@mui/material';
import { FieldValues, UseFormRegister } from 'react-hook-form';

interface IInfoCamp {
  inputs: {
    name: string;
    describe: string;
  };
  handleChangeInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  register: UseFormRegister<FieldValues>;
  errors: any;
}

const InfoCamp = ({
  inputs,
  handleChangeInput,
  register,
  errors,
}: IInfoCamp) => {
  return (
    <Box>
      <TextField
        {...register('name', { required: 'Dữ liệu không hợp lệ' })}
        label='Tên chiến dịch'
        variant='standard'
        fullWidth
        value={inputs.name}
        onChange={handleChangeInput}
        error={!!errors?.name}
        helperText={errors?.name ? errors.name.message?.toString() : ''}
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
