export interface User {
  id: string;
  username: string;
  email: string;
  role: string;
  status: 'Active' | 'Inactive';
  lastLogin: string;
  createdAt: string;
}

export const users: User[] = [
  {
    id: '1',
    username: 'admin',
    email: 'admin@hattongarden.com',
    role: 'Super Admin',
    status: 'Active',
    lastLogin: new Date().toISOString().split('T')[0],
    createdAt: '2024-01-01'
  },
  {
    id: '2',
    username: 'editor',
    email: 'editor@hattongarden.com',
    role: 'Editor',
    status: 'Active',
    lastLogin: new Date().toISOString().split('T')[0],
    createdAt: '2024-01-15'
  }
];
