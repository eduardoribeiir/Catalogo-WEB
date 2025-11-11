import React from 'react'
import { Link } from 'react-router-dom'

export default function UserTable({ users, selectedId, onSelect }) {
  return (
    <table className="user-table">
      <thead>
        <tr>
          <th>Nome</th>
          <th>E-mail</th>
          <th>Cidade</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {users.map((u, idx) => (
          <tr key={u.id} className={(idx % 2 === 0 ? 'even' : 'odd') + (selectedId === u.id ? ' selected' : '')}>
            <td>{u.name}</td>
            <td>{u.email}</td>
            <td>{u.address?.city}</td>
            <td>
              <button className="btn small" onClick={() => onSelect(u.id)}>Selecionar</button>
              <Link className="btn small ghost" to={`/usuario/${u.id}`}>Ver detalhes</Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
