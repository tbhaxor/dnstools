/**
 * @file asn.js
 * @description ASN Lookup
 *
 * @author Gurkirat Singh <tbhaxor[at]gmail.com>
 *
 */
const https = require("https");
module.exports = function ASN(asn, callback) {
    let url = `https://viewdns.info/asnlookup/?asn=${asn}`;

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
                    let d = {};
                    body
                        .split("==============<br><br>")[1]
                        .split("<br><br><br></td>")[0]
                        .split("<br>")
                        .filter(x => x != "")
                        .forEach(el => {
                            const [a, b] = el.split(": ");
                            d[a.toLowerCase()] = b.trimLeft().toLowerCase();
                        });

                    return callback(null, d);
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