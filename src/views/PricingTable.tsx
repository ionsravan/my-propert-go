// // ** MUI Imports
// import Box from '@mui/material/Box'
// import Table from '@mui/material/Table'
// import Button from '@mui/material/Button'
// import TableRow from '@mui/material/TableRow'
// import TableHead from '@mui/material/TableHead'
// import TableBody from '@mui/material/TableBody'
// import TableCell from '@mui/material/TableCell'
// import Typography from '@mui/material/Typography'
// import TableContainer from '@mui/material/TableContainer'

// // ** Icon Imports
// // import Icon from 'src/@core/components/icon'

// // ** Custom Components Imports
// // import CustomChip from 'src/@core/components/mui/chip'

// // ** Types
// // import { PricingDataType, PricingTableRowType } from 'src/@core/components/plan-details/types'

// interface Props {
//   data: PricingDataType | null
// }

// const PricingTable = ({ data }: Props) => {
//   const renderTableCell = (row: PricingTableRowType) => {
//     if (typeof row.pro === 'boolean') {
//       return <Icon fontSize={20} icon={row.pro ? 'mdi:check-circle' : 'mdi:close-circle'} />
//     } else {
//       return <CustomChip size='small' skin='light' label={row.pro} color='primary' sx={{ lineHeight: 1 }} />
//     }
//   }

//   return data && data.pricingTable ? (
//     <div>
//       <Box sx={{ mb: 12, textAlign: 'center' }}>
//         <Typography variant='h5' sx={{ mb: 2.5 }}>
//           Pick a plan that works best for you
//         </Typography>
//         <Typography variant='body2'>Stay cool, we have a 48-hour money back guarantee!</Typography>
//       </Box>

