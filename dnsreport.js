/**
 * @file dnsreport.js
 * @description DNS Report
 *
 * @author Gurkirat Singh <tbhaxor[at]gmail.com>
 *
 */
const https = require("https");

module.exports = function DNSReport(host, callback) {
    // removing url scheme is present
    host = /^http(s)?:\/\//.test(host) ? host.split("://")[1] : host;

    // forming url
    let url = `https://viewdns.info/dnsreport/?domain=${host}`;

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
                    parentNameserver: [],
                    localNameserver: [],
                    soa: [],
                    mx: [],
                    wwwRecord: []
                };
                let _x = body.split("==============<br><br>")[1];
                try {
                    if (_x.startsWith("Oops!")) {
                        return callback(
                            null,
                            "Oops! I can't find that domain at all! Perhaps it doesn't exist or registration is not current? Sorry!"
                        );
                    } else {
                        let part1 = _x
                            .split(/Parent Nameserver Tests/)[1]
                            .split("</table>")[0]
                            .split(">Information</td></tr>")[1];
                        let part2 = _x
                            .split(/Local Nameserver Tests/)[1]
                            .split("</table>")[0]
                            .split(">Information</td></tr>")[1];
                        let part3 = _x
                            .split(/Start of Authority \(SOA\) Tests/)[1]
                            .split("</table>")[0]
                            .split(">Information</td></tr>")[1];
                        let part4 = _x
                            .split(/Mail eXchanger \(MX\) Tests/)[1]
                            .split("</table>")[0]
                            .split(">Information</td></tr>")[1];
                        let part5 = _x
                            .split(/WWW Record Tests/)[1]
                            .split("</table>")[0]
                            .split(">Information</td></tr>")[1];

                        part1 = part1
                            .replace(/<br>/gm, "\n")
                            .replace(
                                /<img src="\/images\/info.GIF" height="20" alt="INFO">/gm,
                                "INFO"
                            )
                            .replace(
                                /<img src="\/images\/ok.GIF" height="20" alt="PASSED">/gm,
                                "OK"
                            )
                            .replace(/ align="center"/gm, "");

                        part1.split("<tr><td>").forEach(part => {
                            let x = part.split(/(<\/td>)?<td>/);
                            if (x.length !== 1) {
                                data.parentNameserver.push({
                                    status: x[0],
                                    testCase: x[2],
                                    information: x[4]
                                        .replace("</td></tr>", "")
                                        .replace("</td>", "")
                                });
                            }
                        });
                        part1 = part1
                            .replace(/<br>/gm, "\n")
                            .replace(
                                /<img src="\/images\/info.GIF" height="20" alt="INFO">/gm,
                                "INFO"
                            )
                            .replace(
                                /<img src="\/images\/ok.GIF" height="20" alt="PASSED">/gm,
                                "OK"
                            )
                            .replace(
                                /<img src="\/images\/error.GIF" alt="FAILED" height="20">/gm,
                                "FAIL"
                            )
                            .replace(
                                /<img src="\/images\/warn.GIF" alt="WARNING" height="20">/gm,
                                "WARNING"
                            )
                            .replace(/ align="center"/gm, "");

                        part1.split("<tr><td>").forEach(part => {
                            let x = part.split(/(<\/td>)?<td>/);
                            if (x.length !== 1) {
                                data.parentNameserver.push({
                                    status: x[0],
                                    testCase: x[2],
                                    information: x[4]
                                        .replace("</td></tr>", "")
                                        .replace("</td>", "")
                                });
                            }
                        });

                        part2 = part2
                            .replace(/<br>/gm, "\n")
                            .replace(
                                /<img src="\/images\/info.GIF" height="20" alt="INFO">/gm,
                                "INFO"
                            )
                            .replace(
                                /<img src="\/images\/ok.GIF" height="20" alt="PASSED">/gm,
                                "OK"
                            )
                            .replace(
                                /<img src="\/images\/error.GIF" alt="FAILED" height="20">/gm,
                                "FAIL"
                            )
                            .replace(
                                /<img src="\/images\/warn.GIF" alt="WARNING" height="20">/gm,
                                "WARNING"
                            )
                            .replace(/ align="center"/gm, "");

                        part2.split("<tr><td>").forEach(part => {
                            let x = part.split(/(<\/td>)?<td>/);
                            if (x.length !== 1) {
                                data.localNameserver.push({
                                    status: x[0],
                                    testCase: x[2],
                                    information: x[4]
                                        .replace("</td></tr>", "")
                                        .replace("</td>", "")
                                });
                            }
                        });

                        part3 = part3
                            .replace(/<br>/gm, "\n")
                            .replace(
                                /<img src="\/images\/info.GIF" height="20" alt="INFO">/gm,
                                "INFO"
                            )
                            .replace(
                                /<img src="\/images\/ok.GIF" height="20" alt="PASSED">/gm,
                                "OK"
                            )
                            .replace(
                                /<img src="\/images\/error.GIF" alt="FAILED" height="20">/gm,
                                "FAIL"
                            )
                            .replace(
                                /<img src="\/images\/warn.GIF" alt="WARNING" height="20">/gm,
                                "WARNING"
                            )
                            .replace(/ align="center"/gm, "");

                        part3.split("<tr><td>").forEach(part => {
                            let x = part.split(/(<\/td>)?<td>/);
                            if (x.length !== 1) {
                                data.soa.push({
                                    status: x[0],
                                    testCase: x[2],
                                    information: x[4]
                                        .replace("</td></tr>", "")
                                        .replace("</td>", "")
                                });
                            }
                        });

                        part4 = part4
                            .replace(/<br>/gm, "\n")
                            .replace(
                                /<img src="\/images\/info.GIF" height="20" alt="INFO">/gm,
                                "INFO"
                            )
                            .replace(
                                /<img src="\/images\/ok.GIF" height="20" alt="PASSED">/gm,
                                "OK"
                            )
                            .replace(
                                /<img src="\/images\/error.GIF" alt="FAILED" height="20">/gm,
                                "FAIL"
                            )
                            .replace(
                                /<img src="\/images\/warn.GIF" alt="WARNING" height="20">/gm,
                                "WARNING"
                            )
                            .replace(/ align="center"/gm, "");

                        part4.split("<tr><td>").forEach(part => {
                            let x = part.split(/(<\/td>)?<td>/);
                            if (x.length !== 1) {
                                data.mx.push({
                                    status: x[0],
                                    testCase: x[2],
                                    information: x[4]
                                        .replace("</td></tr>", "")
                                        .replace("</td>", "")
                                });
                            }
                        });

                        part5 = part5
                            .replace(/<br>/gm, "\n")
                            .replace(
                                /<img src="\/images\/info.GIF" height="20" alt="INFO">/gm,
                                "INFO"
                            )
                            .replace(
                                /<img src="\/images\/ok.GIF" height="20" alt="PASSED">/gm,
                                "OK"
                            )
                            .replace(
                                /<img src="\/images\/error.GIF" alt="FAILED" height="20">/gm,
                                "FAIL"
                            )
                            .replace(
                                /<img src="\/images\/warn.GIF" alt="WARNING" height="20">/gm,
                                "WARNING"
                            )
                            .replace(/ align="center"/gm, "");

                        part5.split("<tr><td>").forEach(part => {
                            let x = part.split(/(<\/td>)?<td>/);
                            if (x.length !== 1) {
                                data.wwwRecord.push({
                                    status: x[0],
                                    testCase: x[2],
                                    information: x[4]
                                        .replace("</td></tr>", "")
                                        .replace("</td>", "")
                                });
                            }
                        });
                        return callback(null, data);
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