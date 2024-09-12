import { RouterProvider } from 'react-router-dom'
import AuthProvider from './components/AuthProvider'
import router from './routes/router'

const App = () => {
  return <AuthProvider isSignedIn={true}>
    <RouterProvider router={router}></RouterProvider>
  </AuthProvider>;
}

export default App;