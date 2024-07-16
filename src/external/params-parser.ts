import { matchPath, To } from 'react-router-dom'

type ResourceUrlParams = {
  accountSlug?: string
  productId?: number | null
  productReviewId?: number
  personId?: number
}

export function parseResourceURLParams<T extends ResourceUrlParams>(to: To) {
  const pathname = typeof to === 'string' ? to : (to.pathname ?? '')
  const accountSlugMatch = matchPath('/app/:accountSlug/*', pathname)
  const productMatch = matchPath('/app/:accountSlug/products/:productId', pathname)
  const productReviewMatch = matchPath('/app/:accountSlug/products/:productId/reviews/:productReviewId', pathname)
  const accountPersonMatch = matchPath('/app/:accountSlug/people/:personId', pathname)

  return {
    accountSlug: parseResourceSegment(accountSlugMatch?.params.accountSlug),
    productId: parseResourceSegment(productMatch?.params.productId),
    productReviewId: parseResourceSegment(productReviewMatch?.params.productReviewId),
    personId: parseResourceSegment(accountPersonMatch?.params.personId)
  } as T
}

const parseResourceSegment = (id: string | undefined, excludes: string[] = []) => {
  if (!id || excludes.includes(id ?? '')) return undefined
  if (id === 'current_version') return id
  const parsed = Number(id)
  return isNaN(parsed) ? id : parsed
}
