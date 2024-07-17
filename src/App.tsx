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
import { useLocation } from 'react-router-dom'
import { useEffect, useRef } from 'react'

export const App = () => {
  console.log('--rendering: App')
  const location = useRef(useLocation())
  // useSyncLocation()
  // useSetNavigateAtom()

  useEffectOnce(() => {
    const hashChanged = () => {
      console.log('hashchanged')
    }
    window.addEventListener('hashchange', hashChanged)

    const popState = () => {
      console.log('popstate')
    }

    window.addEventListener('popstate', popState)

    return () => {
      window.removeEventListener('hashchange', hashChanged)
      window.removeEventListener('popstate', popState)
    }
  })

  useEffect(() => {
    console.log('location', location.current)
  }, [location.current])

  useEffect(() => {
    console.log('location', location)
  }, [location])

  return (
    <JotaiProvider store={appStore}>
      {/* <JotaiDevTools store={appStore} /> */}
      <Layout />
    </JotaiProvider>
  )
}
