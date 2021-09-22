/**
 * @description The base url for the CoinGecko API
 */

const BASE = 'https://api.coingecko.com/api/'

/**
 * @description The current version for the CoinGecko API
 */

const API_VERSION = '3'

/**
 * @description The CoinGecko URI according to base and current version
 */

export const URI = `${BASE}v${API_VERSION}`
