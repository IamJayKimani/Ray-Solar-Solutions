export const providers = [
  {
    id: 1,
    name: 'Sunrise Electric Ltd',
    email: 'contact@sunriseelectric.co.ke',
    status: 'Verified',
    products: 19,
    joined: '2024-11-05',
  },
  {
    id: 2,
    name: 'BrightPath Solar',
    email: 'info@brightpathsolar.co.ke',
    status: 'Pending',
    products: 8,
    joined: '2025-01-18',
  },
  {
    id: 3,
    name: 'NightGlow Energy',
    email: 'hello@nightglow.co.ke',
    status: 'Verified',
    products: 12,
    joined: '2025-04-30',
  },
  {
    id: 4,
    name: 'SolarPeak Kenya',
    email: 'sales@solarpeak.co.ke',
    status: 'Verified',
    products: 24,
    joined: '2024-09-12',
  },
  {
    id: 5,
    name: 'EcoLight Solutions',
    email: 'support@ecolight.co.ke',
    status: 'Pending',
    products: 5,
    joined: '2025-06-08',
  },
  {
    id: 6,
    name: 'Lumina Green Tech',
    email: 'admin@luminagreen.co.ke',
    status: 'Verified',
    products: 15,
    joined: '2025-02-20',
  },
];

const PROVIDERS_STORAGE_KEY = 'ray-solar-providers';

export const getProviders = () => {
  const stored = window.localStorage.getItem(PROVIDERS_STORAGE_KEY);

  if (!stored) {
    window.localStorage.setItem(PROVIDERS_STORAGE_KEY, JSON.stringify(providers));
    return providers;
  }

  try {
    return JSON.parse(stored);
  } catch {
    window.localStorage.setItem(PROVIDERS_STORAGE_KEY, JSON.stringify(providers));
    return providers;
  }
};

export const saveProviders = (nextProviders) => {
  window.localStorage.setItem(PROVIDERS_STORAGE_KEY, JSON.stringify(nextProviders));
  return nextProviders;
};
