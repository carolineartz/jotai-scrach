import { Fragment, memo, Suspense, useEffect, useMemo, useState } from 'react'
import { NavLink, Outlet, useLocation, useMatch } from 'react-router-dom'
import { PrimitiveAtom, Provider as JotaiProvider, useAtom, useAtomValue } from 'jotai'

import { Account, accountAtomsAtom, accountsAtom } from '@/data'
import { useLogPropsChanged } from '@/util/use-log-props-changed'
import { DevTools as JotaiDevTools } from 'jotai-devtools'

import { appStore } from '@/store'
import { productIdAtom, accountSlugAtom, personIdAtom, reviewIdAtom } from '@/external'
import { parseResourceURLParams } from '@/external/params-parser'
import { useUpdateEffect } from 'react-use'

export const Layout = memo(() => {
  const { pathname } = useLocation()

  useUpdateEffect(() => {
    const params = parseResourceURLParams(pathname)
    appStore.set(productIdAtom, params.productId)
    appStore.set(accountSlugAtom, params.accountSlug)
    appStore.set(personIdAtom, params.personId)
    appStore.set(reviewIdAtom, params.productReviewId)
  }, [pathname])

  return <LayoutContent />
})

const LayoutContent = memo(() => {
  console.log('--rendering: Layout')
  const [accountsOpen, setAccountsOpen] = useState(true)

  // const rootMatch = !!useMatch({ path: '/app', end: true })

  // const accountMatch = useMatch({ path: '/app/:accountSlug' })
  // // const accountsMatch = useMatch({ path: '/app' })
  // console.log('accountMatch', accountMatch)

  return (
    <JotaiProvider store={appStore}>
      <JotaiDevTools store={appStore} />
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col justify-start">
          {/* Page content here */}
          <Suspense fallback={<div className="loading loading-dots loading-md" />}>
            <div className="p-10">
              <Outlet />
            </div>
          </Suspense>
          <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">
            Open drawer
          </label>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay" />

          <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4 mt-0">
            <Suspense fallback={<li className="loading loading-dots loading-md" />}>
              <li>
                <NavLink to={`/app`}>Home</NavLink>
              </li>
              <li>
                <span
                  onClick={() => {
                    setAccountsOpen(prev => !prev)
                  }}
                  className={`menu-dropdown-toggle ${accountsOpen ? 'menu-dropdown-show' : ''}`}
                >
                  Accounts
                </span>
                <SidebarAccountNav open={accountsOpen} />
              </li>
            </Suspense>
          </ul>
        </div>
      </div>
    </JotaiProvider>
  )
})

const SidebarAccountNav = memo(({ open }: { open: boolean }) => {
  console.log('--rendering SidebarAccountNav')
  const accountAtoms = useAtomValue(accountAtomsAtom)

  return (
    <ul className={`menu-dropdown ${open ? 'menu-dropdown-show' : ''}`}>
      {accountAtoms.map(accountAtom => {
        return <NavItem key={accountAtom.toString()} accountAtom={accountAtom} />
      })}
    </ul>
  )
})

const NavItem = memo((props: { accountAtom: PrimitiveAtom<Account> }) => {
  const { accountAtom } = props
  accountAtom.debugLabel = `accountAtom-${accountAtom.toString()}`

  const account = useAtomValue(accountAtom)
  console.log(`--rendering NavItem-${accountAtom.toString()}`, account.name)

  return (
    <li>
      <NavLink to={`/app/${account.slug}`}>{account.name}</NavLink>
    </li>
  )
})
