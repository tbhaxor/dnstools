const { portScan } = require('./dist/index');

// portScan('4iresearch.com').then(console.log);
portScan('10.0.20.0').then(console.log);
