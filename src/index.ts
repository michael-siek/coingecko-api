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

  public async simple(params?: object) {
    const method = 'simple'
    return await this.get(method, params)
  }

  private async get(method: string, params?: object) {
    const endpoint = this.build_request_path(method, params)
    const data = await this.axios.get(await endpoint)
    return data
  }

  private async build_request_path(path: string, params?: object) {
    let queryParams: string = ''
    if (typeof params === 'object' && !params) {
      queryParams = querystring.stringify(params)
    }
    path = queryParams ? `/${path}?${params}` : `/${path}`
    return path
  }
}
