import { apiRequest } from './api';

export const users = [];

export const getUsers = () => users;

export const saveUsers = (nextUsers) => nextUsers;

export const fetchUsers = async () => {
  const data = await apiRequest('/admin/users');

  return data.users.map((user) => ({
    ...user,
    name: `${user.first_name || ''} ${user.last_name || ''}`.trim() || user.email,
    status: user.is_active ? 'Active' : 'Suspended',
    role: user.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : 'Customer',
    joined: user.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A',
  }));
};

export const updateUserStatus = async (userId, isActive) => {
  return apiRequest(`/admin/users/${userId}`, {
    method: 'PUT',
    body: JSON.stringify({ is_active: isActive }),
  });
};
