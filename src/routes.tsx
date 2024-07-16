import { redirect, RouteObject } from 'react-router-dom'
import { App } from './app'
import * as Page from '@/components/pages'

export const ROUTE_DEFINITIONS: RouteObject[] = [
  {
    path: '/',
    loader: () => redirect('/app')
  },
  {
    path: '/app',
    element: <App />,
    children: [
      {
        path: ':accountSlug',
        element: <Page.Account />
      },
      {
        index: true,
        element: <Page.Home />
      }
    ]
  }
]
