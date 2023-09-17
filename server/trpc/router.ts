import { router } from './trpc'
import { circleRouter } from '~/server/trpc/routers/circle'

export const appRouter = router({
  circle: circleRouter,
})

export type AppRouter = typeof appRouter
