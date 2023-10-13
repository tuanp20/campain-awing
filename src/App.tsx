import { TabContext } from '@mui/lab';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Box, Card, Divider, Tab } from '@mui/material';
import Button from '@mui/material/Button';
import React, { useState } from 'react';
import './App.css';
import ChildCamp from './components/ChildCamp';
import InfoCamp from './components/InfoCamp';

function App() {
  const [value, setValue] = useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
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
              <InfoCamp />
            </TabPanel>
            <TabPanel value='2'>
              <ChildCamp />
            </TabPanel>
          </Box>
        </TabContext>
      </Card>
    </div>
  );
}

export default App;
