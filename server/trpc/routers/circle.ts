import { publicProcedure, router } from '../trpc'
import { circle } from '~/lib/payments'

export const deedsRouter = router({
  getBalance: publicProcedure
    .query(async () => {
      const balances = await circle.balances.listBalances()

      return balances.data.data
    }),
})
