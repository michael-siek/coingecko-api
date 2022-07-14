import CoinGeckoAPI from '.'

const gecko = new CoinGeckoAPI()

;(async () => {
  const data = await gecko.coins('bitcoin')

  console.log(data)
})()
