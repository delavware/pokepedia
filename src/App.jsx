
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Pokedex from './pages/Pokedex'
import Auth from './components/auth/Auth'
import PokemonId from './components/pokedex/PokemonId'

function App() {
 

  return (
    
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<Auth />}>
          <Route path="/pokedex" element={<Pokedex />} />
          <Route path='/pokedex/:id' element={<PokemonId />}  />
        </Route>
      </Routes>     
    
  )
}

export default App
