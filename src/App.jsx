import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from "./Components/Home.jsx"
import Player from "./Components/Player.jsx"
import { SongSearch} from "./Components/SongSearch.jsx"

const App = () => {
  return (
    <div>
       <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/player" element={<Player />} />
        <Route path="/search" element={<SongSearch />} />
        {/* <Route path="/login" element={<Login />} /> */}
       </Routes>
    </div>
  )
}

export default App
