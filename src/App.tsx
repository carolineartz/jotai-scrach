import '@/App.css'

import { useEffectOnce } from 'react-use'

import { Provider as JotaiProvider } from 'jotai'
import {
  accountSlugAtom,
  pathnameAtom,
  personIdAtom,
  productIdAtom,
  reviewIdAtom,
  useSetNavigateAtom,
  useSyncLocation
} from './external'

import { appStore } from './store'
import { parseResourceURLParams } from './external/params-parser'
import { Layout } from '@/components/layout'
import { DevTools as JotaiDevTools } from 'jotai-devtools'
import { useAtom } from 'jotai'
import { atomWithProxy } from 'jotai-valtio'
import { proxy } from 'valtio/vanilla'

export const App = () => {
  console.log('--rendering: App')
  // useSyncLocation()
  // useSetNavigateAtom()

  useEffectOnce(() => {
    appStore.sub(pathnameAtom, () => {
      const params = parseResourceURLParams(appStore.get(pathnameAtom))

      appStore.set(productIdAtom, params.productId)
      appStore.set(accountSlugAtom, params.accountSlug)
      appStore.set(personIdAtom, params.personId)
      appStore.set(reviewIdAtom, params.productReviewId)
    })
  })

  return (
    <JotaiProvider store={appStore}>
      {/* <JotaiDevTools store={appStore} /> */}
      <Layout />
    </JotaiProvider>
  )
}
