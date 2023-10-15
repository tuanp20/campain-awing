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
import { CleaningServices, TroubleshootOutlined } from '@mui/icons-material';

export interface typeAds {
  key: number;
  name: string;
  quantity: number;
}

export interface Campaigns {
  key: number;
  name: string;
  status: boolean;
  ads: typeAds[];
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
  const [errorSubCamp, setErrorSubCamp] = useState<boolean>(false);
  const [errorNameAds, setErrorNameAds] = useState<boolean>(false);
  const [errorQuantity, setErrorQuantity] = useState<boolean>(false);

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
    setError(false);
  };

  //onSubmit form and format data
  const onSubmit = (event: any) => {
    event.preventDefault();
    if (inputs.name.length < 0 || inputs.name.trim() === '') {
      setError(true);
      alert('Thông tin chưa được điền');
      return;
    }

    subCampaigns.map((itemSub: any) => {
      // event.preventDefault();

      if (itemSub.name.length < 0 || itemSub.name.trim() === '') {
        setErrorSubCamp(true);
        alert('Thông tin chưa được điền');
        return;
      }
      itemSub.ads.map((itemAds: any) => {
        if (itemAds.name.length < 0 || itemAds.name.trim() === '') {
          setErrorNameAds(true);
          alert('Thông tin chưa được điền');
          return;
        }
        if (itemAds.quantity < 0 || itemAds.quantity === 0) {
          setErrorQuantity(true);
          alert('Thông tin chưa được điền');
          return;
        }
      });
    });


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
        onSubmit={onSubmit}
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
                error={error}
              />
            </TabPanel>
            <TabPanel value='2'>
              <ChildCamp
                subCampaigns={subCampaigns}
                setSubCampaigns={setSubCampaigns}
                errorSubCamp={errorSubCamp}
                setErrorSubCamp={setErrorSubCamp}
                errorNameAds={errorNameAds}
                setErrorNameAds={setErrorNameAds}
                errorQuantity={errorQuantity}
                setErrorQuantity={setErrorQuantity}
              />
            </TabPanel>
          </TabContext>
        </Card>
      </Box>
    </>
  );
}

export default App;
