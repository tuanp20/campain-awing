import { Box, TextField } from '@mui/material';
import { IInputs } from '../App';

interface IInfoCamp {
  inputs: IInputs;
  handleChangeInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errorNameOfCamp: boolean;
}

const InfoCamp = ({
  inputs,
  handleChangeInput,
  errorNameOfCamp,
}: IInfoCamp) => {
  return (
    <Box>
      <TextField
        label='Tên chiến dịch'
        variant='standard'
        fullWidth
        value={inputs.name}
        onChange={handleChangeInput}
        name='name'
        error={errorNameOfCamp}
        helperText={errorNameOfCamp ? 'Dữ liệu không hợp lệ' : ''}
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
