import assert from 'assert'
import type { AxiosInstance } from 'axios'
import * as querystring from 'query-string'
import { API_CONNECTOR } from './utils'
import type {
  CoinListParams,
  CoinMarketParams,
  CoinsParams,
  CoinsTickersParams,
  SimplePriceParams,
  CoinsHistoryParams,
  SimpleTokenPriceParams,
  CoinsMarketChartParams,
  MarketChartRangeBaseParams,
  PageBaseParams,
  CoinOhlcParams,
  MarketChartBaseParams,
  CategoriesOrderParams,
  ExchangesTickersParams,
  FinanceProductParams,
  CompaniesHoldings
} from './types'

export default class CoinGeckoAPI {
  private axios: AxiosInstance

  constructor() {
    this.axios = API_CONNECTOR
  }

  public async ping() {
    const method = 'ping'
    return await this.get(method)
  }

  // Simple Endpoints

  /**
   *
   * @param {SimplePriceParams} params - Object to pass through
   */

  public async simple(params: SimplePriceParams) {
    const method = 'simple/price'
    return await this.get(method, params)
  }

  /**
   * @param id - (required) The ID of the platform to fetch
   * @param {SimpleTokenPriceParams} params - Object to pass through
   */

  public async simpleTokenPrice(id: string, params: SimpleTokenPriceParams) {
    assert(
      id,
      'The id of the platform issuing tokens is required example: "binance-smart-chain"'
    )

    const method = 'simple/token_price/' + id
    return await this.get(method, params)
  }

  public async supportedCurrencies() {
    const method = 'simple/supported_vs_currencies'
    return await this.get(method)
  }

  // Coin Endpoints

  /**
   *
   * @param {CoinListParams} params - Object to pass through
   */

  public async coinList(params?: CoinListParams) {
    const method = 'coins/list'
    return await this.get(method, params)
  }

  /**
   *
   * @param {CoinMarketParams} params - Object to pass through
   */

  public async coinMarkets(params?: CoinMarketParams) {
    const method = 'coins/markets'
    return await this.get(method, params)
  }

  /**
   * @param id (required) Pass the coin id e.g. bitcoin.
   * @param {CoinsParams} params - Object to pass through
   */

  public async coins(id: string, params?: CoinsParams) {
    assert(id, 'The ID of the coin is required e.g. Bitcoin.')

    const method = 'coins/' + id
    return await this.get(method, params)
  }

  /**
   * @param id (required) Pass the coin id e.g. bitcoin.
   * @param {CoinsTickersParams} params - Object to pass through
   */

  public async coinTickers(id: string, params?: CoinsTickersParams) {
    assert(id, 'The ID of the coin is required e.g. Bitcoin.')

    const method = 'coins/' + id + '/tickers'
    return await this.get(method, params)
  }

  /**
   * @param id (required) Pass the coin id e.g. bitcoin.
   * @param date (required) Pass data of data snapshot dd-mm-yyyy e.g. 30-12-2017
   * @param {CoinsHistoryParams} params - Object to pass through
   */

  public async coinHistory(
    id: string,
    date: string,
    params?: CoinsHistoryParams
  ) {
    assert(
      date,
      'Date must conform to this standard: dd-mm-yyyy e.g. 30-12-2017'
    )

    assert(id, 'The ID of the coin is required e.g. Bitcoin.')

    const method = 'coins/' + id + '/history?date=' + date
    return await this.get(method, params)
  }

  /**
   * @param id (required) Pass the coin id e.g. bitcoin.
   * @param {CoinsMarketChartParams} params - Object to pass through
   */

  public async coinMarketChart(id: string, params: CoinsMarketChartParams) {
    assert(id, 'The ID of the coin is required e.g. Bitcoin.')

    const method = 'coins/' + id + '/market_chart'
    return await this.get(method, params)
  }

  /**
   * @param id (required) Pass the coin id e.g. bitcoin.
   * @param {MarketChartRangeBaseParams} params - Object to pass through
   */

  public async coinMarketChartRange(
    id: string,
    params: MarketChartRangeBaseParams
  ) {
    assert(id, 'The ID of the coin is required e.g. Bitcoin.')

    const method = 'coins/' + id + '/market_chart/range'
    return await this.get(method, params)
  }

  /**
   * @param id (required) Pass the coin id e.g. bitcoin.
   * @param {PageBaseParams} params - Object to pass through
   */

  public async coinStatusUpdates(id: string, params?: PageBaseParams) {
    assert(id, 'The ID of the coin is required e.g. Bitcoin.')

    const method = 'coins/' + id + '/status_updates'
    return await this.get(method, params)
  }

  /**
   * @param id (required) Pass the coin id e.g. bitcoin.
   * @param {CoinOhlcParams} params - Object to pass through
   */

  public async coinOHLC(id: string, params: CoinOhlcParams) {
    assert(id, 'The ID of the coin is required e.g. Bitcoin.')

    const method = 'coins/' + id + '/ohlc'
    return await this.get(method, params)
  }

  // Contract Endpoints

  /**
   * @param id (required) Asset Platform e.g. binance-smart-chain
   * @param contract_address - Token's Contract Address
   */

  public async contractInformation(id: string, contract_address: string) {
    assert(id, 'The ID of said asset platform e.g. binance-smart-chain')

    const method = 'coins/' + id + '/contract/' + contract_address
    return await this.get(method)
  }

