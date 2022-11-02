import { $fetch } from 'ohmyfetch'
/**
 * Here you can define your API interceptors for different sources.
 */
const API_BASE_URL = 'https://localhost:3030/api'
export const apiFetch = $fetch.create({ baseURL: API_BASE_URL })
