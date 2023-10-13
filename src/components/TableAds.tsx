import { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Checkbox, IconButton, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import FormControlLabel from '@mui/material/FormControlLabel';

export default function TableAds(props: any) {
  const { itemActiveCamp, setItemActiveCamp } = props;
  const [counter, setCounter] = useState(2);
  const [selected, setSelected] = useState<string[]>([]);

  const [ads, setAds] = useState(itemActiveCamp?.ads || null);

  console.log('ads', ads);

  const handleAddItem = () => {
    setCounter(counter + 1);

    const newItem = {
      key: counter,
      name: `Quảng cáo ${counter}`,
      quantity: 0,
    };

    setAds([...ads, newItem]);
    setItemActiveCamp({
      ...itemActiveCamp,
      ads: [...itemActiveCamp.ads, newItem],
    });
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const checkedAll = ads.map((item: any) => String(item.key));
      setSelected(checkedAll);
    } else {
      setSelected([]);
    }
  };

  const handleDeleteItem = (key: any) => {
    const deleteItem = ads.filter((item: any) => item.key !== key);
    setAds(deleteItem);
  };

  const handleCheckedItem = (e: React.ChangeEvent<HTMLInputElement>) => {
    const key = selected.indexOf(e.target.value);
    if (key === -1) {
      setSelected([...selected, e.target.value]);
    } else {
      setSelected(selected.filter((item) => item !== e.target.value));
    }
  };

  const handleDeleteChecked = () => {
    const newItem = ads.filter(
      (item: any) => !selected.includes(String(item.key))
    );
    setAds(newItem);
    setSelected([]);
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
                <IconButton onClick={handleDeleteChecked}>
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
                onClick={handleAddItem}
              >
                + Thêm
              </Button>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {ads?.map((item: any) => {
            return (
              <TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component='th' scope='row'>
                  <Checkbox
                    name='camp'
                    onChange={handleCheckedItem}
                    value={item.key}
                    checked={selected.includes(String(item.key))}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    required
                    variant='standard'
                    fullWidth
                    defaultValue={item.name}
                    // value={item.name}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    type='number'
                    required
                    variant='standard'
                    fullWidth
                    defaultValue={item.quantity}
                    // value={item.quantity}
                  />
                </TableCell>
                <TableCell align='right'>
                  <IconButton
                    onClick={() => handleDeleteItem(item.key)}
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
