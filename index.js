/**
 * @file index.js
 * @description Entry file
 *
 * @author Gurkirat Singh <tbhaxor[at]gmail.com>
 *
 */

/* eslint-disable */
// importing node package
const https = require("https");
const http = require("http");

function ReverseIPLookup(host, callback) {
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
}

function IP2Location(ip, callback) {
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
}

function Down(host, callback) {
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
}

function ASN(asn, callback) {
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
}

function MXLookup(mailServer, callback) {
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
}

function CFTest(host, callback) {
    let url = `https://viewdns.info/chinesefirewall/?domain=${host}`;

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
                            const _entry = /\/images\/ok/.test(entry) ?
                                entry
                                .replace(
                                    "<img src=\"/images/ok.GIF\" height=\"20\" alt=\"ok\">",
                                    false
                                )
                                .replace("<center>", "")
                                .replace("</center></td></tr>", "")
                                .replace("<br>", "")
                                .split("</td><td>") :
                                entry
                                .replace(
                                    "<img src=\"/images/error.GIF\" height=\"20\" alt=\"fail\">",
                                    true
                                )
                                .replace("<center>", "")
                                .replace("</center></td></tr>", "")
                                .replace("<br>", "")
                                .split("</td><td>");
                            d.push({
                                location: _entry[0].trim(),
                                lookupResult: _entry[1].trim(),
                                isBlocked: _entry[2] == "false" ? false : true
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
}

function PortScan(host, callback) {
    let url = `https://viewdns.info/portscan/?host=${host}`;

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
                            const _entry = /\/images\/ok/.test(entry) ?
                                entry
                                .replace(
                                    "<img src=\"/images/ok.GIF\" height=\"20\" alt=\"open\">",
                                    true
                                )
                                .replace("<center>", "")
                                .replace("</center></td></tr>", "")
                                .replace("<br>", "")
                                .split("</td><td>") :
                                entry
                                .replace(
                                    "<img src=\"/images/error.GIF\" height=\"20\" alt=\"closed\">",
                                    false
                                )
                                .replace("<center>", "")
                                .replace("</center></td></tr>", "")
                                .replace("<br>", "")
                                .split("</td><td>");
                            d.push({
                                port: _entry[0].trim(),
                                service: _entry[1].trim(),
                                isOpen: _entry[2] == "false" ? false : true
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
}

function IPHistory(host, callback) {
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
}

// exporting modules
module.exports = {
    /**
     * Reverse IP Lookup
     *
     * @description Reverse lookup to quickly shows all other domains hosted from the same server.
     *
     * @param {String} host
     * @param {callback} callback
     */
    reverseIp: ReverseIPLookup,
    /**
     * IP To Location
     *
     * @description Display geographic information about a supplied IP address including city, country, latitude, longitude and more.
     * @param {string} ip
     * @param {callback} callback
     */
    ipLocation: IP2Location,
    /**
     * Is Host Down
     *
     * @description Checks whether a specified site is down or not.
     * @param {string} host
     * @param {callback} callback
     */
    isHostDown: Down,
    /**
     * ASN Loopup
     *
     * @description Determine which company owns the specified Autonomous System Number
     * @param {number} asn
     * @param {callback} callback
     */
    asnLookup: ASN,
    /**
     * Reverse MX Lookup
     *
     * @description Takes a mail server (e.g. mail.google.com) and quickly shows all other domains that use the same mail server
     * @param {string} mailServer
     * @param {callback} callback
     */
    reverseMX: MXLookup,

    /**
     * Chinese Firewall Test
     *
     * @description Checks whether a site is blocked by the Great Firewall of China
     * @param {string} host
     * @param {callback} callback
     */
    chineseFirewall: CFTest,
    /**
     * Port Scanner
     *
     * @description Port scanner will test whether common ports are open on a server.
     * Ports scanned are: 21, 22, 23, 25, 80, 110, 139, 143, 445, 1433, 1521, 3306 and 3389
     * @param {string} host
     * @param {callback} callback
     */
    portScan: PortScan,
    /**
     * IP History
     *
     * @description Shows a historical list of IP addresses a given domain name has been hosted on as well as where that IP address is geographically located, and the owner of that IP address.
     * @param {string} host
     * @param {callback} callback
     */
    ipHistory: IPHistory,

};