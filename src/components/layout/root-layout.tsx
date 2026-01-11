import { Outlet } from "react-router-dom"
import { AppProvider } from "../../core/providers/app-provider"

const RootLayout = () => {

  return (
    <div dir="rtl">
      <AppProvider>
        <Outlet />
      </AppProvider>
    </div>
  )
}

export default RootLayout