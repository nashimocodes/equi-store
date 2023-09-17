import { Currency, PaymentCreationRequestVerificationEnum, SourceTypeEnum } from '@circle-fin/circle-sdk'
import { z } from 'zod'
import { v4 } from 'uuid'
import { faker } from '@faker-js/faker'
import { nanoid } from 'nanoid'
import { TRPCError } from '@trpc/server'
import { publicProcedure, router } from '../trpc'
import { circle } from '~/lib/payments'
import { encryptCard } from '~/server/utils/circle'

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
      const { number, cvv, expMonth, expYear, billingDetails, amount } = input

      const encryptedMessage = await encryptCard({
        number,
        cvv,
      })

      const { keyId } = (await circle.encryption.getPublicKey()).data.data!
      const metadata = {
        email: faker.internet.email({
          provider: 'nekocandy.club',
        }),
        sessionId: nanoid(),
        ipAddress: '1.1.1.1',
      }

      const cardDetails = {
        idempotencyKey: v4(),
        encryptedData: encryptedMessage,
        billingDetails,
        keyId,
        expMonth: Number(expMonth),
        expYear: Number(expYear),
        metadata,
      }

      try {
        const data = await circle.cards.createCard(cardDetails)
        const cardId = data.data.data?.id

        const paymentDetails = {
          idempotencyKey: v4(),
          metadata,
          amount: {
            amount: amount.toString(),
            currency: Currency.Usd,
          },
          autoCapture: true,
          verification: PaymentCreationRequestVerificationEnum.Cvv,
          source: {
            id: cardId,
            type: SourceTypeEnum.Card,
          },
          description: 'Payment for Store Order',
        }

        const createPaymentResponse = await circle.payments.createPayment(
          paymentDetails,
        )

        return createPaymentResponse.data.data!
      }
      catch (error: any) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: `We\'re having trouble processing your payment. Please try again later.\n\nStack:\n${error.stack}`,
        })
      }
    }),

})
