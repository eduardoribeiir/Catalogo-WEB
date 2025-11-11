import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Header() {
  return (
    <header className="header">
      <div className="header-inner container">
        <h1 className="app-title">Catálogo Avançado de Usuários</h1>
        <nav>
          <NavLink to="/" end className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>Início</NavLink>
          <NavLink to="/sobre" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>Sobre</NavLink>
        </nav>
      </div>
    </header>
  )
}
