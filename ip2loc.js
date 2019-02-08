/**
 * @file ip2loc.js
 * @description IP 2 Location
 *
 * @author Gurkirat Singh <tbhaxor[at]gmail.com>
 *
 */
const http = require("http");

module.exports = function IP2Location(ip, callback) {
    if (ip == "") return callback(new Error("No IP passed"), null);

    http
        .get(`http://ip-api.com/json/${ip}`, res => {
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
                return callback(null, JSON.parse(body));
            });
        })
        .on("error", e => {
            // return error callback if error related to firing requests
            return callback(e, null);
        });
};