/**
 * @file ismyhostdown.js
 * @description Is My Host Down
 *
 * @author Gurkirat Singh <tbhaxor[at]gmail.com>
 *
 */
const https = require("https");

module.exports = function Down(host, callback) {
    let url = `https://viewdns.info/ismysitedown/?domain=${host}`;

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
                return callback(null, /not accessible/.test(body));
            });
        })
        .on("error", e => {
            // return error callback if error related to firing requests
            return callback(e, null);
        });
};