import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import {
  Box,
  Card,
  Checkbox,
  FormControlLabel,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import { useState } from 'react';
import { Campaigns } from '../App';
import TableAds from './TableAds';
import './styles.css';
import { FieldValues, UseFormRegister } from 'react-hook-form';

interface IChildCamp {
  subCampaigns: Campaigns[];
  setSubCampaigns: (e: Campaigns[]) => void;
  errorSubCamp: boolean;
  setErrorSubCamp: (e: boolean) => void
  errorNameAds: boolean;
  setErrorNameAds: (e: boolean) => void
  errorQuantity: boolean;
  setErrorQuantity: (e: boolean) => void
}

const ChildCamp = ({
  subCampaigns,
  setSubCampaigns,
  errorSubCamp, setErrorSubCamp,
  errorNameAds, setErrorNameAds,
  errorQuantity, setErrorQuantity,
}: IChildCamp) => {
  const [counter, setCounter] = useState(2);

  const [itemActiveCamp, setItemActiveCamp] = useState<Campaigns>(
    subCampaigns[0]
  );

  // calculate Total Quantity
  function calculateTotalQuantity(items: any) {
    return items.reduce((total: any, item: any) => total + item.quantity, 0);
  }

  // add subCamp
  const handleAddSubCampaigns = () => {
    setCounter(counter + 1);
    const newSubCam: Campaigns = {
      key: counter,
      name: `Chiến dịch con ${counter}`,
      status: true,
      ads: [
        {
          key: 1,
          name: 'Quảng cáo 1',
          quantity: 0,
        },
      ],
    };
    setSubCampaigns([...subCampaigns, newSubCam]);
  };

  // active Card when Clicked card
  const handleCard = (key: number) => {
    const itemNew: Campaigns = subCampaigns.find(
      (item) => item.key === key
    ) as Campaigns;

    setItemActiveCamp(itemNew);
  };

  // change name of Camp
  const handleNameCamp = (key: number, e: any) => {
    const newSubCampaign: any = subCampaigns.map((item: Campaigns) => {
      if (item.key === key) {
        return { ...item, name: e.target.value };
      }
      return item;
    });

    setSubCampaigns(newSubCampaign);

    setItemActiveCamp({ ...itemActiveCamp, name: e.target.value });

    setErrorSubCamp(false);
  };

  //checked Child Camp
  const handleCheckedChildCamp = (key: number, e: any) => {
    const newItem: Campaigns = subCampaigns.find(
      (item) => item.key === key
    ) as Campaigns;
    if (newItem) {
      newItem.status = e.target.checked;
    }

    setItemActiveCamp({ ...itemActiveCamp, status: e.target.checked });
  };

  //function short text
  const shortText = (text: string) => {
    const resultText = text.length > 45 ? text.slice(0, 45) + '...' : text
    return resultText;
  }

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          margin: '20px',
        }}
      >
        <IconButton onClick={handleAddSubCampaigns}>
          <ControlPointIcon
            fontSize='large'
            style={{ marginRight: 20, cursor: 'pointer' }}
          />
        </IconButton>
        <Box
          sx={{
            width: '100%',
            overflowY: 'auto',
            display: 'inline-block',
          }}
        >
          {subCampaigns.map((item) => {
            return (
              <Card
                key={item.key}
                className={
                  itemActiveCamp.key === item.key ? 'activeCard card' : 'card'
                }
                onClick={() => handleCard(item.key)}
              >
                <Tooltip title={item.name} arrow placement='top'>
                  <Typography className='titleCamp'>
                    {shortText(item.name)}
                    <CheckCircleRoundedIcon
                      fontSize='small'
                      color={item.status ? 'success' : 'action'}
                      style={{ position: 'relative', top: 3.5 }}
                    />
                  </Typography>
                </Tooltip>
                <Tooltip title='Số lượng' arrow placement='left'>
                  <Typography variant='h6'>
                    {calculateTotalQuantity(item.ads)}
                  </Typography>
                </Tooltip>
              </Card>
            );
          })}
        </Box>
      </Box>
      <Box>
        <Box sx={{ margin: '40px 0' }}>
          {itemActiveCamp && (
            <>
              <TextField
                // {...register('nameOfChildCamp', {
                //   required: 'Dữ liệu không hợp lệ',
                // })}
                fullWidth
                // error={!!errors?.nameOfChildCamp}
                // helperText={
                //   errors?.nameOfChildCamp
                //     ? errors.nameOfChildCamp.message?.toString()
                //     : ''
                // }
                name='subCamp'
                label='Tên chiến dịch con'
                variant='standard'
                required
                value={itemActiveCamp.name}
                onChange={(e) => handleNameCamp(itemActiveCamp.key, e)}
                error={errorSubCamp}
                helperText={
                  errorSubCamp
                    ? "Dữ liệu không hợp lệ"
                    : ''
                }
              />
              <FormControlLabel
                control={
                  <Checkbox
                    defaultChecked
                    checked={itemActiveCamp.status}
                    onChange={(e) =>
                      handleCheckedChildCamp(itemActiveCamp.key, e)
                    }
                  />
                }
                label='Đang hoạt động'
              />
            </>
          )}
        </Box>
        <Box>
          <Typography
            variant='h5'
            component='h5'
            style={{ textTransform: 'uppercase' }}
          >
            Danh sách quảng cáo
          </Typography>

          <TableAds
            itemActiveCamp={itemActiveCamp}
            setItemActiveCamp={setItemActiveCamp}
            subCampaigns={subCampaigns}
            setSubCampaigns={setSubCampaigns}
            errorNameAds={errorNameAds}
            setErrorNameAds={setErrorNameAds}
            errorQuantity={errorQuantity}
            setErrorQuantity={setErrorQuantity}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default ChildCamp;
