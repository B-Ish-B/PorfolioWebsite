# AetherNode Website

## Cloudflare API Integration

This project integrates with the Cloudflare API to manage DNS records, Workers, and zone settings.

### Setup

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Configure your Cloudflare credentials in `.env`:
   - `VITE_CLOUDFLARE_API_TOKEN`: Your Cloudflare API token
   - `VITE_CLOUDFLARE_ACCOUNT_ID`: Your Cloudflare account ID
   - `VITE_CLOUDFLARE_ZONE_ID`: Your Cloudflare zone ID (optional)

### Usage

Import the Cloudflare service in your components:

```typescript
import { cloudflareService } from './config/cloudflare';

// Example: List DNS records
const getDNSRecords = async () => {
  try {
    const records = await cloudflareService.listDNSRecords();
    console.log('DNS Records:', records);
  } catch (error) {
    console.error('Error fetching DNS records:', error);
  }
};
```

### Available Methods

- DNS Records:
  - `listDNSRecords()`
  - `createDNSRecord(data)`

- Workers:
  - `listWorkers()`
  - `deployWorker(scriptName, content)`

- Zone Settings:
  - `getZoneSettings()`
  - `updateZoneSetting(settingName, value)`

### Dependencies

Make sure to install the required dependencies:

```bash
npm install axios
```
