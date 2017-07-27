// Feel free to extend this interface
// depending on your app specific config.
export interface EnvConfig {
  API: string;
  ENV?: string;
  desktopWidth: number;
  division?: string,
  GoogleAnalyticsAPIKey?: string;
  GoogleMapsAPIKey: string;
  GoogleRecaptchaAPIKey?: string;
  siteTitle?: string
}
