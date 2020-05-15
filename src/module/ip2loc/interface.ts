export type IP2LocationCallback = (err?: Error, data?: IP2LocationData) => void;

export interface IP2LocationData {
  /**
   * Query status: success / fail
   */
  status: 'success' | 'fail';
  /**
   * included only when status is fail
   * Can be one of the following: private range, reserved range, invalid query
   */
  message: 'private range' | 'reserved range' | 'invalid query';
  /**
   * Continent name
   */
  continent: string;
  /**
   * Two-letter continent code
   */
  continentCode: string;
  /**
   * Country name
   */
  country: string;
  /**
   * 	Two-letter country code [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2)
   */
  countryCode: string;
  /**
   * Region/state short code (FIPS or ISO)
   */
  region: string;
  /**
   * Region/state
   */
  regionName: string;
  /**
   * City Name
   */
  city: string;
  /**
   * Zip code
   */
  zip: string;
  /**
   * Latitude
   */
  lat: number;
  /**
   * Longitude
   */
  lon: string;
  /**
   * City timezone
   */
  timezone: string;
  /**
   * National currency
   */
  currency: string;
  /**
   * ISP name
   */
  isp: string;
  /**
   * Organization name
   */
  org: string;
  /**
   * AS number and organization, separated by space (RIR). Empty for IP blocks not being announced in BGP tables.
   */
  as: string;
  /**
   * AS name (RIR). Empty for IP blocks not being announced in BGP tables.
   */
  asname: string;
  /**
   * Reverse DNS of the IP
   */
  reverse: string;
  /**
   * Is Mobile (cellular) connection?
   */
  mobile: boolean;
  /**
   * Is behind Proxy, VPN or Tor exit address?
   */
  proxy: boolean;
  /**
   * Is Hosting, colocated or data center Provider?
   */
  hosting: boolean;
}
