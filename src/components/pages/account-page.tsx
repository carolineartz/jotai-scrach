import { useAtomValue } from 'jotai'
import { accountSlugAtom } from '@/external'

export const Account = () => {
  const accountSlug = useAtomValue(accountSlugAtom)
  // const account = useAtomValue(accountAtom)

  // console.log('AccountPage', accountSlug)
  return <div>Account Page: {accountSlug} </div>
}
