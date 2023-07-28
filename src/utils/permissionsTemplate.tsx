export const permissions_template: {
  [key: string]: { label: string; value: string }[];
} = {
  users: [
    { label: 'Create', value: 'create' },
    { label: 'Delete', value: 'delete' },
    { label: 'Edit', value: 'update' },
    { label: 'Read', value: 'read' },
    { label: 'Manage', value: 'manage' },
  ],
  departments: [
    { label: 'Create', value: 'create' },
    { label: 'Delete', value: 'delete' },
    { label: 'Edit', value: 'update' },
    { label: 'Read', value: 'read' },
    { label: 'Manage', value: 'manage' },
  ],
  products: [
    { label: 'Create', value: 'create' },
    { label: 'Delete', value: 'delete' },
    { label: 'Edit', value: 'update' },
    { label: 'Read', value: 'read' },
    { label: 'Manage', value: 'manage' },
  ],
  customers: [
    { label: 'Create', value: 'create' },
    { label: 'Delete', value: 'delete' },
    { label: 'Edit', value: 'update' },
    { label: 'Read', value: 'read' },
    { label: 'Manage', value: 'manage' },
  ],
  orders: [
    { label: 'Create', value: 'create' },
    { label: 'Delete', value: 'delete' },
    { label: 'Edit', value: 'update' },
    { label: 'Read', value: 'read' },
    { label: 'Manage', value: 'manage' },
  ],
};
export const permission_scopes = [
  { label: 'Users', value: 'users' },
  { label: 'Departments', value: 'departments' },
  { label: 'Products', value: 'products' },
  { label: 'Customers', value: 'customers' },
  { label: 'Orders', value: 'orders' },
];
