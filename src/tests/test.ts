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

    it.only('Returns the price of BTC/ETH when passed as an array', async () => {
      const { data, request } = await coinGeckoApi.simple({
        ids: ['Bitcoin', 'Ethereum'],
        vs_currencies: 'usd'
      })
      console.log(data)

      assert.equal(request.res.statusCode, 200)
      assert.isObject(data)
      assert.isNotNull(data.bitcoin)
      assert.isNotNull(data.ethereum)
    })
  })
})
