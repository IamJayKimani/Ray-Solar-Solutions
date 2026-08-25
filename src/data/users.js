export const users = [
  {
    id: 1,
    name: 'Crystal Mucheru',
    email: 'crystal.mucheru@email.com',
    role: 'Customer',
    status: 'Active',
    joined: '2025-03-14',
  },
  {
    id: 2,
    name: 'James Omondi',
    email: 'james.omondi@email.com',
    role: 'Customer',
    status: 'Active',
    joined: '2025-05-22',
  },
  {
    id: 3,
    name: 'Amina Hassan',
    email: 'amina.hassan@email.com',
    role: 'Customer',
    status: 'Active',
    joined: '2025-07-01',
  },
  {
    id: 4,
    name: 'Peter Kamau',
    email: 'peter.kamau@email.com',
    role: 'Customer',
    status: 'Suspended',
    joined: '2025-02-19',
  },
  {
    id: 5,
    name: 'Grace Wanjiku',
    email: 'grace.wanjiku@email.com',
    role: 'Customer',
    status: 'Active',
    joined: '2025-08-10',
  },
  {
    id: 6,
    name: 'Sunrise Electric Ltd',
    email: 'contact@sunriseelectric.co.ke',
    role: 'Provider',
    status: 'Active',
    joined: '2024-11-05',
  },
  {
    id: 7,
    name: 'BrightPath Solar',
    email: 'info@brightpathsolar.co.ke',
    role: 'Provider',
    status: 'Active',
    joined: '2025-01-18',
  },
  {
    id: 8,
    name: 'NightGlow Energy',
    email: 'hello@nightglow.co.ke',
    role: 'Provider',
    status: 'Active',
    joined: '2025-04-30',
  },
  {
    id: 9,
    name: 'Daniel Mutua',
    email: 'daniel.mutua@email.com',
    role: 'Customer',
    status: 'Active',
    joined: '2025-06-12',
  },
  {
    id: 10,
    name: 'Sarah Njeri',
    email: 'sarah.njeri@email.com',
    role: 'Customer',
    status: 'Active',
    joined: '2025-07-25',
  },
];

const USERS_STORAGE_KEY = 'ray-solar-users';

export const getUsers = () => {
  const stored = window.localStorage.getItem(USERS_STORAGE_KEY);

  if (!stored) {
    window.localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
    return users;
  }

  try {
    return JSON.parse(stored);
  } catch {
    window.localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
    return users;
  }
};

export const saveUsers = (nextUsers) => {
  window.localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(nextUsers));
  return nextUsers;
};
