const { expect } = require('chai');
const { ip2location } = require('./dist/index');

describe('Node DNS Tools Test', () => {
  // ip2location
  describe('IP To Location', () => {
    it('should succeed', (done) => {
      ip2location('8.8.8.8', (err, data) => {
        expect(data.status).to.equal('success');
        done();
      });
    }).timeout(15000);

    it('should fail ', (done) => {
      ip2location('10.10.1.1', (err, data) => {
        expect(data.status).to.equal('fail');
        done();
      });
    }).timeout(15000);
  });
});
