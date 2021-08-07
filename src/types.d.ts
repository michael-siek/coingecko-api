export interface SimplePriceParams {
  // (required) can be singular {ids: 'bitcoin'} or {ids: ['Bitcoin','Ethereum']}
  ids: string | string[]
  vs_currencies: 'usd'
  include_market_cap?: boolean
  include_24hr_vol?: boolean
  include_24hr_change?: boolean
  include_last_updated_at?: boolean
}
