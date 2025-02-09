
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.1d38dbfc45f34ad88c843cc4b553b160',
  appName: 'alphaops',
  webDir: 'dist',
  server: {
    url: 'https://1d38dbfc-45f3-4ad8-8c84-3cc4b553b160.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  ios: {
    contentInset: 'always'
  }
};

export default config;
