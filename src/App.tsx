import { TabContext } from '@mui/lab';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Box, Card, Divider, Tab, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import React, { useState } from 'react';
import './App.css';
import ChildCamp from './components/ChildCamp';
import InfoCamp from './components/InfoCamp';
import { useForm } from 'react-hook-form';

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

function App() {
  const [value, setValue] = useState<string>('1');
  const [inputs, setInputs] = useState({
    name: '',
    describe: '',
  });
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
  const [error, setError] = useState<boolean>(false);

  // handle when change tab
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  // handle when change input
  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //onSubmit form and format data
  const onSubmit = (data: any) => {
    console.log('data', data);

    const newSubCampaigns = subCampaigns.map((itemSub: any) => {
      delete itemSub.key;
      itemSub.ads.map((itemAds: any) => {
        delete itemAds.key;
        return { ...itemAds };
      });
      return { ...itemSub };
    });

    const newData = {
      campaign: { information: inputs, subCampaigns: newSubCampaigns },
    };

    alert(JSON.stringify(newData));
  };

  return (
    <>
      <Box
        component={'form'}
        noValidate={true}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Button variant='contained' style={{ margin: 10 }} type='submit'>
          Submit
        </Button>
        <Divider variant='middle' />
        <Card sx={{ width: '100%', typography: 'body1' }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange}>
                <Tab label='Thông tin' value='1' />
                <Tab label='Chiến dịch con' value='2' />
              </TabList>
            </Box>
            <TabPanel value='1'>
              <InfoCamp
                inputs={inputs}
                handleChangeInput={handleChangeInput}
                register={register}
                errors={errors}
              />
            </TabPanel>
            <TabPanel value='2'>
              <ChildCamp
                subCampaigns={subCampaigns}
                setSubCampaigns={setSubCampaigns}
                register={register}
                errors={errors}
              />
            </TabPanel>
          </TabContext>
        </Card>
      </Box>
    </>
  );
}

export default App;
