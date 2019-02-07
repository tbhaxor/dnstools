const info = require(".");
const expect = require("chai").expect;

describe("Test Cases", () => {

    it("IP 2 Location", done => {
        info.ipLocation("172.9.8.5", err => {
            expect(err).to.be.equal(null);
            done();
        });
    }).timeout(15000);

    it("Is My Site Down", done => {
        info.isHostDown("cybitrock.com", err => {
            expect(err).to.be.equal(null);
            done();
        });
    }).timeout(60000);

    it("Reverse IP", done => {
        info.reverseIp("cybitrock.com", err => {
            expect(err).to.be.equal(null);
            done();
        });
    }).timeout(15000);

    it("ASN Lookup", done => {
        info.asnLookup(3456, err => {
            expect(err).to.be.equal(null);
            done();
        });
    }).timeout(15000);

    it("Reverse MX Lookup", done => {
        info.reverseMX("mail.google.com", err => {
            expect(err).to.be.equal(null);
            done();
        });
    }).timeout(15000);

    it("Chinese Firewall Test", done => {
        info.chineseFirewall("cybitrock.com", err => {
            expect(err).to.be.be.equal(null);
            done();
        });
    }).timeout(15000);

    it("Port Scanner", done => {
        info.portScan("cybitrock.com", err => {
            expect(err).to.be.equal(null);
            done();
        });
    }).timeout(15000);

    it("IP History", done => {
        info.ipHistory("cybitrock.com", err => {
            expect(err).to.be.equal(null);
            done();
        });
    }).timeout(15000);

    it("DNSSEC Test", done => {
        info.dnssec("nasa.gov", err => {
            expect(err).to.be.equal(null);
            done();
        });
    }).timeout(15000);
});