"use strict"

const createHash = require("create-hash")
const apiFactory = require("x-address-codec")
const SWTC_CHAINS = require("swtc-chains")
var alphabets = {}
SWTC_CHAINS.map(
  chain_info => (alphabets[chain_info.code] = chain_info.ACCOUNT_ALPHABET)
)

const NODE_PUBLIC = 28
const NODE_PRIVATE = 32
const ACCOUNT_ID = 0
const FAMILY_SEED = 33
const ED25519_SEED = [0x01, 0xe1, 0x4b]

module.exports = apiFactory({
  sha256: function(bytes) {
    return createHash("sha256")
      .update(new Buffer.from(bytes))
      .digest()
  },
  alphabets,
  defaultAlphabet: "jingtum",
  codecMethods: {
    EdSeed: {
      expectedLength: 16,
      version: ED25519_SEED
    },
    Seed: {
      // TODO: Use a map, not a parallel array
      versionTypes: ["ed25519", "secp256k1"],
      versions: [ED25519_SEED, FAMILY_SEED],
      expectedLength: 16
    },
    AccountID: { version: ACCOUNT_ID, expectedLength: 20 },
    Address: { version: ACCOUNT_ID, expectedLength: 20 },
    NodePublic: { version: NODE_PUBLIC, expectedLength: 33 },
    NodePrivate: { version: NODE_PRIVATE, expectedLength: 32 },
    K256Seed: { version: FAMILY_SEED, expectedLength: 16 }
  }
})
