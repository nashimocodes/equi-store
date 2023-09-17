/* eslint-disable n/prefer-global/process */
import { Circle, CircleEnvironments } from '@circle-fin/circle-sdk'

export const circle = new Circle(
  process.env.CIRCLE_API_KEY!,
  CircleEnvironments.sandbox,
)
