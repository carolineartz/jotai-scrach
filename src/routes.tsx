import { redirect, RouteObject } from 'react-router-dom'
import { App } from './app-file'
import * as Page from '@/components/pages'
import { Layout } from './components/layout'

export const ROUTE_DEFINITIONS: RouteObject[] = [
  {
    path: '/app',
    element: <Layout />,
    // loader: async () => {
    //   return {}
    // },
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

// export const Routes =
