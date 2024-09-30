import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'dahu',
  webDir: 'dist/dahu',
  server: {
    cleartext:true,
    androidScheme: 'http',
    hostname:"127.0.0.1:5001",
    allowNavigation:["127.0.0.1:5001"]
  },
  plugins: {
    CapacitorHttp: {
      enabled: true
    }
  }
};

export default config;
