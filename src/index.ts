import * as assert from 'assert'
import type { AxiosInstance } from 'axios'
import * as querystring from 'query-string'
import { API_CONNECTOR } from './utils'

export class CoinGeckoAPI {
  private axios: AxiosInstance

  constructor() {
    this.axios = API_CONNECTOR
  }

  public async ping() {
    const method = 'ping'
    return await this.get(method)
  }

  public async global() {
    const method = 'global'
    return await this.get(method)
  }

  /**
   * @param params - Object to pass through
   * @param params.ids - (required) can be singular {ids: 'bitcoin'}
   *                    or {ids: ['Bitcoin','Ethereum']}
   * @param params.include_market_cap - (optional) boolean
   * @param params.include_24hr_vol - (optional) boolean
   * @param params.include_24hr_change - (optional) boolean
   * @param params.include_last_updated_at - (optional) boolean
   */
  public async simple(params: object) {
    const method = 'simple/price'
    return await this.get(method, params)
  }

  private async get(method: string, params?: object) {
    const endpoint = await this.build_request_path(method, params)
    const data = await this.axios.get(endpoint)
    return data
  }

  private async build_request_path(path: string, params?: object) {
    let queryParams: string = ''

    const options = { maxKeys: 0 }
    if (typeof params === 'object') {
      queryParams = querystring.stringify(options, params)
    }
    console.log('QueryParams ->' + queryParams)

    path = queryParams ? `/${path}?${queryParams}` : `/${path}`

    console.log('Path ->' + path)

    return path
  }
}
