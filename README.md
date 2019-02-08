<h1 align="center">
DNS Tools
</h1>

<p align="center">

<a href="https://travis-ci.org/tbhaxor/dnstools">
    <img src="https://img.shields.io/travis/tbhaxor/dnstools.svg?style=flat-square">
  </a>
    <img src="https://img.shields.io/npm/l/dnstools.svg?style=flat-square">
    <img src="https://img.shields.io/badge/Package%20Version-v1.0.2-yellow.svg?style=flat-square">
    <img src="https://img.shields.io/npm/dw/dnstools.svg?style=flat-square">
</p>

> All in one library for dns query

DNS Tools is powered by [view-dns](https://viewdns.info) and [ip-api](http://ip-api.com). It provides you with a bunch of dns related search api.

## Node versions

v8.15.0 +

## Features

- All in one DNS Query Library
- No Dependency
- Formatted OUTPUT
- Fast
- Reliable

## Functions

- [x] Reverse IP Lookup
- [x] IP To Location
- [x] Check if host is down
- [x] ASN Lookup
- [x] Reverse MX Lookup
- [x] Chinese Firewall Test
- [x] Port Scan
- [x] IP History
- [x] DNS Report
- [ ] WHOIS Report
- [ ] Reverse Whois Lookup
- [ ] Iran Firewall Test
- [ ] DNS Record Lookup
- [ ] Spam Database Lookup
- [ ] Abuse Contact Lookup
- [ ] Reverse NS Lookup
- [ ] DNS Propagation Checker
- [ ] Reverse DNS Lookup
- [x] DNSSEC Test
- [ ] MAC Address Lookup

## Install and Use

    npm i dnstools@latest

Demonstrating `IP Location`

```js
const dnstool = require("dnstools");

dnstool.ipLocation("172.9.8.5", (err, data) => {
  if (err) {
    console.log("error in query");
  } else {
    console.log(data);

    /*  OUTPUT

            { as: 'AS7018 AT&T Services, Inc.',
                city: 'Los Angeles',
                country: 'United States',
                countryCode: 'US',
                isp: 'AT&T Services, Inc.',
                lat: 34.0818,
                lon: -118.1753,
                org: 'AT&T Corp',
                query: '172.9.8.5',
                region: 'CA',
                regionName: 'California',
                status: 'success',
                timezone: 'America/Los_Angeles',
                zip: '90032' }
        */
  }
});
```

## API

| Function        | Description                                                                                                                                                                  | Parameters                                                | Callback Data                                       |
| :-------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------- | :-------------------------------------------------- |
| reverseIp       | Reverse lookup to quickly shows all other domains hosted from the same server.                                                                                               | host: `String` <br> callback: `callback(err, data)`       | err: `Error` or `String` <br> data: `Array[Object]` |
| ipLocation      | Display geographic information about a supplied IP address including city, country, latitude, longitude and more.                                                            | ip: `String` <br> callback: `callback(err, data)`         | err: `Error` or `String` <br> data: `Object`        |
| isHostDown      | Checks whether a specified site is down or not.                                                                                                                              | host: `string` <br> callback: `callback(err, data)`       | err: `Error` or `String` <br> data: `Boolean`       |
| asnLookup       | Determine which company owns the specified Autonomous System Number                                                                                                          | asn: `Number` <br> callback: `callback(err, data)`        | err: `Error` or `String` <br> data: `Object`        |
| reverseMX       | Takes a mail server (e.g. `mail.google.com`) and quickly shows all other domains that use the same mail server                                                               | mailServer: `String` <br> callback: `callback(err, data)` | err: `Error` or `String` <br> data: `Array[Object]` |
| chineseFirewall | Checks whether a site is blocked by the Great Firewall of China                                                                                                              | host: `String` <br> callback: `callback(err, data)`       | err: `Error` or `String` <br> data: `Array[Object]` |
| portScan        | Port scanner will test whether common ports are open on a server. Ports scanned are: 21, 22, 23, 25, 80, 110, 139, 143, 445, 1433, 1521, 3306 and 3389                       | host: `String` <br> callback: `callback(err, data)`       | err: `Error` or `String` <br> data: `Array[Object]` |
| ipHistory       | Shows a historical list of IP addresses a given domain name has been hosted on as well as where that IP address is geographically located, and the owner of that IP address. | host: `String` <br> callback: `callback(err, data)`       | err: `Error` or `String` <br> data: `Array[Object]` |

## License

DNS Tool is licensed under [Apache-2.0](https://github.com/tbhaxor/dnstools/blob/master/LICENSE)

## Contribution

Read contribution guidelines from [here](https://github.com/tbhaxor/dnstools/blob/master/CONTRIBUTING.md)
