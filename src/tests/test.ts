import { assert } from 'chai'
import { CoinGeckoAPI } from '../index'

describe('CoinGeckoAPI', () => {
  const coinGeckoApi = new CoinGeckoAPI()
  describe('.ping', () => {
    it('Should ping server and return a 200', async () => {
      const result = await coinGeckoApi.ping()
      const statusCode = result.request.res.statusCode
      assert.equal(statusCode, 200)
      assert.isObject(result.data)
    })
  })

  describe('.simple', () => {
    it('Returns the price of BTC when passed as a string', async () => {
      const { data, request } = await coinGeckoApi.simple({
        ids: 'Bitcoin',
        vs_currencies: 'usd'
      })

      assert.equal(request.res.statusCode, 200)
      assert.isObject(data)
      assert.isNotNull(data.bitcoin)
      assert.isUndefined(data.ethereum)
    })

    it('Returns the price of BTC/ETH when passed as an array', async () => {
      const { data, request } = await coinGeckoApi.simple({
        ids: ['Bitcoin', 'Ethereum'],
        vs_currencies: 'usd'
      })

      assert.equal(request.res.statusCode, 200)
      assert.isObject(data)
      assert.isNotNull(data.bitcoin)
      assert.isNotNull(data.ethereum)
    })
  })

  describe('.simple/token_price', () => {
    it('Returns the token address (CAKE) and the price', async () => {
      const { data, request } = await coinGeckoApi.simpleTokenPrice({
        id: 'binance-smart-chain',
        contract_addresses: '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82',
        vs_currencies: 'usd'
      })

      assert.equal(request.res.statusCode, 200)
      assert.isObject(data)
      assert.isNotNull(data[0])
    })

    it('Returns the price of CAKE and BUNNY when passed as an array', async () => {
      const { data, request } = await coinGeckoApi.simpleTokenPrice({
        id: 'binance-smart-chain',
        contract_addresses: [
          '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82',
          '0xc9849e6fdb743d08faee3e34dd2d1bc69ea11a51'
        ],
        vs_currencies: 'usd'
      })

      assert.equal(request.res.statusCode, 200)
      assert.isObject(data)
      assert.isNotNull(data[0])
      assert.isNotNull(data[1])
    })
  })

  describe('./simple/supported_vs_currencies', () => {
    it('Return an array of supported currencies', async () => {
      const { data, request } = await coinGeckoApi.supportedCurrencies()
      const statusCode = request.res.statusCode

      assert.equal(statusCode, 200)
      assert.isArray(data)
      assert.isNotNull(data[0])
    })
  })

  describe('.coins/list', () => {
    it('Return list of all the supported coins', async () => {
      const { data, request } = await coinGeckoApi.coinList()
      const statusCode = request.res.statusCode

      assert.equal(statusCode, 200)
      assert.isArray(data)
      assert.isNotNull(data.id)
      assert.isNotNull(data.symbol)
      assert.isNotNull(data.name)
    })
  })

  describe('.coins/market', () => {
    it('Return all the coins market data (price, market cap, volume)', async () => {
      const { data, request } = await coinGeckoApi.coinMarkets({
        vs_currency: 'usd'
      })
      const statusCode = request.res.statusCode

      assert.equal(statusCode, 200)
      assert.isArray(data)
      assert.isNotNull(data.id)
      assert.isNotNull(data.symbol)
      assert.isNotNull(data.name)
    })
  })
})
