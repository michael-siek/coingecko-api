import * as assert from 'assert'
import type { AxiosInstance } from 'axios'
import { API_CONNECTOR } from './utils'

// api.simple.token_price()

class CoinGeckoAPI {
  private axios: AxiosInstance

  constructor() {
    this.axios = API_CONNECTOR
  }

  public async vs_currencies(param) {
    this.vs_currencies = params
    return this
  } 

  public async ping() {
    const method = 'ping'
    return await this.get(method)
  }

  public async global() {
    const method = 'global'
    return await this.get(method)
  }

  public async simple({ }) {
    const method = 'simple'
    const params = 'price'
    return await this.get(method, params)
  }

  private endpoint(...args: any[]) {
    const endpoint = args.join('/')
    return `/${endpoint}`
  }

  // private async get(...args: any[]) {
  // const endpoint = args.join('/')
  // const { data } = await this.axios.get(`/${endpoint}`)
  // return data
  // }

  private async get_query_string(endpoint: string, ...querystring: any[]) {
    const query = querystring.join('&')
  }
}
