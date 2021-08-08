import internal = require('stream')

// Simple Price Base Interface ->
interface SimplePriceBaseParams {
  vs_currencies: 'usd'
  include_market_cap?: boolean
  include_24hr_vol?: boolean
  include_24hr_change?: boolean
  include_last_updated_at?: boolean
}

interface AvailableCurrencies {
  // Currencies
}
export interface SimplePriceParams extends SimplePriceBaseParams {
  // (required) can be singular {ids: 'bitcoin'} or {ids: ['Bitcoin','Ethereum']}
  ids: string | string[]
}

export interface SimpleTokenPriceParams extends SimplePriceBaseParams {
  // (required) The id of the platform issuing tokens
  id: String
  // (required) can be singular {contract_addresses: '0x000'} or {contract_addresses: ['0x000','0x001']}
  contract_addresses: string | string[]
}

export interface CoinListParams {
  include_platform?: boolean
}

export interface CoinMarketParams {
  // (required) The target currency of market data (usd, eur, jpy, etc.)
  vs_currency: 'usd'
  ids?: string
  category?: string
  order?: string
  per_page?: number
  page?: number
  sparkline?: boolean
  price_change_percentage?: string
}

export interface coinsParams {
  // (required) pass the coin id (can be obtained from /coins) eg. bitcoin

  id: string
  localization?: string
  tickers?: boolean
  market_data?: boolean
  community_data?: boolean
  developer_data?: boolean
  sparkline?: boolean
}
