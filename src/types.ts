// Simple Price Base Interface
export interface SimplePriceBaseParams {
  vs_currencies: 'usd'
  include_market_cap?: boolean
  include_24hr_vol?: boolean
  include_24hr_change?: boolean
  include_last_updated_at?: boolean
}

export interface MarketChartBaseParams {
  // (required) The target currency of market data (usd, eur, jpy, etc.)
  vs_currency: 'usd'
  // (required) Data up to number of days ago (eg. 1,14,30,max)
  days: string
}

export interface PageBaseParams {
  per_page?: string | number
  page?: string | number
}

export interface SimplePriceParams extends SimplePriceBaseParams {
  // (required) can be singular {ids: 'bitcoin'} or {ids: ['Bitcoin','Ethereum']}
  ids: string | string[]
}

export interface SimpleTokenPriceParams extends SimplePriceBaseParams {
  // (required) can be singular {contract_addresses: '0x000'} or {contract_addresses: ['0x000','0x001']}
  contract_addresses: string | string[]
}

export interface CoinListParams {
  include_platform?: boolean
}

export interface CoinMarketParams extends PageBaseParams {
  // (required) The target currency of market data (usd, eur, jpy, etc.)
  vs_currency: 'usd'
  ids?: string
  category?: string
  order?: string
  sparkline?: boolean
  price_change_percentage?: string
}

export interface CoinsParams {
  localization?: string
  tickers?: boolean
  market_data?: boolean
  community_data?: boolean
  developer_data?: boolean
  sparkline?: boolean
}

export interface CoinsTickersParams {
  exchange_ids?: string
  include_exchange_logo?: string
  page?: number
  order?: string
  depth?: string
}

export interface CoinsHistoryParams {
  localization?: boolean
}

export interface CoinsMarketChartParams extends MarketChartBaseParams {
  interval?: string
}

export interface MarketChartRangeBaseParams {
  // (required) The target currency of market data (usd, eur, jpy, etc.)
  vs_currency: 'usd'
  // (required) From date in UNIX Timestamp (eg. 1392577232)
  from: string
  // (required) To date in UNIX Timestamp (eg. 1422577232)
  to: string
}

export interface CoinOhlcParams {
  // (required) The target currency of market data (usd, eur, jpy, etc.)
  vs_currency: 'usd'
  // (required) Data up to number of days ago (1/7/14/30/90/180/365/max)
  days: number
}

export interface CategoriesOrderParams {
  order?:
    | 'market_cap_asc'
    | 'name_desc'
    | 'name_asc'
    | 'market_cap_change_24h_desc'
    | 'market_cap_change_24h_asc'
}

export interface ExchangesTickersParams {
  coin_ids?: string
  include_exchange_logo?: string
  page?: number
  depth?: string
  order?: string
}

export interface FinanceProductParams extends PageBaseParams {
  start_at?: string
  end_at?: string
}

export type CompaniesHoldings = 'bitcoin' | 'ethereum'
