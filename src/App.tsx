import { TabContext } from '@mui/lab';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Box, Card, Divider, Tab } from '@mui/material';
import Button from '@mui/material/Button';
import React, { useState } from 'react';
import './App.css';
import ChildCamp from './components/ChildCamp';
import InfoCamp from './components/InfoCamp';

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

export interface IInputs {
  name: string;
  describe: string;
}

function App() {
  const initInputs: IInputs = {
    name: '',
    describe: '',
  };

  const initSubCampaigns: Campaigns[] = [
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
  ];

  const [value, setValue] = useState<string>('1');
  const [inputs, setInputs] = useState(initInputs);
  const [subCampaigns, setSubCampaigns] =
    useState<Campaigns[]>(initSubCampaigns);
  const [errorNameOfCamp, setErrorNameOfCamp] = useState<boolean>(false);
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
    setErrorNameOfCamp(false);
  };

  //onSubmit form and format data
  const onSubmit = (event: any) => {
    event.preventDefault();
    let valid = true;

    if (inputs.name.length < 0 || inputs.name.trim() === '') {
      setErrorNameOfCamp(true);
      valid = false;
    }

    subCampaigns.map((itemSub: any) => {
      if (itemSub.name.length < 0 || itemSub.name.trim() === '') {
        setErrorSubCamp(true);
        valid = false;
      }
      if (itemSub.ads.length === 0) {
        valid = false;
      }

      itemSub.ads.map((itemAds: any) => {
        if (itemAds.name.length < 0 || itemAds.name.trim() === '') {
          setErrorNameAds(true);
          valid = false;
        }
        if (itemAds.quantity < 0 || itemAds.quantity === 0) {
          setErrorQuantity(true);
          valid = false;
        }
      });
    });

    if (!valid) {
      alert('Vui lòng điền đúng và đầy đủ thông tin');
      return false;
    }

    //handle data
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

    setInputs(initInputs);
    setSubCampaigns(initSubCampaigns);
    setValue('1');
  };

  return (
    <>
      <Box component={'form'} noValidate={true} onSubmit={onSubmit}>
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
                errorNameOfCamp={errorNameOfCamp}
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
