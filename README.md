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
