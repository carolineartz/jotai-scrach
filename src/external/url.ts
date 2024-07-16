import { PrimitiveAtom, atom } from 'jotai'
import { NavigateFunction, parsePath, useLocation, useNavigate } from 'react-router-dom'
import { useEffectOnce, useUpdateEffect } from 'react-use'
import { parseResourceURLParams } from './params-parser'
import { appStore } from '@/store'

export const productIdAtom = atom<number | null | undefined>(null)
productIdAtom.debugLabel = 'productIdAtom'
export const accountSlugAtom = atom<string | null | undefined>(null)
accountSlugAtom.debugLabel = 'accountSlugAtom'
export const personIdAtom = atom<number | null | undefined>(null)
personIdAtom.debugLabel = 'personIdAtom'
export const reviewIdAtom = atom<number | null | undefined>(null)
reviewIdAtom.debugLabel = 'reviewIdAtom'

const initialPath = window.location.href.split('#')[1]?.split('?')[0] ?? ''
const initialParams = parseResourceURLParams(initialPath)

appStore.set(productIdAtom, initialParams.productId)
appStore.set(accountSlugAtom, initialParams.accountSlug)
appStore.set(personIdAtom, initialParams.personId)
appStore.set(reviewIdAtom, initialParams.productReviewId)

export const pathnameAtom = atom(parsePath(window.location.href).pathname ?? '')
pathnameAtom.debugLabel = 'pathnameAtom'

const DEFAULT_NAV_FN: NavigateFunction = () => {}
const navigationAtom: PrimitiveAtom<{ navigate: ReturnType<typeof useNavigate> }> = atom({ navigate: DEFAULT_NAV_FN })
navigationAtom.debugLabel = 'navigationAtom'

// add search sync
export const useSyncLocation = () => {
  const { pathname } = useLocation()

  useUpdateEffect(() => appStore.set(pathnameAtom, pathname), [pathname])
}

export const useSetNavigateAtom = () => {
  const navigate = useNavigate()

  useEffectOnce(() => {
    appStore.set(navigationAtom, { navigate })
  })
}
