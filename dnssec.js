/**
 * @file dnssec.js
 * @description DNSSEC
 *
 * @author Gurkirat Singh <tbhaxor[at]gmail.com>
 *
 */
const https = require("https");

module.exports = function DNSSEC(host, callback) {
    // removing url scheme is present
    host = /^http(s)?:\/\//.test(host) ? host.split("://")[1] : host;

    // forming url
    let url = `https://viewdns.info/dnssec/?domain=${host}`;

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
                let data = {
                    public: [],
                    dnssecSignatures: []
                };

                try {
                    // performing the magic
                    let part1 = body.split(
                        "Below are the DNSSEC public keys for this domain:"
                    )[1];
                    let part2 = body.split(
                        "Below are the DNSSEC signatures for this domain:"
                    )[1];
                    if (part1 && part2) {
                        part1
                            .split("<table width=\"900\" border=\"1\">")[1]
                            .split("</table>")[0]
                            .split("<tr><td>")
                            .splice(2)
                            .forEach(txt => {
                                let _ = txt.split("</td><td>");
                                data.public.push({
                                    keyType: _[0],
                                    algorithm: _[1],
                                    key: _[2].split("<br></td></tr>")[0].replace(/<br>/gm, "\n")
                                });
                            });
                        part2
                            .split("<table width=\"900\" border=\"1\">")[1]
                            .split("</table>")[0]
                            .split("<tr><td>")
                            .splice(2)
                            .forEach(txt => {
                                let _ = txt.split("</td><td>");
                                data.dnssecSignatures.push({
                                    recordType: _[0],
                                    algorithm: _[1],
                                    signedBy: _[2],
                                    signature: _[3]
                                        .split("<br></td></tr>")[0]
                                        .replace(/<br>/gm, "\n")
                                });
                            });
                        return callback(null, data);
                    } else {
                        return callback(null, "This domain DOES NOT have DNSSEC enabled.");
                    }
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