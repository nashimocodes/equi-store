import { publicProcedure, router } from '../trpc'
import { circle } from '~/lib/payments'

export const circleRouter = router({
  getBalance: publicProcedure
    .query(async () => {
      const balances = await circle.balances.listBalances()

      return balances.data.data
    }),
})
