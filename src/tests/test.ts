import { assert } from 'chai'
import { CoinGeckoAPI } from '../index'

describe('coinGeckoAPI', () => {
  const coinGeckoApi = new CoinGeckoAPI()
  it('Should ping server', async () => {
    const result = await coinGeckoApi.ping()
    const statusCode = result.request.res.statusCode

    assert.equal(statusCode, 200)
    assert.isObject(result.data)
  })

  it('Should get simple/price of passed asset', async () => {
    const result = await coinGeckoApi.simple({
      // ids: ['Bitcoin', 'Ethereum'],
      ids: 'Bitcoin',
      vs_currencies: 'usd'
    })
    const statusCode = result.request.res.statusCode

    assert.equal(statusCode, 200)
    assert.isObject(result.data)
    console.log(result.data)
  })
})
