import { z } from 'zod'
import { publicProcedure, router } from '../trpc'
import { circle } from '~/lib/payments'

export const schema = z.object({
  number: z.string(),
  cvv: z.string(),
  expMonth: z.string(),
  expYear: z.string(),
  billingDetails: z.object({
    name: z.string(),
    city: z.string(),
    country: z.string(),
    line1: z.string(),
    postalCode: z.string(),
    district: z.string(),
  }),
  amount: z.number(),
})

export const circleRouter = router({
  getBalance: publicProcedure
    .query(async () => {
      const balances = await circle.balances.listBalances()

      return balances.data.data
    }),

  createPayment: publicProcedure
    .input(schema)
    .mutation(async ({ input }) => {
      return 'Hello'
    }),

})
