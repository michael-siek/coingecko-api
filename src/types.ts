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

/* coingecko responses */

export interface Ping {
  gecko_says: string
}

export interface Simple {
  [key: string]: Record<string, number>
}

export interface SimpleTokenPrice {
  [key: string]: Record<string, number>
}

export interface Roi {
  times: number
  currency: string
  percentage: number
}

export interface CoinMarkets {
  id: string
  symbol: string
  name: string
  image: string
  current_price: number
  market_cap: number
  market_cap_rank: number
  fully_diluted_valuation: number | null
  total_volume: number
  high_24h: number
  low_24h: number
  price_change_24h: number
  price_change_percentage_24h: number
  market_cap_change_24h: number
  market_cap_change_percentage_24h: number
  circulating_supply: number
  total_supply: number
  max_supply: number
  ath: number
  ath_change_percentage: number
  ath_date: string
  atl: number
  atl_change_percentage: number
  atl_date: string
  roi: Roi | null
  last_updated: string
}

export interface CoinList {
  id: string
  symbol: string
  name: string
}

interface CoinLinks {
  homepage: string[]
  blockchain_site: string[]
  official_forum_url: string[]
  chat_url: string[]
  announcement_url: string[]
  twitter_screen_name: string
  facebook_username: string
  bitcointalk_thread_identifier: string | null
  telegram_channel_identifier: string
  subreddit_url: string
  repos_url: {
    github: string[]
    bitbucket: string[]
  }
}

export interface Localization {
  en: string
  de: string
  es: string
  fr: string
  it: string
  pl: string
  ro: string
  hu: string
  nl: string
  pt: string
  sv: string
  vi: string
  tr: string
  ru: string
  ja: string
  zh: string
  'zh-tw': string
  ko: string
  ar: string
  th: string
  id: string
  cs: string
  da: string
  el: string
  hi: string
  no: string
  sk: string
  uk: string
  he: string
  fi: string
  bg: string
  hr: string
  lt: string
  sl: string
}

export interface Currency {
  aed: number | string
  ars: number | string
  aud: number | string
  bch: number | string
  bdt: number | string
  bhd: number | string
  bmd: number | string
  bnb: number | string
  brl: number | string
  btc: number | string
  cad: number | string
  chf: number | string
  clp: number | string
  cny: number | string
  czk: number | string
  dkk: number | string
  dot: number | string
  eos: number | string
  eth: number | string
  eur: number | string
  gbp: number | string
  hkd: number | string
  huf: number | string
  idr: number | string
  ils: number | string
  inr: number | string
  jpy: number | string
  krw: number | string
  kwd: number | string
  lkr: number | string
  ltc: number | string
  mmk: number | string
  mxn: number | string
  myr: number | string
  ngn: number | string
  nok: number | string
  nzd: number | string
  php: number | string
  pkr: number | string
  pln: number | string
  rub: number | string
  sar: number | string
  sek: number | string
  sgd: number | string
  thb: number | string
  try: number | string
  twd: number | string
  uah: number | string
  usd: number | string
  vef: number | string
  vnd: number | string
  xag: number | string
  xau: number | string
  xdr: number | string
  xlm: number | string
  xrp: number | string
  yfi: number | string
  zar: number | string
  bits: number | string
  link: number | string
  sats: number | string
}

export interface Ticker {
  base: string
  target: string
  market: {
    name: string
    identifier: string
    has_trading_incentive: boolean
  }
  last: number
  volume: number
  converted_last: {
    btc: number
    eth: number
    usd: number
  }
  converted_volume: {
    btc: number
    eth: number
    usd: number
  }
  trust_score: string
  bid_ask_spread_percentage: number
  timestamp: Date
  last_traded_at: Date
  last_fetch_at: Date
  is_anomaly: boolean
  is_stale: boolean
  trade_url: string
  token_info_url: null | string
  coin_id: string
  target_coin_id: string
}

export interface MarketData {
  current_price: Currency
  total_value_locked: number | null
  mcap_to_tvl_ratio: number | null
  fdv_to_tvl_ratio: number | null
  roi: number | null
  ath: Currency
  ath_change_percentage: Currency
  ath_date: Currency
  atl: Currency
  atl_change_percentage: Currency
  atl_date: Currency
  market_cap: Currency
  market_cap_rank: number
  fully_diluted_valuation: number
  total_volume: Currency
  high_24h: Currency
  low_24h: Currency
  price_change_24h: number
  price_change_percentage_24h: number
  price_change_percentage_7d: number
  price_change_percentage_14d: number
  price_change_percentage_30d: number
  price_change_percentage_60d: number
  price_change_percentage_200d: number
  price_change_percentage_1y: number
  market_cap_change_24h: number
  market_cap_change_percentage_24h: number
  price_change_24h_in_currency: Currency
  price_change_percentage_1h_in_currency: Currency
  price_change_percentage_24h_in_currency: Currency
  price_change_percentage_7d_in_currency: Currency
  price_change_percentage_14d_in_currency: Currency
  price_change_percentage_30d_in_currency: Currency
  price_change_percentage_60d_in_currency: Currency
  price_change_percentage_200d_in_currency: Currency
  price_change_percentage_1y_in_currency: Currency
  market_cap_change_24h_in_currency: Currency
  market_cap_change_percentage_24h_in_currency: Currency
  total_supply: number
  max_supply: number
  circulating_supply: number
  last_updated: Date
}

