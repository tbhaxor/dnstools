/**
 * @file iphistory.js
 * @description IP History
 *
 * @author Gurkirat Singh <tbhaxor[at]gmail.com>
 *
 */
const https = require("https");
module.exports = function IPHistory(host, callback) {
    let url = `https://viewdns.info/iphistory/?domain=${host}`;

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
                        .splice(1)
                        .forEach(entry => {
                            const _entry = entry.split("</td><td>");
                            d.push({
                                ip: _entry[0],
                                location: _entry[1],
                                ipOwner: _entry[2].split("\r\n")[0].replace("&#44;", ","),
                                lastSeen: _entry[2].split("\">")[1].split("</td></tr>")[0]
                            });
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