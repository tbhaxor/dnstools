import * as https from 'https';

export default function (url: string): Promise<string> {
  return new Promise<string>((resolve, reject) => {
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
  });
}
