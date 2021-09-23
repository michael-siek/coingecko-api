# CoinGecko API TypeScript Wrapper

An open-source TypeScript wrapper for the the CoinGecko API

[Coingecko API Documentation](https://www.coingecko.com/en/api/documentation)

## Installation

```console
npm install @crypto-coffee/coingecko-api
```

## Usage Example

```js
const CoinGeckoAPI = require('@crypto-coffee/coingecko-api').default

try {
  const coinGeckoApi = new CoinGeckoApi()
  const results = await coinGeckoApi.simple({
    ids: 'Bitcoin',
    vs_currencies: 'usd'
  })
} catch (err) {
  // do something with the error
}
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
const { data } = await coinGeckoApi.simple({
    vs_currencies: 'usd'
    id: 'bitcoin'
})
// Multiple ids
const { data } = await coinGeckoApi.simple({
    vs_currencies: 'usd'
    id: ['bitcoin', 'Ethereum']
})
```

### `/simple/token_price/{id}`

```js
// single contract_address
const { data } = await coinGeckoApi.simpleTokenPrice({
    'binance-smart-chain', {
    contract_addresses: '0x00',
    vs_currencies: 'usd'
    }
})
// Multiple contract_addresses
const { data } = await coinGeckoApi.simpleTokenPrice({
    'binance-smart-chain', {
    contract_addresses: ['0x00', '0x001'],
    vs_currencies: 'usd'
    }
})
```

### `/simple/supported_vs_currencies`

```js
const { data } = await coinGeckoApi.supportedCurrencies()
```

### `​/coins​/list`

```js
const { data } = await coinGeckoApi.coinList()
```

### `​/coins​/markets`

```js
const { data } = await coinGeckoApi.coinMarkets({ vs_currency: 'usd' })
```

### `​/coins​/{id}`

```js
const { data } = await coinGeckoApi.coinMarkets({ id: 'bitcoin' })
```

### `​/coins​/{id}​/tickers`

```js
const { data } = await coinGeckoApi.coinTickers('bitcoin', {
  exchange_ids: 'binance'
})

const { data, request } = await coinGeckoApi.coinTickers('bitcoin', {
  exchange_ids: 'binance'
})
```

### `​/coins​/{id}​/history`

```js
const { data } = await coinGeckoApi.coinHistory('bitcoin', '30-12-2017', {
  localization: false
})
const { data } = await coinGeckoApi.coinHistory('bitcoin', '30-12-2017')
```

### `​/coins​/{id}​/market_chart`

```js
const { data } = await coinGeckoApi.coinMarketChart('bitcoin', {
  vs_currency: 'usd',
  days: '1'
})
```

### `​/coins​/{id}​/market_chart​/range`

```js
const { data } = await coinGeckoApi.coinMarketChartRange('bitcoin', {
  vs_currency: 'usd',
  from: '1392577232',
  to: '1422577232'
})
```

### `​/coins​/{id}​/status_updates`

```js
const { data } = await coinGeckoApi.coinStatusUpdates('bitcoin')
```

### `​/coins​/{id}​/ohlc`

```js
const { data } = await coinGeckoApi.coinOHLC('bitcoin', {
  vs_currency: 'usd',
  days: 7
})
```

​

### `/coins​/{id}​/contract​/{contract_address}`

```js
const { data } = await coinGeckoApi.contractInformation(
  'binance-smart-chain',
  '0x00'
)
```

### `/coins​/{id}​/contract​/{contract_address}​/market_chart​/`

```js
const { data } = await coinGeckoApi.contractMarketChart(
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
const { data } = await coinGeckoApi.contractMarketChartRange(
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
const { data } = await coinGeckoApi.assetPlatforms()
```

### `/coins​/categories​/list`

```js
const { data } = await coinGeckoApi.categoriesList()
```

### `/coins​/categories`

```js
const { data } = await coinGeckoApi.categoriesListMarketData()
```

### `/exchanges`

```js
const { data } = await coinGeckoApi.exchangesList()
```

### `/exchanges​/list`

```js
const { data } = await coinGeckoApi.exchangesList()
```

### `/exchanges​/{id}`

```js
const { data } = await coinGeckoApi.exchangesById('binance')
```

### `/exchanges​/{id}​/tickers`

```js
const { data } = await coinGeckoApi.exchangeTickers('binance')
```

### `/exchanges​/{id}​/status_updates`

```js
const { data } = await coinGeckoApi.exchangesStatusUpdates('binance')
```

### `/exchanges​/{id}​/volume_chart`

```js
const { data } = await coinGeckoApi.exchangesVolumeChart('binance', 1)
```

### Contributions

This package is maintained by [Zidious](https://github.com/Zidious) and [Michael](https://github.com/michael-siek). If any of the endpoints that are supplied by CoinGecko and are not in this package please request them and we will get them added as soon as possible.

:coffee: :coffee:
