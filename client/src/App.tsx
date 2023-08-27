import { RouterProvider } from "react-router-dom"
import { router } from "./router/router" // наша разметка маршрутов

function App() {
  return <RouterProvider router={router} />
}

export default App
