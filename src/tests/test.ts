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
      const { data, request } = await coinGeckoApi.simpleTokenPrice(
        'binance-smart-chain',
        {
          contract_addresses: '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82',
          vs_currencies: 'usd'
        }
      )

      assert.equal(request.res.statusCode, 200)
      assert.isObject(data)
      assert.isNotNull(data[0])
    })

    it('Returns the price of CAKE and BUNNY when passed as an array', async () => {
      const { data, request } = await coinGeckoApi.simpleTokenPrice(
        'binance-smart-chain',
        {
          contract_addresses: [
            '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82',
            '0xc9849e6fdb743d08faee3e34dd2d1bc69ea11a51'
          ],
          vs_currencies: 'usd'
        }
      )

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

  describe('.coins/{id}', () => {
    it('Returns current data (name, price, market, ... including exchange tickers) for a coin', async () => {
      const { data, request } = await coinGeckoApi.coins('bitcoin')
      const statusCode = request.res.statusCode

      assert.equal(statusCode, 200)
      assert.isObject(data)
      assert.isNotNull(data.id)
      assert.isNotNull(data.symbol)
      assert.isNotNull(data.name)
    })
  })

  describe('.coins/{id}/tickers', () => {
    it('Returns coin tickers (paginated to 100 items)', async () => {
      const { data, request } = await coinGeckoApi.coinTickers('bitcoin')
      const statusCode = request.res.statusCode

      assert.equal(statusCode, 200)
      assert.isObject(data)
      assert.isNotNull(data.id)
      assert.isNotNull(data.symbol)
      assert.isNotNull(data.name)
    })

    it('Returns coin tickers only listed on Binance', async () => {
      const { data, request } = await coinGeckoApi.coinTickers('bitcoin', {
        exchange_ids: 'binance'
      })
      const statusCode = request.res.statusCode

      assert.equal(statusCode, 200)
      assert.isObject(data)
      assert.isNotNull(data.id)
      assert.isNotNull(data.symbol)
      assert.isNotNull(data.name)
    })
  })

  describe('.coins/{id}/history', () => {
    it('Returns historical data (name, price, market, stats) at a given date for a coin with localization set to false', async () => {
      const { data, request } = await coinGeckoApi.coinHistory(
        'bitcoin',
        '30-12-2017',
        {
          localization: false
        }
      )
      const statusCode = request.res.statusCode

      assert.equal(statusCode, 200)
      assert.isObject(data)
      assert.isNotNull(data.id)
      assert.isNotNull(data.symbol)
      assert.isNotNull(data.name)
    })

    it('Returns historical data (name, price, market, stats) at a given date for a coin', async () => {
      const { data, request } = await coinGeckoApi.coinHistory(
        'bitcoin',
        '30-12-2017'
      )
      const statusCode = request.res.statusCode

      assert.equal(statusCode, 200)
      assert.isObject(data)
      assert.isNotNull(data.id)
      assert.isNotNull(data.symbol)
      assert.isNotNull(data.name)
    })
  })

  describe('.coins/{id}/market_chart', () => {
    it('Return historical market data include price, market cap, and 24h volume (granularity auto)', async () => {
      const { data, request } = await coinGeckoApi.coinMarketChart('bitcoin', {
        vs_currency: 'usd',
        days: '1'
      })
      const statusCode = request.res.statusCode

      assert.equal(statusCode, 200)
      assert.isObject(data)
      assert.isNotNull(data.prices)
      assert.isNotNull(data.market_caps)
      assert.isNotNull(data.total_volumes)
    })
  })

  describe('.coins/{id}/market_chart/range', () => {
    it('Return historical market data include price, market cap, and 24h volume within a range of timestamp (granularity auto)', async () => {
      const { data, request } = await coinGeckoApi.coinMarketChartRange(
        'bitcoin',
        {
          vs_currency: 'usd',
          from: '1392577232',
          to: '1422577232'
        }
      )
      const statusCode = request.res.statusCode

      assert.equal(statusCode, 200)
      assert.isObject(data)
      assert.isNotNull(data.prices)
      assert.isNotNull(data.market_caps)
      assert.isNotNull(data.total_volumes)
    })
  })

  describe('.coins/{id}/status_updates', () => {
    it('Return status updates for a given coin', async () => {
      const { data, request } = await coinGeckoApi.coinStatusUpdates('bitcoin')
      const statusCode = request.res.statusCode

      assert.equal(statusCode, 200)
      assert.isObject(data)
      assert.isNotNull(data.id)
      assert.isNotNull(data.symbol)
      assert.isNotNull(data.name)
    })
  })

  describe('.coins/{id}/ohlc', () => {
    it('Return candles body: 1-2 days: 30mins // 3-30 days: 4hours // 31 and before: 4 days', async () => {
      const { data, request } = await coinGeckoApi.coinOHLC('bitcoin', {
        vs_currency: 'usd',
        days: 7
      })
      const statusCode = request.res.statusCode

      assert.equal(statusCode, 200)
      assert.isArray(data)
      assert.isNotNull(data.id)
      assert.isNotNull(data.symbol)
      assert.isNotNull(data.name)
    })
  })

  describe('.coins/{id}/contract/{contract_address}', () => {
    it('Return coin info from contract address', async () => {
      const { data, request } = await coinGeckoApi.contractInformation(
        'binance-smart-chain',
        '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82'
      )
      const statusCode = request.res.statusCode

      assert.equal(statusCode, 200)
      assert.isObject(data)
      assert.isNotNull(data.id)
      assert.isNotNull(data.symbol)
      assert.isNotNull(data.name)
    })
  })

  describe('.coins/{id}/contract/{contract_address}/market_chart', () => {
    it('Return historical market data include price, market cap, and 24h volume (granularity auto)', async () => {
      const { data, request } = await coinGeckoApi.contractMarketChart(
        'binance-smart-chain',
        '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82',
        {
          vs_currency: 'usd',
          days: '1'
        }
      )
      const statusCode = request.res.statusCode

      assert.equal(statusCode, 200)
      assert.isObject(data)
      assert.isNotNull(data.prices)
      assert.isNotNull(data.market_caps)
      assert.isNotNull(data.total_volumes)
    })
  })

  describe('.coins/{id}/contract/{contract_address}/market_chart/range', () => {
    it('Return historical market data include price, market cap, and 24h volume within a range of timestamp (granularity auto)', async () => {
      const { data, request } = await coinGeckoApi.contractMarketChartRange(
        'binance-smart-chain',
        '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82',
        {
          vs_currency: 'usd',
          from: '1619881896',
          to: '1619968296'
        }
      )
      const statusCode = request.res.statusCode

      assert.equal(statusCode, 200)
      assert.isObject(data)
      assert.isNotNull(data.prices)
      assert.isNotNull(data.market_caps)
      assert.isNotNull(data.total_volumes)
    })
  })

  describe('.asset_platforms', () => {
    it('Return list of all asset platforms', async () => {
      const { data, request } = await coinGeckoApi.assetPlatforms()
      const statusCode = request.res.statusCode

      assert.equal(statusCode, 200)
      assert.isArray(data)
      assert.isNotNull(data.id)
      assert.isNotNull(data.chain_identifier)
      assert.isNotNull(data.name)
    })
  })

  describe('./coins/categories/list', () => {
    it('Return list of all categories', async () => {
      const { data, request } = await coinGeckoApi.categoriesList()
      const statusCode = request.res.statusCode

      assert.equal(statusCode, 200)
      assert.isArray(data)
      assert.isNotNull(data.category_id)
      assert.isNotNull(data.name)
    })
  })

  describe('./coins/categories', () => {
    it('Return list of all categories with market data (market_cap_desc (default))', async () => {
      const { data, request } = await coinGeckoApi.categoriesListMarketData()
      const statusCode = request.res.statusCode

      assert.equal(statusCode, 200)
      assert.isArray(data)
      assert.isNotNull(data.id)
      assert.isNotNull(data.name)
      assert.isNotNull(data.market_cap)
      assert.isNotNull(data.market_cap_change_24h)
      assert.isNotNull(data.volume_24h)
      assert.isNotNull(data.updated_at)
    })
    it('Return list of all categories with market data (market_cap_asc)', async () => {
      const { data, request } = await coinGeckoApi.categoriesListMarketData({
        order: 'market_cap_asc'
      })
      const statusCode = request.res.statusCode

      assert.equal(statusCode, 200)
      assert.isArray(data)
      assert.isNotNull(data.id)
      assert.isNotNull(data.name)
      assert.isNotNull(data.market_cap)
      assert.isNotNull(data.market_cap_change_24h)
      assert.isNotNull(data.volume_24h)
      assert.isNotNull(data.updated_at)
    })
  })

  describe('./exchanges', () => {
    it('Return list of all exchanges', async () => {
      const { data, request } = await coinGeckoApi.exchangesList()
      const statusCode = request.res.statusCode

      assert.equal(statusCode, 200)
      assert.isArray(data)
      assert.isNotNull(data.id)
      assert.isNotNull(data.name)
      assert.isNotNull(data.year_established)
      assert.isNotNull(data.country)
      assert.isNotNull(data.description)
      assert.isNotNull(data.url)
      assert.isNotNull(data.image)
      assert.isNotNull(data.has_trading_incentive)
      assert.isNotNull(data.trust_score)
      assert.isNotNull(data.trust_score_rank)
      assert.isNotNull(data.trade_volume_24h_btc)
      assert.isNotNull(data.trade_volume_24h_btc_normalized)
    })

    it('Return list of all exchanges (page limit)', async () => {
      const { data, request } = await coinGeckoApi.exchanges({
        per_page: 1,
        page: '1'
      })
      const statusCode = request.res.statusCode

      assert.equal(statusCode, 200)
      assert.isArray(data)
      assert.isNotNull(data.id)
      assert.isNotNull(data.name)
      assert.isNotNull(data.year_established)
      assert.isNotNull(data.country)
      assert.isNotNull(data.description)
      assert.isNotNull(data.url)
      assert.isNotNull(data.image)
      assert.isNotNull(data.has_trading_incentive)
      assert.isNotNull(data.trust_score)
      assert.isNotNull(data.trust_score_rank)
      assert.isNotNull(data.trade_volume_24h_btc)
      assert.isNotNull(data.trade_volume_24h_btc_normalized)
    })
  })

  describe('./exchanges/list', () => {
    it('Return all supported markets id and name', async () => {
      const { data, request } = await coinGeckoApi.exchangesList()
      const statusCode = request.res.statusCode

      assert.equal(statusCode, 200)
      assert.isArray(data)
      assert.isNotNull(data.id)
      assert.isNotNull(data.name)
    })
  })

  describe('./exchanges/{id}', () => {
    it('Return exchange volume in BTC and tickers', async () => {
      const { data, request } = await coinGeckoApi.exchangesById('binance')
      const statusCode = request.res.statusCode

      assert.equal(statusCode, 200)
      assert.isObject(data)
      assert.isNotNull(data.name)
      assert.isNotNull(data.year_established)
      assert.isNotNull(data.country)
    })
  })

  describe('./exchanges/{id}/tickers', () => {
    it('Return exchange tickers', async () => {
      const { data, request } = await coinGeckoApi.exchangeTickers('binance')
      const statusCode = request.res.statusCode

      assert.equal(statusCode, 200)
      assert.isObject(data)
      assert.isNotNull(data.name)
      assert.isNotNull(data.tickers)
    })
  })

  describe('./exchanges/{id}/status_updates', () => {
    it('Return status updates for given exchange', async () => {
      const { data, request } = await coinGeckoApi.exchangesStatusUpdates(
        'binance'
      )
      const statusCode = request.res.statusCode

      assert.equal(statusCode, 200)
      assert.isObject(data)
      assert.isNotNull(data.status_updates)
      assert.isNotNull(data.status_updates.description)
      assert.isNotNull(data.status_updates.category)
      assert.isNotNull(data.status_updates.created_at)
    })
  })

  describe('./exchanges/{id}/volume_chart', () => {
    it('Return volume chart data for a given exchange', async () => {
      const { data, request } = await coinGeckoApi.exchangesVolumeChart(
        'binance',
        1
      )
      const statusCode = request.res.statusCode

      assert.equal(statusCode, 200)
      assert.isArray(data)
      assert.isNotNull(data)
    })
  })

  describe('./finance_platforms', () => {
    it('Return list of all finance platforms', async () => {
      const { data, request } = await coinGeckoApi.financePlatforms()
      const statusCode = request.res.statusCode

      assert.equal(statusCode, 200)
      assert.isArray(data)
      assert.isNotNull(data.name)
      assert.isNotNull(data.facts)
      assert.isNotNull(data.category)
      assert.isNotNull(data.centralized)
      assert.isNotNull(data.website_url)
    })
  })

  describe('./indexes', () => {
    it('Return list of all market indexes', async () => {
      const { data, request } = await coinGeckoApi.indexes()
      const statusCode = request.res.statusCode

      assert.equal(statusCode, 200)
      assert.isArray(data)
      assert.isNotNull(data.name)
      assert.isNotNull(data.id)
      assert.isNotNull(data.market)
    })
  })

  describe('./indexes/list', () => {
    it('Return list of all market indexes', async () => {
      const { data, request } = await coinGeckoApi.indexesList()
      const statusCode = request.res.statusCode

      assert.equal(statusCode, 200)
      assert.isArray(data)
      assert.isNotNull(data.id)
      assert.isNotNull(data.name)
    })
  })
})
