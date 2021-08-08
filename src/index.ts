import * as assert from 'assert'
import type { AxiosInstance } from 'axios'
import * as querystring from 'query-string'
import { API_CONNECTOR } from './utils'
import type {
  CoinListParams,
  CoinMarketParams,
  coinsParams,
  SimplePriceParams,
  SimpleTokenPriceParams
} from './types'

export class CoinGeckoAPI {
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
   *
   * @param {SimpleTokenPriceParams} params - Object to pass through
   */
  public async simpleTokenPrice(params: SimpleTokenPriceParams) {
    // TODO: This is very BAD we will need to change it
    // It is working but passing id pass through the path builder:
    //  path ->/simple/token_price/binance-smart-chain?contract_addresses=0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82&id=binance-smart-chain&vs_currencies=usd
    const method = 'simple/token_price/' + params.id
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
   *
   * @param {coinsParams} params - Object to pass through
   */
  public async coins(params?: coinsParams) {
    const method = '/coins/' + params?.id
    return await this.get(method, params)
  }

  private async get(method: string, params?: any) {
    const endpoint = await this.build_request_path(method, params)
    const data = await this.axios.get(endpoint)
    return data
  }

  private async build_request_path(path: string, params?: any) {
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
    // console.log('queryParams -> ' + queryParams)

    path = queryParams ? `/${path}?${queryParams}` : `/${path}`

    console.log('path ->' + path)

    return path
  }
}
