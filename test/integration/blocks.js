/* global describe, it */
'use strict'

var assert = require('assert')
var bitcoin = require('../../')

describe('bitcoinjs-lib (blocks)', function () {
  it('can extract a height from a CoinBase transaction', function () {
    // from 00000000000000000097669cdca131f24d40c4cc7d80eaa65967a2d09acf6ce6
    let txHex = '010000000001010000000000000000000000000000000000000000000000000000000000000000ffffffff50037f9a07174d696e656420627920416e74506f6f6c685b205a2b1f7bfabe6d6d36afe1910eca9405b66f97750940a656e38e2c0312958190ff8e98fd16761d220400000000000000aa340000d49f0000ffffffff02b07fc366000000001976a9148349212dc27ce3ab4c5b29b85c4dec643d764b1788ac0000000000000000266a24aa21a9ed72d9432948505e3d3062f1307a3f027a5dea846ff85e47159680919c12bf1e400120000000000000000000000000000000000000000000000000000000000000000000000000'
    let tx = bitcoin.Transaction.fromHex(txHex)

    assert.strictEqual(tx.ins.length, 1)
    let script = tx.ins[0].script
    // bitcoin.script.decompile(script) // returns [] :(

    assert.strictEqual(script[0], 0x03)
    let heightBuffer = script.slice(1, 4)
    let height = bitcoin.script.number.decode(heightBuffer)
    assert.strictEqual(height, 498303)
  })
})
