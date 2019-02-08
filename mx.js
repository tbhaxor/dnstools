/**
 * @file mx.js
 * @description MX Lookup
 *
 * @author Gurkirat Singh <tbhaxor[at]gmail.com>
 *
 */
const https = require("https");
module.exports = function MXLookup(mailServer, callback) {
    let url = `https://viewdns.info/reversemx/?mx=${mailServer}`;

    https
        .get(url, res => {
            res.setEncoding("utf8"); // setting response text encoding

            let body = ""; // inititializing body

            res.on("data", chunk => {
                // collecting chunks
                body += chunk;
            });

            res.on("error", e => {
                // handling error while reading response
                return callback(e, null);
            });

            res.on("end", () => {
                // validate and return data on end of response read
                try {
                    // performing the magic
                    let d = [];
                    body
                        .split("<table border=\"1\">")[1]
                        .split("</table>")[0]
                        .split("<tr><td>")
                        .forEach(domain => {
                            const _domain = domain.split("</td></tr>")[0];
                            d.push(_domain);
                        });

                    return callback(null, {
                        domains: d.splice(2)
                    });
                } catch (e) {
                    // handling the error
                    return callback(e, null);
                }
            });
        })
        .on("error", e => {
            // return error callback if error related to firing requests
            return callback(e, null);
        });
};