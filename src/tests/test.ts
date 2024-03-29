import 'mocha'
import { assert } from 'chai'
import CoinGeckoAPI from '..'

describe('CoinGeckoAPI', () => {
  const coinGeckoApi = new CoinGeckoAPI()

  describe('.ping', () => {
    it('Should ping server', async () => {
      const result = await coinGeckoApi.ping()
      assert.isObject(result)
    })
  })

  describe('.simple', () => {
    it('Returns the price of BTC when passed as a string', async () => {
      const data = await coinGeckoApi.simple({
        ids: 'Bitcoin',
        vs_currencies: 'usd'
      })

      assert.isObject(data)
      assert.isNotNull(data.bitcoin)
      assert.isUndefined(data.ethereum)
    })

    it('Returns the price of BTC/ETH when passed as an array', async () => {
      const data = await coinGeckoApi.simple({
        ids: ['Bitcoin', 'Ethereum'],
        vs_currencies: 'usd'
      })

      assert.isObject(data)
      assert.isNotNull(data.bitcoin)
      assert.isNotNull(data.ethereum)
    })
  })

  describe('.simple/token_price', () => {
    it('Returns the token address (CAKE) and the price', async () => {
      const data = await coinGeckoApi.simpleTokenPrice('binance-smart-chain', {
        contract_addresses: '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82',
        vs_currencies: 'usd'
      })

      assert.isObject(data)
      assert.isNotNull(data[0])
    })

    it('Returns the price of CAKE and BUNNY when passed as an array', async () => {
      const data = await coinGeckoApi.simpleTokenPrice('binance-smart-chain', {
        contract_addresses: [
          '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82',
          '0xc9849e6fdb743d08faee3e34dd2d1bc69ea11a51'
        ],
        vs_currencies: 'usd'
      })

      assert.isObject(data)
      assert.isNotNull(data[0])
      assert.isNotNull(data[1])
    })
  })

  describe('./simple/supported_vs_currencies', () => {
    it('Return an array of supported currencies', async () => {
      const data = await coinGeckoApi.supportedCurrencies()

      assert.isArray(data)
      assert.isNotNull(data[0])
    })
  })

  describe('.coins/list', () => {
    it('Return list of all the supported coins', async () => {
      const data = await coinGeckoApi.coinList()
      const { id, symbol, name } = data[0]
      assert.isArray(data)
      assert.isNotNull(id)
      assert.isNotNull(symbol)
      assert.isNotNull(name)
    })
  })

  describe('.coins/market', () => {
    it('Return all the coins market data (price, market cap, volume)', async () => {
      const data = await coinGeckoApi.coinMarkets({
        vs_currency: 'usd'
      })
      const { id, symbol, name } = data[0]

      assert.isArray(data)
      assert.isNotNull(id)
      assert.isNotNull(symbol)
      assert.isNotNull(name)
    })
  })

  describe('.coins/{id}', () => {
    it('Returns current data (name, price, market, ... including exchange tickers) for a coin', async () => {
      const data = await coinGeckoApi.coins('bitcoin')

      assert.isObject(data)
      assert.isNotNull(data.id)
      assert.isNotNull(data.symbol)
      assert.isNotNull(data.name)
    })
  })

  describe('.coins/{id}/tickers', () => {
    it('Returns coin tickers (paginated to 100 items)', async () => {
      const data = await coinGeckoApi.coinTickers('bitcoin')

      assert.isObject(data)
      assert.isNotNull(data.name)
    })
  })

  describe('.coins/{id}/history', () => {
    it('Returns historical data (name, price, market, stats) at a given date for a coin with localization set to false', async () => {
      const data = await coinGeckoApi.coinHistory('bitcoin', '30-12-2017', {
        localization: false
      })

      assert.isObject(data)
      assert.isNotNull(data.id)
      assert.isNotNull(data.symbol)
      assert.isNotNull(data.name)
    })

    it('Returns historical data (name, price, market, stats) at a given date for a coin', async () => {
      const data = await coinGeckoApi.coinHistory('bitcoin', '30-12-2017')

      assert.isObject(data)
      assert.isNotNull(data.id)
      assert.isNotNull(data.symbol)
      assert.isNotNull(data.name)
    })
  })

  describe('.coins/{id}/market_chart', () => {
    it('Return historical market data include price, market cap, and 24h volume (granularity auto)', async () => {
      const data = await coinGeckoApi.coinMarketChart('bitcoin', {
        vs_currency: 'usd',
        days: '1'
      })

      assert.isObject(data)
      assert.isNotNull(data.prices)
      assert.isNotNull(data.market_caps)
      assert.isNotNull(data.total_volumes)
    })
  })

  describe('.coins/{id}/market_chart/range', () => {
    it('Return historical market data include price, market cap, and 24h volume within a range of timestamp (granularity auto)', async () => {
      const data = await coinGeckoApi.coinMarketChartRange('bitcoin', {
        vs_currency: 'usd',
        from: '1392577232',
        to: '1422577232'
      })

      assert.isObject(data)
      assert.isNotNull(data.prices)
      assert.isNotNull(data.market_caps)
      assert.isNotNull(data.total_volumes)
    })
  })

  describe('.coins/{id}/ohlc', () => {
    it('Return candles body: 1-2 days: 30mins // 3-30 days: 4hours // 31 and before: 4 days', async () => {
      const data = await coinGeckoApi.coinOHLC('bitcoin', {
        vs_currency: 'usd',
        days: 7
      })

      assert.isArray(data)
    })
  })

  describe('.coins/{id}/contract/{contract_address}', () => {
    it('Return coin info from contract address', async () => {
      const data = await coinGeckoApi.contractInformation(
        'binance-smart-chain',
        '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82'
      )

      assert.isObject(data)
      assert.isNotNull(data.id)
      assert.isNotNull(data.symbol)
      assert.isNotNull(data.name)
    })
  })

  describe('.coins/{id}/contract/{contract_address}/market_chart', () => {
    it('Return historical market data include price, market cap, and 24h volume (granularity auto)', async () => {
      const data = await coinGeckoApi.contractMarketChart(
        'binance-smart-chain',
        '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82',
        {
          vs_currency: 'usd',
          days: '1'
        }
      )

      assert.isObject(data)
      assert.isNotNull(data.prices)
      assert.isNotNull(data.market_caps)
      assert.isNotNull(data.total_volumes)
    })
  })

  describe('.coins/{id}/contract/{contract_address}/market_chart/range', () => {
    it('Return historical market data include price, market cap, and 24h volume within a range of timestamp (granularity auto)', async () => {
      const data = await coinGeckoApi.contractMarketChartRange(
        'binance-smart-chain',
        '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82',
        {
          vs_currency: 'usd',
          from: '1619881896',
          to: '1619968296'
        }
      )

      assert.isObject(data)
      assert.isNotNull(data.prices)
      assert.isNotNull(data.market_caps)
      assert.isNotNull(data.total_volumes)
    })
  })

  describe('.asset_platforms', () => {
    it('Return list of all asset platforms', async () => {
      const data = await coinGeckoApi.assetPlatforms()

      assert.isArray(data)
      assert.isNotNull(data.id)
      assert.isNotNull(data.chain_identifier)
      assert.isNotNull(data.name)
    })
  })

  describe('./coins/categories/list', () => {
    it('Return list of all categories', async () => {
      const data = await coinGeckoApi.categoriesList()

      assert.isArray(data)
      assert.isNotNull(data.category_id)
      assert.isNotNull(data.name)
    })
  })

  describe('./coins/categories', () => {
    it('Return list of all categories with market data (market_cap_desc (default))', async () => {
      const data = await coinGeckoApi.categoriesListMarketData()

      assert.isArray(data)
      assert.isNotNull(data.id)
      assert.isNotNull(data.name)
      assert.isNotNull(data.market_cap)
      assert.isNotNull(data.market_cap_change_24h)
      assert.isNotNull(data.volume_24h)
      assert.isNotNull(data.updated_at)
    })
    it('Return list of all categories with market data (market_cap_asc)', async () => {
      const data = await coinGeckoApi.categoriesListMarketData({
        order: 'market_cap_asc'
      })

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
      const data = await coinGeckoApi.exchangesList()

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
      const data = await coinGeckoApi.exchanges({
        per_page: 1,
        page: '1'
      })

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
      const data = await coinGeckoApi.exchangesList()

      assert.isArray(data)
      assert.isNotNull(data.id)
      assert.isNotNull(data.name)
    })
  })

  describe('./exchanges/{id}', () => {
    it('Return exchange volume in BTC and tickers', async () => {
      const data = await coinGeckoApi.exchangesById('binance')

      assert.isObject(data)
      assert.isNotNull(data.name)
      assert.isNotNull(data.year_established)
      assert.isNotNull(data.country)
    })
  })

  describe('./exchanges/{id}/tickers', () => {
    it('Return exchange tickers', async () => {
      const data = await coinGeckoApi.exchangeTickers('binance')

      assert.isObject(data)
      assert.isNotNull(data.name)
      assert.isNotNull(data.tickers)
    })
  })

  describe('./exchanges/{id}/volume_chart', () => {
    it('Return volume chart data for a given exchange', async () => {
      const data = await coinGeckoApi.exchangesVolumeChart('binance', 1)

      assert.isArray(data)
      assert.isNotNull(data)
    })
  })

  describe('./indexes', () => {
    it('Return list of all market indexes', async () => {
      const data = await coinGeckoApi.indexes()

      assert.isArray(data)
      assert.isNotNull(data.name)
      assert.isNotNull(data.id)
      assert.isNotNull(data.market)
    })
  })

  describe('./indexes/list', () => {
    it('Return list of all market indexes', async () => {
      const data = await coinGeckoApi.indexesList()

      assert.isArray(data)
      assert.isNotNull(data.id)
      assert.isNotNull(data.name)
    })
  })

  describe('./companies/public_treasury/{coin_id}', () => {
    it('Return list of companies holding bitcoin or ethereum', async () => {
      const data = await coinGeckoApi.companies('ethereum')

      assert.isObject(data)
      assert.isNotNull(data.name)
      assert.isNotNull(data.symbol)
      assert.isArray(data.companies)
      assert.isNotNull(data.companies[0].total_holdings)
    })
  })
})
