import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import UserDetails from './pages/UserDetails'
import About from './pages/About'

export default function App() {
  return (
    <div className="app">
      <Header />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/usuario/:id" element={<UserDetails />} />
          <Route path="/sobre" element={<About />} />
        </Routes>
      </main>
    </div>
  )
}
