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
import TableAds from './TableAds';
import './styles.css';

export interface Campaigns {
  key: number;
  name: string;
  status: boolean;
  ads: [
    {
      key: number;
      name: string;
      quantity: number;
    }
  ];
}

const ChildCamp = () => {
  const [counter, setCounter] = useState(2);
  const [subCampaigns, setSubCampaigns] = useState<Campaigns[]>([
    {
      key: 1,
      name: 'Chiến dịch con 1',
      status: true,
      ads: [
        {
          key: 1,
          name: 'Quảng cáo 1',
          quantity: 0,
        },
      ],
    },
  ]);
  const [itemActiveCamp, setItemActiveCamp] = useState<Campaigns>(
    subCampaigns[0]
  );

  console.log('subCampaigns', subCampaigns);

  function calculateTotalQuantity(items: any) {
    return items.reduce((total: any, item: any) => total + item.quantity, 0);
  }

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

  //Active Card when Clicked card
  const handleCard = (key: number) => {
    const itemNew: Campaigns = subCampaigns.find(
      (item) => item.key === key
    ) as Campaigns;

    setItemActiveCamp(itemNew);
  };

  const handleNameCamp = (key: number, e: any) => {
    const newItem: Campaigns = subCampaigns.find(
      (item) => item.key === key
    ) as Campaigns;
    if (newItem) {
      newItem.name = e.target.value;
    }
    setItemActiveCamp({ ...itemActiveCamp, name: e.target.value });
  };

  const handleCheckedChildCamp = (key: number, e: any) => {
    const newItem: Campaigns = subCampaigns.find(
      (item) => item.key === key
    ) as Campaigns;
    if (newItem) {
      newItem.status = e.target.checked;
    }
    setItemActiveCamp({ ...itemActiveCamp, status: e.target.checked });
  };

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
                  <Typography style={{ padding: '10px' }}>
                    {item.name}
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
                fullWidth
                required
                label='Tên chiến dịch con'
                variant='standard'
                value={itemActiveCamp.name}
                // defaultValue={itemActiveCamp.name}
                onChange={(e) => handleNameCamp(itemActiveCamp.key, e)}
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
          />
        </Box>
      </Box>
    </Box>
  );
};

export default ChildCamp;
