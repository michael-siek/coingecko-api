import * as assert from 'assert'
import type { AxiosInstance } from 'axios'
import * as querystring from 'query-string'
import { API_CONNECTOR } from './utils'
import type { SimplePriceParams } from './types'

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
   *
   * @param {SimplePriceParams} params - Object to pass through
   */

  public async simple(params: SimplePriceParams) {
    const method = 'simple/price'
    return await this.get(method, params)
  }

  private async get(method: string, params?: SimplePriceParams) {
    const endpoint = await this.build_request_path(method, params)
    const data = await this.axios.get(endpoint)
    return data
  }

  private async build_request_path(path: string, params?: SimplePriceParams) {
    let queryParams = ''
    if (Array.isArray(params?.ids) && params?.ids) {
      params.ids = params.ids.join(',')
    }

    if (typeof params === 'object') {
      queryParams = querystring.stringify(params)
    }

    console.log('QueryParams ->' + queryParams)

    path = queryParams ? `/${path}?${queryParams}` : `/${path}`

    console.log('Path ->' + path)

    return path
  }
}
