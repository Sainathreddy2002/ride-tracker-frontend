
import { Outlet, createRootRoute } from '@tanstack/react-router'


export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {

  return (
    <div style={{maxWidth:'100vw',maxHeight:'100vh'}}>
      <Outlet />
    </div>
  )
}
