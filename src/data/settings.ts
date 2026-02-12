export interface Settings {
  siteName: string;
  siteDescription: string;
  contactEmail: string;
  adminEmail: string;
  enableNotifications: boolean;
  enableEmailAlerts: boolean;
  maintenanceMode: boolean;
  socialMedia: {
    facebook: string;
    twitter: string;
    instagram: string;
  };
}

export const defaultSettings: Settings = {
  siteName: 'Hatton Garden',
  siteDescription: "London's Premier Diamond District",
  contactEmail: 'info@hattongarden.com',
  adminEmail: 'admin@hattongarden.com',
  enableNotifications: true,
  enableEmailAlerts: true,
  maintenanceMode: false,
  socialMedia: {
    facebook: 'https://facebook.com/hattongarden',
    twitter: 'https://twitter.com/hattongarden',
    instagram: 'https://instagram.com/hattongarden'
  }
};
