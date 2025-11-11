import React, { useEffect, useState } from 'react'
import { fetchUsers, fetchAllPosts } from '../api'
import UserTable from '../components/UserTable'

const STORAGE_KEY = 'catalogo_usuarios_filtros_v1'

export default function Home() {
  const [users, setUsers] = useState([])
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [query, setQuery] = useState('')
  const [city, setCity] = useState('')
  const [selectedId, setSelectedId] = useState(null)
  const [page, setPage] = useState(1)
  const perPage = 5

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        const s = JSON.parse(saved)
        setQuery(s.query || '')
        setCity(s.city || '')
        setPage(s.page || 1)
      } catch {}
    }
  }, [])

  useEffect(() => {
    async function load() {
      try {
        setLoading(true)
        setError(null)
        const [u, p] = await Promise.all([fetchUsers(), fetchAllPosts()])
        setUsers(u)
        setPosts(p)
      } catch (err) {
        console.error(err)
        setError('Erro ao carregar usuários.')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ query, city, page }))
  }, [query, city, page])

  const cities = Array.from(new Set(users.map(u => u.address?.city).filter(Boolean)))

  const filtered = users.filter(u => {
    const q = query.toLowerCase()
    const matchQ = !q || u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
    const matchCity = !city || u.address?.city === city
    return matchQ && matchCity
  })

  const total = filtered.length
  const totalPages = Math.max(1, Math.ceil(total / perPage))
  const current = filtered.slice((page-1)*perPage, page*perPage)

  function retry() {
    setLoading(true)
    setError(null)
    setUsers([])
    setPosts([])
    setTimeout(()=>{ // small retry to re-run effect - simpler than re-calling fetch functions here
      window.location.reload()
    }, 300)
  }

  function getPostCount(userId) {
    return posts.filter(p => p.userId === userId).length
  }

  return (
    <div>
      <section className="panel">
        <h2>Lista de Usuários</h2>
        <div className="controls">
          <input placeholder="Buscar por nome ou e-mail" value={query} onChange={e=>{setQuery(e.target.value); setPage(1)}} />
          <select value={city} onChange={e=>{setCity(e.target.value); setPage(1)}}>
            <option value="">Todas as cidades</option>
            {cities.map(c=> <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        {loading && <div className="loading">Carregando usuários...</div>}
        {error && <div className="error">{error} <button className="btn" onClick={retry}>Tentar novamente</button></div>}

        {!loading && !error && (
          <>
            <div className="count">Exibindo {Math.min(total, perPage*(page)) - perPage*(page-1)} de {users.length} usuários (filtrados: {total})</div>
            <UserTable users={current} selectedId={selectedId} onSelect={setSelectedId} />
            <div className="pagination">
              <button className="btn" onClick={()=>setPage(p=>Math.max(1,p-1))} disabled={page===1}>Anterior</button>
              <span>Página {page} de {totalPages}</span>
              <button className="btn" onClick={()=>setPage(p=>Math.min(totalPages,p+1))} disabled={page===totalPages}>Próxima</button>
            </div>

            <div className="posts-summary">
              {current.map(u => (
                <div key={u.id} className="user-card">
                  <strong>{u.name}</strong>
                  <div>{u.email}</div>
                  <div>Cidade: {u.address?.city}</div>
                  <div>Total de posts: {getPostCount(u.id)}</div>
                </div>
              ))}
            </div>
          </>
        )}
      </section>
    </div>
  )
}
