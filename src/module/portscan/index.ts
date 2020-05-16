import fetch from '../../fetch';
import { PortScanCallBack, PortScanData } from './interface';

/**
 * Method to check whether common ports are open on a server. Useful in determining if a specific service (e.g. HTTP) is up or down on a specific server.
 *
 * @param host Domain / IP Address:
 * @param cb The return callback
 */
export default function (host, cb: PortScanCallBack): Promise<PortScanData[]> {
  return new Promise<PortScanData[]>(async (resolve, reject) => {
    try {
      const url = `https://viewdns.info/portscan/?host=${host}`;

      const r = await fetch(url);

      if (r.includes('unable to perform') && r.includes('private IP address')) {
        if (cb && typeof cb === 'function') {
          cb(new Error(`${host} belongs to private ip range`), null);
        } else {
          reject(new Error(`${host} belongs to private ip range`));
        }
      } else {
        const data: PortScanData[] = [];

        r.split('<table border="1">')[1]
          .split('</table>')[0]
          .split('<tr><td>')
          .splice(1)
          .forEach((entry) => {
            const _entry = /\/images\/ok/.test(entry)
              ? entry
                  .replace(
                    '<img src="/images/ok.GIF" height="20" alt="open">',
                    'true'
                  )
                  .replace('<center>', '')
                  .replace('</center></td></tr>', '')
                  .replace('<br>', '')
                  .split('</td><td>')
              : entry
                  .replace(
                    '<img src="/images/error.GIF" height="20" alt="closed">',
                    'false'
                  )
                  .replace('<center>', '')
                  .replace('</center></td></tr>', '')
                  .replace('<br>', '')
                  .split('</td><td>');

            data.push({
              // tslint:disable-next-line: radix
              port: Number.parseInt(_entry[0].trim()),
              service: _entry[1].trim(),
              isOpen: _entry[2] === 'false' ? false : true,
            });
          });

        if (cb && typeof cb === 'function') {
          cb(null, data);
          resolve(null);
        } else {
          resolve(data);
        }
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
