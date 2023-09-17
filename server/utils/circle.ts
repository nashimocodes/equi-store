/* eslint-disable n/prefer-global/buffer */
import { createMessage, encrypt, readKey } from 'openpgp'
import { circle } from '~/lib/payments'

interface IEncryptCardOptions {
  number: string
  cvv: string
}

export async function encryptCard(cardData: IEncryptCardOptions) {
  const { publicKey } = (await circle.encryption.getPublicKey()).data.data!
  const armoredKey = Buffer.from(publicKey, 'base64').toString()

  const decodedPublicKey = await readKey({ armoredKey })
  const message = await createMessage({ text: JSON.stringify(cardData) })

  const cipherText = await encrypt({
    message,
    encryptionKeys: decodedPublicKey,
  })

  // @ts-expect-error typing issue
  const encryptedMessage = Buffer.from(cipherText).toString('base64')

  return encryptedMessage
}
