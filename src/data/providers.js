import { apiRequest } from './api';

export const providers = [];

export const getProviders = () => providers;

export const saveProviders = (nextProviders) => nextProviders;

export const fetchProviders = async () => {
  const [providersResponse, productsResponse] = await Promise.all([
    apiRequest('/admin/providers'),
    apiRequest('/admin/products'),
  ]);

  const productCounts = {};
  productsResponse.products.forEach((product) => {
    productCounts[product.provider_id] = (productCounts[product.provider_id] || 0) + 1;
  });

  return providersResponse.providers.map((provider) => ({
    ...provider,
    name: `${provider.first_name || ''} ${provider.last_name || ''}`.trim() || provider.email,
    status: provider.is_active ? 'Verified' : 'Suspended',
    products: productCounts[provider.id] || 0,
    joined: provider.created_at ? new Date(provider.created_at).toLocaleDateString() : 'N/A',
  }));
};

export const updateProviderStatus = async (providerId, isActive) => {
  return apiRequest(`/admin/users/${providerId}`, {
    method: 'PUT',
    body: JSON.stringify({ is_active: isActive }),
  });
};