  /**
   * @param id (required) Asset Platform e.g. binance-smart-chain
   * @param contract_address - Token's Contract Address
   * @param {MarketChartBaseParams} - Object to pass through
   */

  public async contractMarketChart(
    id: string,
    contract_address: string,
    params: MarketChartBaseParams
  ) {
    assert(id, 'The ID of said asset platform e.g. binance-smart-chain.')
    assert(contract_address, 'Token contract address required.')

    const method =
      'coins/' + id + '/contract/' + contract_address + '/market_chart'

    return await this.get(method, params)
  }

  /**
   * @param id (required) Asset Platform e.g. binance-smart-chain
   * @param contract_address - Token's Contract Address
   * @param {MarketChartRangeBaseParams} - Object to pass through
   */

  public async contractMarketChartRange(
    id: string,
    contract_address: string,
    params: MarketChartRangeBaseParams
  ) {
    assert(id, 'The ID of said asset platform e.g. binance-smart-chain.')
    assert(contract_address, 'Token contract address required.')

    const method =
      'coins/' + id + '/contract/' + contract_address + '/market_chart/range'

    return await this.get(method, params)
  }

  // Asset Platforms Endpoint

  public async assetPlatforms() {
    const method = 'asset_platforms'
    return await this.get(method)
  }

  // Categories Endpoints

  public async categoriesList() {
    const method = 'coins/categories/list'
    return await this.get(method)
  }

  /**
   * @param {CategoriesOrderParams} - Object to pass through
   */

  public async categoriesListMarketData(params?: CategoriesOrderParams) {
    const method = 'coins/categories'
    return await this.get(method, params)
  }

  // Exchanges Endpoints

  /**
   * @param {PageBaseParams} - Object to pass through
   */

  public async exchanges(params?: PageBaseParams) {
    const method = 'exchanges'
    return await this.get(method, params)
  }

  public async exchangesList() {
    const method = 'exchanges/list'
    return await this.get(method)
  }

  /**
   * @param id (required) ID of the exchange e.g. binance
   */

  public async exchangesById(id: string) {
    assert(id, 'Pass the exchange ID e.g. binance')

    const method = 'exchanges/' + id
    return await this.get(method)
  }

  /**
   * @param id (required) ID of the exchange e.g. binance
   * @param {ExchangesTickersParams} - Object to pass through
   */

  public async exchangeTickers(id: string, params?: ExchangesTickersParams) {
    assert(id, 'Pass the exchange ID e.g. binance')

    const method = 'exchanges/' + id + '/tickers'
    return await this.get(method, params)
  }

  /**
   * @param id (required) ID of the exchange e.g. binance
   * @param {PageBaseParams} - Object to pass through
   */

  public async exchangesStatusUpdates(id: string, params?: PageBaseParams) {
    assert(id, 'Pass the exchange ID e.g. binance')

    const method = 'exchanges/' + id + '/status_updates'
    return await this.get(method, params)
  }

  /**
   * @param id (required) ID of the exchange e.g. binance
   * @param days (required) Data up to number of days ago (eg. 1,14,30)
   */

  public async exchangesVolumeChart(id: string, days: number) {
    assert(id, 'Pass the exchange ID e.g. binance')

    const method = 'exchanges/' + id + '/volume_chart?days=' + days
    return await this.get(method)
  }

  // Finance Endpoints

  /**
   * @param {PageBaseParams} params - Object to pass in
   */

  public async financePlatforms(params?: PageBaseParams) {
    const method = 'finance_platforms'
    return await this.get(method, params)
  }

  /**
   * @param {FinanceProductParams} params - Object to pass in
   */

  public async financeProducts(params?: FinanceProductParams) {
    const method = 'finance_products'
    return await this.get(method, params)
  }

  // Indexes Endpoints

  /**
   * @param {PageBaseParams} params - Object to pass in
   */

  public async indexes(params?: PageBaseParams) {
    const method = 'indexes'
    return await this.get(method, params)
  }

  /**
   * @param market_id - Pass the market id (can be obtained from ./exchanges/list)
   * @param id - Pass the index id (can be obtained from ./indexes/list)
   */

  public async indexesByMarketIndexId(market_id: string, id: string) {
    assert(id, 'Pass the index id (can be obtained from /indexes/list)')
    assert(
      market_id,
      'Pass the market id (can be obtained from ./exchanges/list)'
    )

    const method = 'indexes/' + market_id + '/' + id
    return await this.get(method)
  }

  public async indexesList() {
    const method = 'indexes/list'
    return await this.get(method)
  }

  /**
   *
   * @param {CompaniesHoldings} coin_id - bitcoin or ethereum
   */
  public async companies(coin_id: CompaniesHoldings) {
    const method = 'companies/public_treasury/' + coin_id
    return await this.get(method)
  }

  // Get and path builder functions

  private async get(method: string, params?: any) {
    const endpoint = this.build_request_path(method, params)
    const { data } = await this.axios.get(endpoint)
    return data
  }

  private build_request_path(path: string, params?: any) {
    let queryParams = ''
    if (Array.isArray(params?.ids) && params?.ids) {
      params.ids = params.ids.join(',')
    }

    if (
      Array.isArray(params?.contract_addresses) &&
      params?.contract_addresses
    ) {
      params.contract_addresses = params.contract_addresses.join(',')
    }

    if (typeof params === 'object') {
      queryParams = querystring.stringify(params)
    }

    path = queryParams ? `/${path}?${queryParams}` : `/${path}`

    return path
  }
}
