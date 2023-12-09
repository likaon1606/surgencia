import { Suspense } from 'react'
import { Outlet } from 'react-router'
import { Loader } from '@/components/ui/Loader/Loader'

export const SuspenseLayout = () => {
  return (
    <Suspense fallback={<Loader fullHeight />}>
      <Outlet />
    </Suspense>
  )
}
