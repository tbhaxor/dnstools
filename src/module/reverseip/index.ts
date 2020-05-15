import { ReverseIPCallback, ReverseIPData } from './interface';
import fetch from '../../fetch';

export default function (
  host: string,
  cb?: ReverseIPCallback
): Promise<ReverseIPData[]> {
  return new Promise<ReverseIPData[]>(async (resolve, reject) => {
    try {
      // removing url scheme is present
      host = /^http(s)?:\/\//.test(host) ? host.split('://')[1] : host;

      // forming url
      const url = `https://viewdns.info/reverseip/?host=${host}&t=1`;

      const r = await fetch(url);

      const data: ReverseIPData[] = [];

      r.split(/<table (.*)="1">/)[2]
        .split(/<\/table>/)[0]
        .split(' <td>')
        .splice(1)
        .forEach((domain) => {
          data.push({
            domain: domain.split('<')[0],
            lastResolved: new Date(domain.split('">')[1].split('<')[0].trim()),
          }); // splitting ad getting required data only
        });

      if (cb && typeof cb === 'function') {
        cb(null, data);
      } else {
        resolve(data);
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
