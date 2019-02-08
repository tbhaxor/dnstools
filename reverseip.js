/**
 * @file reverseip.js
 * @description Reverse IP
 *
 * @author Gurkirat Singh <tbhaxor[at]gmail.com>
 *
 */
const https = require("https");

module.exports = function ReverseIPLookup(host, callback) {
    // removing url scheme is present
    host = /^http(s)?:\/\//.test(host) ? host.split("://")[1] : host;

    // forming url
    let url = `https://viewdns.info/reverseip/?host=${host}&t=1`;

    // firing get request
    https
        .get(url, res => {
            res.setEncoding("utf8"); // setting response chunk encoding

            let body = ""; // declaring variable to
            res.on("data", chunk => {
                // collecting chunks
                body += chunk;
            });

            res.on("error", e => {
                // handling error while reading response
                return callback(e, null);
            });

            res.on("end", () => {
                // the chunk collection is over now
                let data = [];

                try {
                    // performing the magic
                    body
                        .split(/<table (.*)="1">/)[2]
                        .split(/<\/table>/)[0]
                        .split(" <td>")
                        .splice(1)
                        .forEach(domain => {
                            data.push({
                                domain: domain.split("<")[0],
                                lastResolved: domain.split("\">")[1].split("<")[0]
                            }); // splitting ad getting required data only
                        });
                } catch (e) {
                    // handling the error
                    return callback(e, null);
                }

                return callback(null, data);
            });
        })
        .on("error", e => {
            // return error callback if error related to firing requests
            return callback(e, null);
        });
};