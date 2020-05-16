import fetch from '../../fetch';
import { ReverseMXCallBack } from './interface';

/**
 *
 * @param host Mail server
 * @param cb The return callback
 */
export default function (
  host: string,
  cb?: ReverseMXCallBack
): Promise<string[]> {
  return new Promise(async (resolve, reject) => {
    try {
      const url = `https://viewdns.info/reversemx/?mx=${host}`;

      const r = await fetch(url);

      const data: string[] = [];

      r.split('<table border="1">')[1]
        .split('</table>')[0]
        .split('<tr><td>')
        .forEach((domain) => {
          const _domain = domain.split('</td></tr>')[0];
          data.push(_domain);
        });

      if (cb && typeof cb === 'function') {
        cb(null, data);
        resolve(null);
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
