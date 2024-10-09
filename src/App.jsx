import { RouterProvider } from 'react-router-dom'
import AuthProvider from './components/AuthProvider'
import router from './routes/router'

const App = () => {
  return <AuthProvider>
    <RouterProvider router={router}></RouterProvider>
  </AuthProvider>;
}

export default App;