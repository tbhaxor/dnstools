import * as https from 'https';
import * as http from 'http';

export default function (url: string): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    if (url.startsWith('https://')) {
      https
        .get(url, (response) => {
          response.setEncoding('utf8');

          let body = '';

          response.on('data', (chunk) => {
            body += chunk.toString();
          });

          response.on('end', () => {
            resolve(body);
          });

          response.on('error', reject);
        })
        .on('error', reject);
    } else {
      http
        .get(url, (response) => {
          response.setEncoding('utf8');

          let body = '';

          response.on('data', (chunk) => {
            body += chunk.toString();
          });

          response.on('end', () => {
            resolve(body);
          });

          response.on('error', reject);
        })
        .on('error', reject);
    }
  });
}
