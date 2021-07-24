import { assert } from 'chai'
import { CoinGeckoAPI } from '../index'

describe('coinGeckoAPI', () => {
  const coinGeckoApi = new CoinGeckoAPI()
  it('Should ping server', async () => {
    const res = await coinGeckoApi.ping()

    assert.isNotNull(res)
    assert.isObject(res.data)
  })
})
