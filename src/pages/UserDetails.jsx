import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchUser, fetchPostsByUser } from '../api'
import PostModal from '../components/PostModal'

export default function UserDetails() {
  const { id } = useParams()
  const [user, setUser] = useState(null)
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activePost, setActivePost] = useState(null)

  useEffect(() => {
    async function load() {
      try {
        setLoading(true)
        setError(null)
        const u = await fetchUser(id)
        const p = await fetchPostsByUser(id)
        setUser(u)
        setPosts(p)
      } catch (err) {
        console.error(err)
        setError('Erro ao carregar detalhes do usuário.')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [id])

  if (loading) return <div className="loading">Carregando usuário...</div>
  if (error) return <div className="error">{error}</div>
  if (!user) return null

  return (
    <div className="panel">
      <h2>Detalhes de {user.name}</h2>
      <div className="details-grid">
        <div><strong>E-mail:</strong> {user.email}</div>
        <div><strong>Telefone:</strong> {user.phone}</div>
        <div><strong>Website:</strong> {user.website}</div>
        <div><strong>Empresa:</strong> {user.company?.name}</div>
        <div className="address">
          <strong>Endereço:</strong>
          <div>{user.address?.street}, {user.address?.suite}</div>
          <div>{user.address?.city} - {user.address?.zipcode}</div>
        </div>
      </div>

      <section style={{marginTop:20}}>
        <h3>Posts de {user.name}</h3>
        <ul className="posts-list">
          {posts.map(p => (
            <li key={p.id}>
              <div className="post-row">
                <div className="post-title">{p.title}</div>
                <button className="btn small" onClick={()=>setActivePost(p)}>Ver conteúdo</button>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <PostModal post={activePost} onClose={()=>setActivePost(null)} />
    </div>
  )
}
