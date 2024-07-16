import { memo, Suspense } from 'react'
import { NavLink, Outlet, useMatch } from 'react-router-dom'
import { useAtomValue } from 'jotai'

import { accountsAtom } from '@/data'

export const Layout = memo(() => {
  console.log('--rendering: Layout')

  // const rootMatch = !!useMatch({ path: '/app', end: true })

  // const accountMatch = useMatch({ path: '/app/:accountSlug' })
  // // const accountsMatch = useMatch({ path: '/app' })
  // console.log('accountMatch', accountMatch)

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center">
        {/* Page content here */}
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
        <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">
          Open drawer
        </label>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay" />

        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4 mt-0">
          <Suspense fallback={<span className="loading loading-dots loading-md" />}>
            {<li>Accounts</li>}
            <AccountList />
            {/* @ts-ignore */}
            {/* {accounts?.map(account => (
              <li key={account.id}>
                <NavLink to={`/app/${account.slug}`}>{account.name}</NavLink>
              </li>
            ))} */}
          </Suspense>
        </ul>
      </div>
    </div>
  )
})

const AccountList = memo(() => {
  // const accounts = useAtomValue(accountsAtom)
  console.log('rendering AccountList')
  const accounts = useAtomValue(accountsAtom)
  console.log('accounts', accounts)

  return (
    <div>
      {(accounts as any)?.map((account: any) => (
        <li key={account.id}>
          <NavLink to={`/app/${account.slug}`}>{account.name}</NavLink>
        </li>
      ))}
    </div>
  )
})