//       <Box
//         sx={{
//           mt: 8,
//           borderRadius: 1,
//           border: '1px solid',
//           borderColor: 'divider',
//           '& .MuiTableRow-root:nth-of-type(even)': { backgroundColor: 'action.hover' }
//         }}
//       >
//         <TableContainer>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 {data.pricingTable.header.map((head, index) => (
//                   <TableCell key={index}>
//                     <Box
//                       sx={{
//                         display: 'flex',
//                         flexDirection: 'column',
//                         alignItems: index === 0 ? 'flex-start' : 'center'
//                       }}
//                     >
//                       {head.isPro ? (
//                         <Box
//                           sx={{
//                             position: 'relative',
//                             '& svg': { top: -10, right: -25, position: 'absolute', color: 'primary.main' }
//                           }}
//                         >
//                           <Typography noWrap sx={{ fontSize: '.75rem', fontWeight: 600, letterSpacing: '.17px' }}>
//                             {head.title}
//                           </Typography>
//                           {head.isPro ? <Icon icon='mdi:star-circle' /> : null}
//                         </Box>
//                       ) : (
//                         <Typography noWrap sx={{ fontSize: '.75rem', fontWeight: 600, letterSpacing: '.17px' }}>
//                           {head.title}
//                         </Typography>
//                       )}
//                       <Typography
//                         noWrap
//                         sx={{ fontSize: '.75rem', letterSpacing: '.4px', textTransform: 'capitalize' }}
//                       >
//                         {head.subtitle}
//                       </Typography>
//                     </Box>
//                   </TableCell>
//                 ))}
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {data.pricingTable.rows.map((row, index) => (
//                 <TableRow key={index}>
//                   <TableCell sx={{ whiteSpace: 'nowrap' }}>{row.feature}</TableCell>
//                   <TableCell
//                     align='center'
//                     sx={{ '& svg': { verticalAlign: 'middle', color: row.starter ? 'primary.main' : 'text.disabled' } }}
//                   >
//                     <Icon fontSize={20} icon={row.starter ? 'mdi:check-circle' : 'mdi:close-circle'} />
//                   </TableCell>
//                   <TableCell
//                     align='center'
//                     sx={{ '& svg': { verticalAlign: 'middle', color: row.pro ? 'primary.main' : 'text.disabled' } }}
//                   >
//                     {renderTableCell(row)}
//                   </TableCell>
//                   <TableCell
//                     align='center'
//                     sx={{
//                       '& svg': { verticalAlign: 'middle', color: row.enterprise ? 'primary.main' : 'text.disabled' }
//                     }}
//                   >
//                     <Icon fontSize={20} icon={row.enterprise ? 'mdi:check-circle' : 'mdi:close-circle'} />
//                   </TableCell>
//                 </TableRow>
//               ))}
//               <TableRow sx={{ '& .MuiTableCell-root': { border: 0 } }}>
//                 <TableCell></TableCell>
//                 <TableCell align='center' sx={{ whiteSpace: 'nowrap' }}>
//                   <Button variant='outlined'>Choose Plan</Button>
//                 </TableCell>
//                 <TableCell align='center' sx={{ whiteSpace: 'nowrap' }}>
//                   <Button variant='contained'>Choose Plan</Button>
//                 </TableCell>
//                 <TableCell align='center' sx={{ whiteSpace: 'nowrap' }}>
//                   <Button variant='outlined'>Choose Plan</Button>
//                 </TableCell>
//               </TableRow>
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </Box>
//     </div>
//   ) : null
// }

// export default PricingTable


import React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import Icon from '@mui/icons-material';



const sampleData = {
  pricingTable: {
    header: [
      { title: 'Features', subtitle: 'Standard', isPro: false },
      { title: 'Starter', subtitle: 'Pro', isPro: true },
      { title: 'Enterprise', subtitle: 'Pro+', isPro: true },
    ],
    rows: [
      { feature: 'Feature 1', starter: true, pro: true, enterprise: true },
      { feature: 'Feature 2', starter: false, pro: true, enterprise: false },
      { feature: 'Feature 3', starter: true, pro: false, enterprise: true },
    ],
  },
};

// Types
type PricingTableRowType = {
  feature: string;
  starter: boolean;
  pro: boolean;
  enterprise: boolean;
};

type PricingHeaderType = {
  title: string;
  subtitle: string;
  isPro: boolean;
};

type PricingDataType = {
  pricingTable: {
    header: PricingHeaderType[];
    rows: PricingTableRowType[];
  };
};

interface Props {
  data: PricingDataType | null;
}

const PricingTable = ({ data }: Props) => {
  const renderTableCell = (row: PricingTableRowType, header: PricingHeaderType) => {
    if (typeof row[header.subtitle.toLowerCase()] === 'boolean') {
      return <Icon fontSize={20} color={row[header.subtitle.toLowerCase()] ? 'primary' : 'error'}>{row[header.subtitle.toLowerCase()] ? 'check_circle' : 'cancel'}</Icon>;
    } else {
      return (
        <Button variant={row[header.subtitle.toLowerCase()] ? 'contained' : 'outlined'} color="primary">
          {row[header.subtitle.toLowerCase()] ? 'Choose Plan' : 'Not Available'}
        </Button>
      );
    }
  };

  return data && data.pricingTable ? (
    <div>
      <Box sx={{ mb: 12, textAlign: 'center' }}>
        <Typography variant='h5' sx={{ mb: 2.5 }}>
          Pick a plan that works best for you
        </Typography>
        <Typography variant='body2'>Stay cool, we have a 48-hour money back guarantee!</Typography>
      </Box>

      <Box
        sx={{
          mt: 8,
          borderRadius: 1,
          border: '1px solid',
          borderColor: 'divider',
          '& .MuiTableRow-root:nth-of-type(even)': { backgroundColor: 'action.hover' }
        }}
      >
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {data.pricingTable.header.map((head, index) => (
                  <TableCell key={index}>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: index === 0 ? 'flex-start' : 'center'
                      }}
                    >
                      {head.isPro ? (
                        <Box
                          sx={{
                            position: 'relative',
                            '& svg': { top: -10, right: -25, position: 'absolute', color: 'primary.main' }
                          }}
                        >
                          <Typography noWrap sx={{ fontSize: '.75rem', fontWeight: 600, letterSpacing: '.17px' }}>
                            {head.title}
                          </Typography>
                          {head.isPro ? <Icon fontSize="small" color="primary">star_circle</Icon> : null}
                        </Box>
                      ) : (
                        <Typography noWrap sx={{ fontSize: '.75rem', fontWeight: 600, letterSpacing: '.17px' }}>
                          {head.title}
                        </Typography>
                      )}
                      <Typography noWrap sx={{ fontSize: '.75rem', letterSpacing: '.4px', textTransform: 'capitalize' }}>
                        {head.subtitle}
                      </Typography>
                    </Box>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.pricingTable.rows.map((row, index) => (
                <TableRow key={index}>
                  <TableCell sx={{ whiteSpace: 'nowrap' }}>{row.feature}</TableCell>
                  {data.pricingTable.header.map((header, headerIndex) => (
                    <TableCell align='center' key={headerIndex}>
                      {renderTableCell(row, header)}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  ) : null;
};

// export default PricingTable;



const App = () => {
  return (
    <div>
      <PricingTable data={sampleData} />
    </div>
  );
};

export default App;
