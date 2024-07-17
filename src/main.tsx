import { createRoot } from 'react-dom/client'
import { createHashRouter, RouterProvider } from 'react-router-dom'
import { ROUTE_DEFINITIONS } from '@/routes'
import './index.css'
import 'jotai-devtools/styles.css'
import '@/index.css'
import { memo } from 'react'

const router = createHashRouter(ROUTE_DEFINITIONS)

const MainApp = memo(() => {
  return <RouterProvider fallbackElement={<div>fallback</div>} router={router} />
})

createRoot(document.getElementById('root') as HTMLElement).render(<MainApp />)
