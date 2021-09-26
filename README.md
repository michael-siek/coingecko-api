# CoinGecko API TypeScript Wrapper

[![GitHub contributors](https://img.shields.io/github/contributors/michael-siek/coingecko-api)](https://github.com/michael-siek/coingecko-api/graphs/contributors)
[![npm](https://img.shields.io/npm/dt/@crypto-coffee/coingecko-api)](https://www.npmjs.com/package/@crypto-coffee/coingecko-api)

> An open-source TypeScript wrapper for the the CoinGecko API

[Coingecko API Documentation](https://www.coingecko.com/en/api/documentation)

## Installation

```console
npm install @crypto-coffee/coingecko-api
```

## Usage Example

```js
const CoinGeckoApi = require('@crypto-coffee/coingecko-api').default

;(async () => {
  try {
    const coinGeckoApi = new CoinGeckoApi()
    const results = await coinGeckoApi.simple({
      ids: 'Bitcoin',
      vs_currencies: 'usd'
    })
    console.log(results)
  } catch (err) {
    // do something with the error
  }
})()
```

## Endpoints

We have supplied the majority of CoinGecko's API. The available endpoints are supplied below:

### `Ping`

```js
const result = await coinGeckoApi.ping()
```

### `/simple/price`

```js
// Single id
const results = await coinGeckoApi.simple({
    vs_currencies: 'usd'
    id: 'bitcoin'
})
// Multiple ids
const results = await coinGeckoApi.simple({
    vs_currencies: 'usd'
    id: ['bitcoin', 'Ethereum']
})
```

### `/simple/token_price/{id}`

```js
// single contract_address
const results = await coinGeckoApi.simpleTokenPrice({
    'binance-smart-chain', {
    contract_addresses: '0x00',
    vs_currencies: 'usd'
    }
})
// Multiple contract_addresses
const results = await coinGeckoApi.simpleTokenPrice({
    'binance-smart-chain', {
    contract_addresses: ['0x00', '0x001'],
    vs_currencies: 'usd'
    }
})
```

### `/simple/supported_vs_currencies`

```js
const results = await coinGeckoApi.supportedCurrencies()
```

### `​/coins​/list`

```js
const results = await coinGeckoApi.coinList()
```

### `​/coins​/markets`

```js
const results = await coinGeckoApi.coinMarkets({ vs_currency: 'usd' })
```

### `​/coins​/{id}`

```js
const results = await coinGeckoApi.coinMarkets({ id: 'bitcoin' })
```

### `​/coins​/{id}​/tickers`

```js
const results = await coinGeckoApi.coinTickers('bitcoin', {
  exchange_ids: 'binance'
})

const { data, request } = await coinGeckoApi.coinTickers('bitcoin', {
  exchange_ids: 'binance'
})
```

### `​/coins​/{id}​/history`

```js
const results = await coinGeckoApi.coinHistory('bitcoin', '30-12-2017', {
  localization: false
})
const results = await coinGeckoApi.coinHistory('bitcoin', '30-12-2017')
```

### `​/coins​/{id}​/market_chart`

```js
const results = await coinGeckoApi.coinMarketChart('bitcoin', {
  vs_currency: 'usd',
  days: '1'
})
```

### `​/coins​/{id}​/market_chart​/range`

```js
const results = await coinGeckoApi.coinMarketChartRange('bitcoin', {
  vs_currency: 'usd',
  from: '1392577232',
  to: '1422577232'
})
```

### `​/coins​/{id}​/status_updates`

```js
const results = await coinGeckoApi.coinStatusUpdates('bitcoin')
```

### `​/coins​/{id}​/ohlc`

```js
const results = await coinGeckoApi.coinOHLC('bitcoin', {
  vs_currency: 'usd',
  days: 7
})
```

​

### `/coins​/{id}​/contract​/{contract_address}`

```js
const results = await coinGeckoApi.contractInformation(
  'binance-smart-chain',
  '0x00'
)
```

### `/coins​/{id}​/contract​/{contract_address}​/market_chart​/`

```js
const results = await coinGeckoApi.contractMarketChart(
  'binance-smart-chain',
  '0x00',
  {
    vs_currency: 'usd',
    days: '1'
  }
)
```

### `/coins​/{id}​/contract​/{contract_address}​/market_chart​/range`

```js
const results = await coinGeckoApi.contractMarketChartRange(
  'binance-smart-chain',
  '0x00',
  {
    vs_currency: 'usd',
    from: '1619881896',
    to: '1619968296'
  }
)
```

### `/asset_platforms`

```js
const results = await coinGeckoApi.assetPlatforms()
```

### `/coins​/categories​/list`

```js
const results = await coinGeckoApi.categoriesList()
```

### `/coins​/categories`

```js
const results = await coinGeckoApi.categoriesListMarketData()
```

### `/exchanges`

```js
const results = await coinGeckoApi.exchangesList()
```

### `/exchanges​/list`

```js
const results = await coinGeckoApi.exchangesList()
```

### `/exchanges​/{id}`

```js
const results = await coinGeckoApi.exchangesById('binance')
```

### `/exchanges​/{id}​/tickers`

```js
const results = await coinGeckoApi.exchangeTickers('binance')
```

### `/exchanges​/{id}​/status_updates`

```js
const results = await coinGeckoApi.exchangesStatusUpdates('binance')
```

### `/exchanges​/{id}​/volume_chart`

```js
const results = await coinGeckoApi.exchangesVolumeChart('binance', 1)
```

### Contributions

This package is maintained by [Zidious](https://github.com/Zidious)(Gabe) and [Michael](https://github.com/michael-siek). If any of the endpoints that are supplied by CoinGecko and are not in this package please only an issue and we will get them added as soon as possible.

:coffee: :coffee:
