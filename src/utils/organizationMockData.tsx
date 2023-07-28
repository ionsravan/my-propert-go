import React from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import Iconify from '../components/iconify';

export const users_columns: GridColDef[] = [
  {
    field: 'user_name',
    headerName: 'Name',
    width: 200,
    disableColumnMenu: true,
  },
  {
    field: 'email_address',
    headerName: 'Email',
    width: 280,
    disableColumnMenu: true,
    align: 'left',
    headerAlign: 'left',
    renderCell: (params) => (
      <Typography
        variant="body2"
        sx={{
          wordBreak: 'break-all',
        }}
      >
        {params.row.email_address}
      </Typography>
    ),
  },
  {
    field: 'is_active',
    headerName: 'Active',
    width: 100,
    disableColumnMenu: true,
    align: 'left',
    headerAlign: 'left',
    renderCell: (params) => (
      <>
        {params.row.is_active ? (
          <Iconify icon="eva:checkmark-circle-2-fill" color="#66bb6a" />
        ) : (
          <Iconify icon="eva:close-circle-fill" color="#f44336" />
        )}
      </>
    ),
  },
  {
    field: 'phone',
    headerName: 'Phone',
    width: 180,
    disableColumnMenu: true,
    align: 'left',
    headerAlign: 'left',
  },
  {
    field: 'address',
    headerName: 'Address',
    width: 300,
    disableColumnMenu: true,
  },
  {
    field: 'department',
    headerName: 'Department',
    width: 160,
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

export const allUsers = [
  {
    id: 1,
    first_name: 'John',
    last_name: 'Johnson',
    email_address: 'john@gmail.com',
    department: 'sales',
    phone: {
      country_code: '+61',
      number: '0444444444',
    },
    street: 'street 1',
    address: 'address 1',
    suburb: 'suburb 1',
    state: 'state 1',
    postal_code: '0000',
  },
  {
    id: 2,
    first_name: 'John',
    last_name: 'Johnson',
    email_address: 'john@gmail.com',
    department: 'sales',
    phone: {
      country_code: '+61',
      number: '0444444444',
    },
    street: 'street 1',
    address: 'address 1',
    suburb: 'suburb 1',
    state: 'state 1',
    postal_code: '0000',
  },
  {
    id: 3,
    first_name: 'John',
    last_name: 'Johnson',
    email_address: 'john@gmail.com',
    department: 'sales',
    phone: {
      country_code: '+61',
      number: '0444444444',
    },
    street: 'street 1',
    address: 'address 1',
    suburb: 'suburb 1',
    state: 'state 1',
    postal_code: '0000',
  },
  {
    id: 4,
    first_name: 'John',
    last_name: 'Johnson',
    email_address: 'john@gmail.com',
    department: 'sales',
    phone: {
      country_code: '+61',
      number: '0444444444',
    },
    street: 'street 1',
    address: 'address 1',
    suburb: 'suburb 1',
    state: 'state 1',
    postal_code: '0000',
  },
  {
    id: 5,
    first_name: 'John',
    last_name: 'Johnson',
    email_address: 'john@gmail.com',
    department: 'kitchen',
    phone: {
      country_code: '+61',
      number: '0444444444',
    },
    street: 'street 1',
    address: 'address 1',
    suburb: 'suburb 1',
    state: 'state 1',
    postal_code: '0000',
  },
];

export const departments_columns: GridColDef[] = [
  {
    field: 'department_name',
    headerName: 'Department name',
    width: 200,
    disableColumnMenu: true,
  },
  {
    field: 'description',
    headerName: 'Description',
    width: 270,
    disableColumnMenu: true,
    renderCell: (params) => (
      <Box>
        <Typography
          sx={{
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            width: '250px',
            fontSize: '14px',
          }}
        >
          {params?.row?.description}
        </Typography>
      </Box>
    ),
  },
  {
    field: 'owner_full_name',
    headerName: 'Owner name',
    width: 280,
    disableColumnMenu: true,
    align: 'left',
    headerAlign: 'left',
    renderCell: (params) => (
      <Typography
        variant="body2"
        sx={{
          wordBreak: 'break-all',
        }}
      >
        {params.row.owner_full_name}
      </Typography>
    ),
  },
  {
    field: 'members_total',
    headerName: 'Members',
    width: 180,
    disableColumnMenu: true,
    align: 'left',
    headerAlign: 'left',
  },
  {
    field: 'updated_at',
    headerName: 'Updated at',
    width: 300,
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
export const department_members_columns: GridColDef[] = [
  {
    field: 'user_name',
    headerName: 'Name',
    width: 200,
    disableColumnMenu: true,
  },
  {
    field: 'email_address',
    headerName: 'Email',
    width: 280,
    disableColumnMenu: true,
    align: 'left',
    headerAlign: 'left',
    renderCell: (params) => (
      <Typography
        variant="body2"
        sx={{
          wordBreak: 'break-all',
        }}
      >
        {params.row.email_address}
      </Typography>
    ),
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
export const allDepartments = [
  {
    id: 1,
    department_name: 'Sales',
    owner_full_name: 'John Adam',
    members_total: 80,
    updated_at: '26-04-2023',
  },
  {
    id: 2,
    department_name: 'Sales',
    owner_full_name: 'John Adam',
    members_total: 20,
    updated_at: '26-04-2023',
  },
  {
    id: 3,
    department_name: 'Kitchen',
    owner_full_name: 'John Adam',
    members_total: 20,
    updated_at: '26-04-2023',
  },
  {
    id: 4,
    department_name: 'Sales',
    owner_full_name: 'John Adam',
    members_total: 20,
    updated_at: '26-04-2023',
  },
  {
    id: 5,
    department_name: 'Kitchen',
    owner_full_name: 'John Adam',
    members_total: 20,
    updated_at: '26-04-2023',
  },
];

export const users_menu_dropdown = [
  { value: 'Edit User', type: 'edit', permission: 'update' },

  { value: 'Disable User', type: 'disable', permission: 'delete' },
];
export const disabled_users_menu_dropdown = [
  { value: 'Edit User', type: 'edit', permission: 'update' },
  { value: 'Activate User Account', type: 'activate', permission: 'delete' },
];
export const departments_menu_dropdown = [
  { value: 'Edit Department', type: 'edit', permission: 'update' },
  { value: 'Delete Department', type: 'delete', permission: 'delete' },
];
export const departments_members_menu_dropdown = [
  { value: 'Edit Member', type: 'edit', permission: 'update' },
];
export const users_departments_dropdown = ['Kitchen', 'Sales'];
