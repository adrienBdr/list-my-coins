export interface Token {
  chainId: number,
  name: string,
  symbol: string,
  address: string,
  decimals: number,
  balance?: string,
}
