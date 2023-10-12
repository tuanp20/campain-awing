// import { useState } from 'react';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
// import { Button, Checkbox, IconButton, TextField } from '@mui/material';
// import DeleteIcon from '@mui/icons-material/Delete';

// interface IProps {
//   adsData: [
//     {
//         name: string;
//         quantity: number;
//     }
//   ];
// }

// export default function BasicTable({ adsData }: IProps) {
//   const [counter, setCounter] = useState(2);
//   const [selected, setSelected] = useState([]);

//   const [ads, setAds] = useState(adsData);

//   const handleAdditem = () => {
//     setCounter(counter + 1);

//     const newItem = {
//       name: `Quảng cáo ${counter}`,
//       quantity: 0,
//     };
//     setAds([...ads, newItem]);
//   };

//   const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
//     if (event.target.checked) {
//       console.log('event.target.checked', event.target.checked);
//       //   const newSelected = rows.map((n) => n.name);
//       // setSelected(newSelected);
//       return;
//     }
//     setSelected([]);
//   };

//   return (
//     <TableContainer component={Paper}>
//       <Table sx={{ minWidth: 650 }} aria-label='simple table'>
//         <TableHead>
//           <TableRow>
//             <TableCell width={20}>
//               <Checkbox onChange={handleSelectAllClick} />
//             </TableCell>
//             <TableCell>Tên quảng cáo*</TableCell>
//             <TableCell>Số lượng*</TableCell>
//             <TableCell align='right'>
//               <Button
//                 style={{
//                   padding: '5px 15px',
//                   border: '2px solid rgb(33, 150, 243)',
//                 }}
//                 onClick={handleAdditem}
//               >
//                 + Thêm
//               </Button>
//             </TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {ads.map((item) => {
//             return (
//               <TableRow
//                 sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
//               >
//                 <TableCell component='th' scope='row'>
//                   <Checkbox name='camp' />
//                 </TableCell>
//                 <TableCell>
//                   <TextField
//                     required
//                     variant='standard'
//                     fullWidth
//                     value={item.name}
//                   />
//                 </TableCell>
//                 <TableCell>
//                   <TextField
//                     type='number'
//                     required
//                     variant='standard'
//                     fullWidth
//                     value={item.quantity}
//                   />
//                 </TableCell>
//                 <TableCell align='right'>
//                   <IconButton>
//                     <DeleteIcon />
//                   </IconButton>
//                 </TableCell>
//               </TableRow>
//             );
//           })}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// }

import React from 'react';

const TableAds = () => {
  return <div>TableAds</div>;
};

export default TableAds;
