import fetch from '../../fetch';
import { IP2LocationCallback, IP2LocationData } from './interface';

/**
 * Method to find the details of IP
 *
 * @param host IP Address or hostname
 * @param cb The return callback
 */
export default function (
  host: string,
  cb: IP2LocationCallback
): Promise<IP2LocationData> {
  return new Promise(async (resolve, reject) => {
    try {
      const r = await fetch(
        `http://ip-api.com/json/${host}?fields=status,message,continent,continentCode,country,countryCode,region,regionName,city,zip,lat,lon,timezone,currency,isp,org,as,asname,reverse,mobile,proxy,hosting`
      );

      if (typeof cb === 'function') {
        cb(null, JSON.parse(r));
      } else {
        resolve(JSON.parse(r));
      }
    } catch (err) {
      if (err instanceof Error || err instanceof TypeError) {
        if (cb && typeof cb === 'function') {
          cb(err, null);
        } else {
          reject(err);
        }
      } else {
        if (cb && typeof cb === 'function') {
          cb(new Error(err), null);
        } else {
          reject(new Error(err));
        }
      }
    }
  });
}
