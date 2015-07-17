var assert = require('assert');
var api = require('../');

function toHex(bytes) {
  return new Buffer(bytes).toString('hex').toUpperCase();
}

function toBytes(hex) {
  return new Buffer(hex, 'hex').toJSON().data;
}

describe('ripple-address-codec', function() {
  function makeTest(type, base58, hex, opts) {
    opts = opts || {};

    it('can translate between ' + hex + ' and ' + base58, function() {
      var actual = api['encode' + type](toBytes(hex));
      var buf = api['decode' + type](base58);
      assert.equal(actual, base58);
      assert.equal(toHex(buf), hex);
    });
  }

  makeTest('AccountID', 'rJrRMgiRgrU6hDF4pgu5DXQdWyPbY35ErN',
                        'BA8E78626EE42C41B46D46C3048DF3A1C3C87072');

  makeTest('K256Seed',  'sn259rEFXrQrWyx3Q7XneWcwV6dfL',
                        'CF2DE378FBDD7E2EE87D486DFB5A7BFF');

  makeTest('EdSeed',  'sEdTM1uX8pu2do5XvTnutH6HsouMaM2',
                      '4C3A1D213FBDFB14C7C28D609469B341');

  it('can decode arbitray seeds', function() {
    var decoded = api.decodeSeed('sEdTM1uX8pu2do5XvTnutH6HsouMaM2');
    assert.equal(toHex(decoded.bytes), '4C3A1D213FBDFB14C7C28D609469B341');
    assert.equal(decoded.type, 'EdSeed');

    var decoded = api.decodeSeed('sn259rEFXrQrWyx3Q7XneWcwV6dfL');
    assert.equal(toHex(decoded.bytes), 'CF2DE378FBDD7E2EE87D486DFB5A7BFF');
    assert.equal(decoded.type, 'K256Seed');
  });
});