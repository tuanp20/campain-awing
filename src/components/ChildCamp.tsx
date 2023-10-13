import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import {
  Box,
  Button,
  Card,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from '@mui/material';
import { useState, useEffect } from 'react';
import TableAds from './TableAds';
import Tooltip from '@mui/material/Tooltip';
import './styles.css';

interface Campaigns {
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
  const [itemActiveCamp, setItemActiveCamp] = useState<any>(subCampaigns[0]);

  const [checkedChildCamp, setCheckedChildCamp] = useState<boolean>(
    itemActiveCamp.status
  );

  const handleAddSubCampaigns = () => {
    setCounter(counter + 1);
    const newSubCam: Campaigns = {
      key: counter,
      name: `Chiến dịch con ${counter}`,
      status: true,
      ads: [
        {
          key: counter,
          name: 'Quảng cáo 1',
          quantity: 0,
        },
      ],
    };
    setSubCampaigns([...subCampaigns, newSubCam]);
  };

  const handleCard = (value: any) => {
    const itemNew: any = subCampaigns.find((item) => item.key === value);
    setItemActiveCamp(itemNew);
  };

  const handleNameCamp = (key: any, e: any) => {
    const newItem: Campaigns = subCampaigns.find(
      (item) => item.key === key
    ) as Campaigns;
    if (newItem) {
      newItem.name = e.target.value;
    }
  };
  const handleCheckedChildCamp = () => {
    setCheckedChildCamp(!checkedChildCamp);
    setItemActiveCamp({ ...itemActiveCamp, status: checkedChildCamp });
  };

  console.log('subCampaigns', subCampaigns);
  console.log('itemActiveCamp', itemActiveCamp);

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          margin: '20px',
        }}
      >
        <Button onClick={handleAddSubCampaigns}>
          <ControlPointIcon
            fontSize='large'
            style={{ marginRight: 20, cursor: 'pointer' }}
          />
        </Button>
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
                style={{
                  width: 210,
                  height: 120,
                  textAlign: 'center',
                  margin: '10px',
                  float: 'left',
                  cursor: 'pointer',
                  position: 'relative',
                  // border: ({campActive === item.key ? '2px solid rgb(33, 150, 243)' : ''}),
                }}
                // className={'activeCard'}
                onClick={() => handleCard(item.key)}
              >
                <Typography style={{ padding: '10px' }}>
                  {item.name}
                  <CheckCircleRoundedIcon
                    fontSize='small'
                    color={checkedChildCamp ? 'success' : 'action'}
                    style={{ position: 'relative', top: 3.5 }}
                  />
                </Typography>
                <Tooltip title='Số lượng' arrow placement='left'>
                  <Typography variant='h6'>0</Typography>
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
                // value={itemActiveCamp.name}
                defaultValue={itemActiveCamp.name}
                onChange={(e) => handleNameCamp(itemActiveCamp.key, e)}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    defaultChecked
                    checked={itemActiveCamp.status}
                    onChange={handleCheckedChildCamp}
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
          />
        </Box>
      </Box>
    </Box>
  );
};

export default ChildCamp;
