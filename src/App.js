import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import { useAuthContext } from './hooks/useAuthContext'

function App() {
  const { user, guest } = useAuthContext()

  console.log(guest)

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route 
            path="/"
            element={user || guest ? <Home /> : <Navigate to='/login' />}
          />
          <Route 
            path="/login"
            element={!user && !guest  ? <Login /> : <Navigate to='/' />}
          />
          <Route 
            path="/signup"
            element={!user && !guest ? <Signup /> : <Navigate to='/' />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
