import axios from 'axios'

import { URI } from './lib/constants'

export const API_CONNECTOR = axios.create({
  baseURL: URI
})
