import CloudflareService from '../services/cloudflare';

const cloudflareConfig = {
  apiToken: import.meta.env.VITE_CLOUDFLARE_API_TOKEN,
  accountId: import.meta.env.VITE_CLOUDFLARE_ACCOUNT_ID,
  zoneId: import.meta.env.VITE_CLOUDFLARE_ZONE_ID,
};

if (!cloudflareConfig.apiToken || !cloudflareConfig.accountId) {
  console.warn('Cloudflare API configuration is incomplete. Please check your environment variables.');
}

export const cloudflareService = new CloudflareService(cloudflareConfig);