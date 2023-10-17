import DeleteIcon from '@mui/icons-material/Delete';
import { Button, Checkbox, IconButton, TextField } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useEffect, useState } from 'react';
import { Campaigns, typeAds } from '../App';

interface ITableAds {
  itemActiveCamp: Campaigns;
  setItemActiveCamp: (e: Campaigns) => void;
  subCampaigns: Campaigns[];
  setSubCampaigns: (e: Campaigns[]) => void;
  errorNameAds: boolean;
  setErrorNameAds: (e: boolean) => void;
  errorQuantity: boolean;
  setErrorQuantity: (e: boolean) => void;
}

export default function TableAds({
  itemActiveCamp,
  setItemActiveCamp,
  subCampaigns,
  setSubCampaigns,
  errorNameAds,
  setErrorNameAds,
  errorQuantity,
  setErrorQuantity,
}: ITableAds) {
  useEffect(() => {
    setAds(itemActiveCamp?.ads);
    setCounter(
      itemActiveCamp?.ads[itemActiveCamp?.ads.length - 1]?.key + 1 || 1
    );
  }, [itemActiveCamp]);

  const [counter, setCounter] = useState(
    itemActiveCamp?.ads[itemActiveCamp?.ads.length - 1]?.key + 1 || 1
  );
  const [selected, setSelected] = useState<string[]>([]);

  const initStateAds: typeAds[] = itemActiveCamp?.ads || null;

  const [ads, setAds] = useState<typeAds[]>(initStateAds);

  /////////////////////////////////////
  const setData = (keyActive: number, newAds: typeAds[]) => {
    const newSubCampaign: any = subCampaigns.map((item: Campaigns) => {
      if (item.key === keyActive) {
        return { ...item, ads: newAds };
      }
      return item;
    });

    setItemActiveCamp({ ...itemActiveCamp, ads: newAds });

    setSubCampaigns(newSubCampaign);
  };

  //Add Ads
  const handleAddItem = (key: number) => {
    setCounter(counter + 1);

    const newItem = {
      key: counter,
      name: `Quảng cáo ${counter}`,
      quantity: 0,
    };

    setAds([...ads, newItem]);

    //Thêm cả ở thằng đang active nữa
    setItemActiveCamp({ ...itemActiveCamp, ads: [...ads, newItem] });

    setData(key, [...ads, newItem]);
  };

  // checked all
  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const checkedAll = ads.map((item: typeAds) => String(item.key));
      setSelected(checkedAll);
    } else {
      setSelected([]);
    }
  };

  // delete item of ads
  const handleDeleteItem = (key: number, keySubCamp: number) => {
    const deleteItem = ads.filter((item: typeAds) => item.key !== key);
    setAds(deleteItem);

    setData(keySubCamp, deleteItem);
  };

  // checked item
  const handleCheckedItem = (e: React.ChangeEvent<HTMLInputElement>) => {
    const key = selected.indexOf(e.target.value);
    if (key === -1) {
      setSelected([...selected, e.target.value]);
    } else {
      setSelected(selected.filter((item) => item !== e.target.value));
    }
  };

  // delete item checked
  const handleDeleteChecked = (key: number) => {
    const newItem = ads.filter(
      (item: typeAds) => !selected.includes(String(item.key))
    );
    setAds(newItem);

    setData(key, newItem);

    setSelected([]);
  };

  // change quantity of ads
  const handleQuantityOfAds = (
    key: number,
    e: React.ChangeEvent<HTMLInputElement>,
    keyActive: number
  ) => {
    const newAds = ads.map((item: typeAds) => {
      if (item.key === key) {
        return { ...item, quantity: Number(e.target.value) };
      }
      return item;
    });
    setAds(newAds);

    setData(keyActive, newAds);

    setErrorQuantity(false);
  };

  //change name of ads
  const handleNameOfAds = (
    key: number,
    e: React.ChangeEvent<HTMLInputElement>,
    keyActive: number
  ) => {
    const newAds = ads.map((item: typeAds) => {
      if (item.key === key) {
        return { ...item, name: e.target.value };
      }
      return item;
    });
    setAds(newAds);

    setData(keyActive, newAds);

    setErrorNameAds(false);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell width={20}>
              <FormControlLabel
                label=''
                control={
                  <Checkbox
                    onChange={handleSelectAllClick}
                    indeterminate={selected.length > 0}
                    checked={selected.length > 0}
                  />
                }
              />
            </TableCell>
            <TableCell>
              {selected.length > 0 ? (
                <IconButton
                  onClick={() => handleDeleteChecked(itemActiveCamp.key)}
                >
                  <DeleteIcon />
                </IconButton>
              ) : (
                'Tên quảng cáo*'
              )}
            </TableCell>
            <TableCell>{selected.length > 0 ? '' : 'Số lượng*'}</TableCell>
            <TableCell align='right'>
              <Button
                style={{
                  padding: '5px 15px',
                  border: '2px solid rgb(33, 150, 243)',
                }}
                onClick={() => handleAddItem(itemActiveCamp.key)}
              >
                + Thêm
              </Button>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {ads?.map((item: typeAds) => {
            return (
              <TableRow
                key={item.key}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component='th' scope='row'>
                  <FormControlLabel
                    label=''
                    control={
                      <Checkbox
                        name='camp'
                        onChange={handleCheckedItem}
                        value={item.key}
                        checked={selected.includes(String(item.key))}
                      />
                    }
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    name='nameOfAds'
                    required
                    error={errorNameAds}
                    variant='standard'
                    fullWidth
                    value={item.name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleNameOfAds(item.key, e, itemActiveCamp.key)
                    }
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    name='quantityOfAds'
                    type='number'
                    required
                    error={errorQuantity}
                    variant='standard'
                    fullWidth
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleQuantityOfAds(item.key, e, itemActiveCamp.key)
                    }
                    value={item.quantity}
                  />
                </TableCell>
                <TableCell align='right'>
                  <IconButton
                    onClick={() =>
                      handleDeleteItem(item.key, itemActiveCamp.key)
                    }
                    disabled={selected.length > 0}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
