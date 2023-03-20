import { Route, Routes } from 'react-router'
import './App.css'
import Layout from './Layout'
import Home from './pages/Home/Home'

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path='/' Component={Layout}>
          <Route path='/' Component={Home}/>
        </Route>
      </Routes>
    </div>
  )
}

export default App
