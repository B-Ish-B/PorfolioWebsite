import axios from 'axios';
import 'dotenv/config';  // Add this at the top

interface CloudflareConfig {
  apiToken: string;
  accountId: string;
  zoneId?: string;
}

class CloudflareService {
  private readonly baseUrl = 'https://api.cloudflare.com/client/v4';
  private readonly config: CloudflareConfig;

  constructor(config: CloudflareConfig) {
    this.config = config;
  }

  private get headers() {
    return {
      'Authorization': `Bearer ${this.config.apiToken}`,
      'Content-Type': 'application/json',
    };
  }

  private async request<T>(method: string, endpoint: string, data?: any): Promise<T> {
    try {
      const response = await axios({
        method,
        url: `${this.baseUrl}${endpoint}`,
        headers: this.headers,
        data,
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`Cloudflare API Error: ${error.response?.data?.errors?.[0]?.message || error.message}`);
      }
      throw error;
    }
  }

  // DNS Records
  async listDNSRecords() {
    return this.request('GET', `/zones/${this.config.zoneId}/dns_records`);
  }

  async createDNSRecord(data: {
    type: string;
    name: string;
    content: string;
    ttl?: number;
    proxied?: boolean;
  }) {
    return this.request('POST', `/zones/${this.config.zoneId}/dns_records`, data);
  }

  // Workers
  async listWorkers() {
    return this.request('GET', `/accounts/${this.config.accountId}/workers/scripts`);
  }

  async deployWorker(scriptName: string, content: string) {
    return this.request('PUT', `/accounts/${this.config.accountId}/workers/scripts/${scriptName}`, content);
  }

  // Zone Settings
  async getZoneSettings() {
    return this.request('GET', `/zones/${this.config.zoneId}/settings`);
  }

  async updateZoneSetting(settingName: string, value: any) {
    return this.request('PATCH', `/zones/${this.config.zoneId}/settings/${settingName}`, { value });
  }
}

export default CloudflareService;

// Add this instance creation at the bottom
export const cloudflareService = new CloudflareService({
  apiToken: import.meta.env.VITE_CLOUDFLARE_API_TOKEN,
  accountId: import.meta.env.VITE_CLOUDFLARE_ACCOUNT_ID,
  zoneId: import.meta.env.VITE_CLOUDFLARE_ZONE_ID
});

// Add type declarations for Vite env variables
interface ImportMeta {
  readonly env: {
    VITE_CLOUDFLARE_API_TOKEN: string
    VITE_CLOUDFLARE_ACCOUNT_ID: string
    VITE_CLOUDFLARE_ZONE_ID?: string
  }
}