export interface Coins {
  id: string
  symbol: string
  name: string
  asset_platform_id: unknown
  platforms: Record<string, string>
  block_time_in_minutes: number
  hashing_algorithm: string
  categories: string[]
  public_notice: unknown
  additional_notices: string[]
  localization: Localization
  description: Localization
  links: CoinLinks
  image: {
    thumb: string
    small: string
    large: string
  }
  country_origin: string
  genesis_date: string
  sentiment_votes_up_percentage: number
  sentiment_votes_down_percentage: number
  market_cap_rank: number
  coingecko_rank: number
  coingecko_score: number
  developer_score: number
  community_score: number
  liquidity_score: number
  public_interest_score: number
  market_data: MarketData
  community_data: {
    facebook_likes: string | number | null
    twitter_followers: number
    reddit_average_posts_48h: number
    reddit_average_comments_48h: number
    reddit_subscribers: number
    reddit_accounts_active_48h: number
    telegram_channel_user_count: string | number | null
  }
  developer_data: {
    forks: number
    stars: number
    subscribers: number
    total_issues: number
    closed_issues: number
    pull_requests_merged: number
    pull_request_contributors: number
    code_additions_deletions_4_weeks: { additions: number; deletions: number }
    commit_count_4_weeks: number
    last_4_weeks_commit_activity_series: number[]
  }
  public_interest_stats: { alexa_rank: number; bing_matches: null | number }
  status_updates: number[]
  last_updated: Date
  tickers: Ticker[]
}

export interface Tickers {
  name: string
  tickers: Ticker[]
}

export interface CoinHistory {
  id: string
  symbol: string
  name: string
  localization: Localization
  image: {
    thumb: string
    small: string
  }
  market_data: {
    current_price: Currency
    market_cap: Currency
    total_volume: Currency
  }
  community_data: {
    facebook_likes: null | number
    twitter_followers: number
    reddit_average_posts_48h: number
    reddit_average_comments_48h: number
    reddit_subscribers: number
    reddit_accounts_active_48h: string
  }
  developer_data: {
    forks: number
    stars: number
    subscribers: number
    total_issues: number
    closed_issues: number
    pull_requests_merged: number
    pull_request_contributors: number
    number: { additions: null; deletions: null | number }
    commit_count_4_weeks: 147
  }
  public_interest_stats: { alexa_rank: number; bing_matches: null | number }
}

export interface CoinMarketChart {
  prices: Record<number, number>
  market_caps: Record<number, number>
  total_volumes: Record<number, number>
}

export interface ContractInformation {
  id: string
  symbol: string
  name: string
  asset_platform_id: string
  platforms: {
    [key: string]: string
    energi: string
  }
  block_time_in_minutes: number
  hashing_algorithm: string | null
  categories: string[]
  public_notice: string | null
  additional_notices: string[]
  localization: Localization
  description: Localization
  links: CoinLinks
  image: {
    thumb: string
    small: string
    large: string
  }
  country_origin: string
  genesis_date: null | Date
  contract_address: string
  sentiment_votes_up_percentage: number
  sentiment_votes_down_percentage: number
  market_cap_rank: number
  coingecko_rank: number
  coingecko_score: number
  developer_score: number
  community_score: number
  liquidity_score: number
  public_interest_score: number
  market_data: MarketData
  community_data: {
    facebook_likes: number | null
    twitter_followers: number
    reddit_average_posts_48h: number
    reddit_average_comments_48h: number
    reddit_subscribers: number
    reddit_accounts_active_48h: number
    telegram_channel_user_count: number
  }
  developer_data: {
    forks: number
    stars: number
    subscribers: number
    total_issues: number
    closed_issues: number
    pull_requests_merged: number
    pull_request_contributors: number
    code_additions_deletions_4_weeks: {
      additions: number | null
      deletions: number | null
    }
    commit_count_4_weeks: number
    last_4_weeks_commit_activity_series: number[]
  }
  public_interest_stats: { alexa_rank: number; bing_matches: number | null }
  status_updates: number[]
  last_updated: Date
  tickers: Ticker[]
}
