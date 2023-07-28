import React from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import Iconify from '../components/iconify';

export const products_columns: GridColDef[] = [
  {
    field: 'sku',
    headerName: 'SKU',
    width: 200,
    disableColumnMenu: true,
  },
  {
    field: 'product_name',
    headerName: 'Name',
    width: 200,
    disableColumnMenu: true,
  },

  {
    field: 'is_hot',
    headerName: 'Hot or Cold ',
    width: 200,
    disableColumnMenu: true,
    renderCell: (params) => <Box>{params?.row?.is_hot ? 'Hot' : 'Cold'} </Box>,
  },

  {
    field: 'price',
    headerName: 'Price',
    width: 200,
    disableColumnMenu: true,
    renderCell: (params) => <Box>${params?.row?.price.toFixed(2)} </Box>,
  },
  {
    field: 'notes',
    headerName: 'Notes',
    width: 300,
    disableColumnMenu: true,
    renderCell: (params) => (
      <Box>
        <Typography
          sx={{
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            width: '270px',
            fontSize: '14px',
          }}
        >
          {params?.row?.notes}
        </Typography>
      </Box>
    ),
  },
  {
    field: 'created_at',
    headerName: 'Created At',
    width: 200,
    disableColumnMenu: true,
  },
  {
    field: 'updated_at',
    headerName: 'Updated At',
    width: 200,
    disableColumnMenu: true,
  },

  {
    field: 'action',
    headerName: '',
    flex: 1,
    sortable: false,
    filterable: false,
    disableColumnMenu: true,
    align: 'right',
    headerAlign: 'center',
    renderCell: (params) => (
      <IconButton>
        <Iconify icon="eva:more-vertical-fill" />
      </IconButton>
    ),
  },
];

export const product_categories_columns: GridColDef[] = [
  {
    field: 'name',
    headerName: 'Name',
    width: 200,
    disableColumnMenu: true,
  },
  {
    field: 'description',
    headerName: 'Description',
    width: 200,
    disableColumnMenu: true,
  },
  {
    field: 'created_at',
    headerName: 'Created At',
    width: 200,
    disableColumnMenu: true,
  },
  {
    field: 'updated_at',
    headerName: 'Updated At',
    width: 200,
    disableColumnMenu: true,
  },

  {
    field: 'action',
    headerName: '',
    flex: 1,
    sortable: false,
    filterable: false,
    disableColumnMenu: true,
    align: 'right',
    headerAlign: 'center',
    renderCell: (params) => (
      <IconButton>
        <Iconify icon="eva:more-vertical-fill" />
      </IconButton>
    ),
  },
];

export const product_types_columns: GridColDef[] = [
  {
    field: 'name',
    headerName: 'Name',
    width: 200,
    disableColumnMenu: true,
  },

  {
    field: 'created_at',
    headerName: 'Created At',
    width: 200,
    disableColumnMenu: true,
  },
  {
    field: 'updated_at',
    headerName: 'Updated At',
    width: 200,
    disableColumnMenu: true,
  },

  {
    field: 'action',
    headerName: '',
    flex: 1,
    sortable: false,
    filterable: false,
    disableColumnMenu: true,
    align: 'right',
    headerAlign: 'center',
    renderCell: (params) => (
      <IconButton>
        <Iconify icon="eva:more-vertical-fill" />
      </IconButton>
    ),
  },
];

export const allocation_types_columns: GridColDef[] = [
  {
    field: 'name',
    headerName: 'Name',
    width: 200,
    disableColumnMenu: true,
  },

  {
    field: 'created_at',
    headerName: 'Created At',
    width: 200,
    disableColumnMenu: true,
  },
  {
    field: 'updated_at',
    headerName: 'Updated At',
    width: 200,
    disableColumnMenu: true,
  },

  {
    field: 'action',
    headerName: '',
    flex: 1,
    sortable: false,
    filterable: false,
    disableColumnMenu: true,
    align: 'right',
    headerAlign: 'center',
    renderCell: (params) => (
      <IconButton>
        <Iconify icon="eva:more-vertical-fill" />
      </IconButton>
    ),
  },
];

export const products_menu_dropdown = [
  { value: 'Edit Product', type: 'edit', permission: 'update' },
  { value: 'Delete Product', type: 'delete', permission: 'delete' },
];
export const product_types_menu_dropdown = [
  { value: 'Edit Type', type: 'edit', permission: 'update' },
  { value: 'Delete Type', type: 'delete', permission: 'delete' },
];
export const product_categories_menu_dropdown = [
  { value: 'Edit Category', type: 'edit', permission: 'update' },
  { value: 'Delete Category', type: 'delete', permission: 'delete' },
];
