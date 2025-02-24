import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/' as never)({
  component: Index,
})

function Index() {
  const navigate = Route.useNavigate()
  const navToLogin=()=>{
    navigate({to:'/login'})
  }
  return (
    <div className="p-2">
      <h3>Welcome Home!</h3>
      <p onClick={navToLogin}>Login</p>
    </div>
  )
}
