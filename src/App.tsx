import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import { TabContext } from '@mui/lab';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import {
  Box,
  Card,
  CardActionArea,
  Checkbox,
  Divider,
  FormControlLabel,
  IconButton,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import Button from '@mui/material/Button';
import React, { useState } from 'react';
import './App.css';
import DeleteIcon from '@mui/icons-material/Delete';
import Paper from '@mui/material/Paper';

interface Campaigns {
  key: number;
  name: string;
  status: boolean;
  ads: [
    {
      name: string;
      quantity: number;
    }
  ];
}

function App() {
  const [value, setValue] = useState('1');
  const [counter, setCounter] = useState(2);
  const [counterAds, setCounterAds] = useState(2);
  const [campActive, setCampActive] = useState<number>();
  const [subCampaigns, setSubCampaigns] = useState<Campaigns[]>([
    {
      key: 1,
      name: 'Chiến dịch con 1',
      status: true,
      ads: [
        {
          name: 'Quảng cáo 1',
          quantity: 0,
        },
      ],
    },
  ]);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const handleAddSubCampaigns = () => {
    setCounter(counter + 1);
    const newSubCam: Campaigns = {
      key: counter,
      name: `Chiến dịch con ${counter}`,
      status: true,
      ads: [
        {
          name: 'Quảng cáo 1',
          quantity: 0,
        },
      ],
    };
    setSubCampaigns([...subCampaigns, newSubCam]);
  };

  const handleNameCamp = (e: any) => {
    console.log('e.target.value', e.target.value);
    const itemActive = subCampaigns.filter((item) => item.key === campActive);
    // console.log('itemActive', itemActive);
    // if (itemActive) {
    //   itemActive[0].name = e.target.value;
    // }
    // setSubCampaigns([...subCampaigns, ]);
  };

  const handleCard = (e: any) => {
    setCampActive(1);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      console.log('event.target.checked', event.target.checked);
      //   const newSelected = rows.map((n) => n.name);
      // setSelected(newSelected);
      return;
    }
    // setSelected([]);
  };

  const handleAdditem = () => {
    setCounterAds(counterAds + 1);

    const newItem = {
      name: `Quảng cáo ${counterAds}`,
      quantity: 0,
    };
    // setAds([...ads, newItem]);
  };

  return (
    <div>
      <Button variant='contained' style={{ margin: 10 }}>
        Submit
      </Button>
      <Divider variant='middle' />
      <Card sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label='lab API tabs example'>
              <Tab label='Thông tin' value='1' />
              <Tab label='Chiến dịch con' value='2' />
            </TabList>
          </Box>
          <Box component={'form'} noValidate={false}>
            <TabPanel value='1'>
              <Box>
                <TextField
                  required
                  label='Tên chiến dịch'
                  variant='standard'
                  fullWidth
                />
                <TextField label='Mô tả' variant='standard' fullWidth />
              </Box>
            </TabPanel>
            <TabPanel value='2'>
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
                          margin: '20px',
                          float: 'left',
                          cursor: 'pointer',
                          border: '2px solid rgb(33, 150, 243)',
                          position: 'relative',
                        }}
                        onClick={handleCard}
                      >
                        <Typography style={{ padding: '10px' }}>
                          {item.name}
                          <CheckCircleRoundedIcon
                            fontSize='small'
                            color='success'
                            style={{ position: 'relative', top: 3.5 }}
                          />
                        </Typography>
                        <Typography variant='h6'>20</Typography>
                      </Card>
                    );
                  })}
                </Box>
              </Box>
              <Box sx={{ margin: '40px 0' }}>
                <TextField
                  // style={{ width: '300px' }}
                  fullWidth
                  required
                  label='Tên chiến dịch con'
                  variant='standard'
                  defaultValue={'Chiến dịch con 1'}
                  onChange={handleNameCamp}
                />
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label='Đang hoạt động'
                />
              </Box>
              <Box>
                <Typography variant='h5' component='h5'>
                  Danh sách quảng cáo
                </Typography>

                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                    <TableHead>
                      <TableRow>
                        <TableCell width={20}>
                          <Checkbox onChange={handleSelectAllClick} />
                        </TableCell>
                        <TableCell>Tên quảng cáo*</TableCell>
                        <TableCell>Số lượng*</TableCell>
                        <TableCell align='right'>
                          <Button
                            style={{
                              padding: '5px 15px',
                              border: '2px solid rgb(33, 150, 243)',
                            }}
                            onClick={handleAdditem}
                          >
                            + Thêm
                          </Button>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {subCampaigns[0].ads.map((item) => {
                        return (
                          <TableRow
                            sx={{
                              '&:last-child td, &:last-child th': { border: 0 },
                            }}
                          >
                            <TableCell component='th' scope='row'>
                              <Checkbox name='camp' />
                            </TableCell>
                            <TableCell>
                              <TextField
                                required
                                variant='standard'
                                fullWidth
                                value={item.name}
                              />
                            </TableCell>
                            <TableCell>
                              <TextField
                                type='number'
                                required
                                variant='standard'
                                fullWidth
                                value={item.quantity}
                              />
                            </TableCell>
                            <TableCell align='right'>
                              <IconButton>
                                <DeleteIcon />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </TabPanel>
          </Box>
        </TabContext>
      </Card>
    </div>
  );
}

export default App;
