/**
 * @file index.js
 * @description Entry file
 *
 * @author Gurkirat Singh <tbhaxor[at]gmail.com>
 *
 */

// importing node package
const DNSReport = require("./dnsreport");
const DNSSEC = require("./dnssec");
const IP2Location = require("./ip2loc");
const ReverseIPLookup = require("./reverseip");
const Down = require("./ismyhostdown");
const ASN = require("./asn");
const MXLookup = require("./mx");
const CFTest = require("./cftest");
const PortScan = require("./portscan");
const IPHistory = require("./iphistory");
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
    /**
     * DNSSEC Test
     *
     * @description Test if any domain name is configured for DNSSEC (Domain Name System Security Extensions).
     * @param {string} host
     * @param {callback} callback
     */
    dnssec: DNSSEC,
    /**
     * DNS Report
     *
     * @description View a complete report on the DNS settings for your domain. This tool is designed to assist webmasters and system administrators diagnose DNS related issues. A number of tests are run on your DNS settings with results displayed in an easy to understand manner.
     * @param {string} host
     * @param {callback} callback
     */
    dnsreport: DNSReport
};